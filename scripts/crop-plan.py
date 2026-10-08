#!/usr/bin/env python3
"""Compute per-photo focus points so the haircut is always in frame.

Reads scripts/photos.json, finds the cached original for each entry
(public/_booksy_raw/manifest.json, keyed by sourceUrl), detects the largest face,
and writes back w/h/focus so scripts/fetch-photos.py reproduces the crop.
Rule: 4:5 tiles; crop top sits `headroom` face-heights above the face; face centred.
"""
import json, sys
from pathlib import Path
import cv2
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
plan = json.load(open(ROOT / "scripts/photos.json"))
raw = {m["sourceUrl"]: m for m in json.load(open(ROOT / "public/_booksy_raw/manifest.json"))}
cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
profile = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_profileface.xml")

def faces(gray):
    f = list(cascade.detectMultiScale(gray, 1.1, 5, minSize=(60, 60)))
    if not f:
        f = list(profile.detectMultiScale(gray, 1.1, 5, minSize=(60, 60)))
    if not f:
        flipped = cv2.flip(gray, 1)
        g = list(profile.detectMultiScale(flipped, 1.1, 5, minSize=(60, 60)))
        f = [(gray.shape[1] - x - w, y, w, h) for (x, y, w, h) in g]
    return sorted(f, key=lambda b: b[2] * b[3], reverse=True)

report = []
for item in plan["images"]:
    kind = item["out"].split("/")[0]
    if kind not in ("work", "barbers"):
        continue
    m = raw.get(item["url"])
    if not m:
        report.append((item["out"], "no raw")); continue
    im = ImageOps.exif_transpose(Image.open(ROOT / "public/_booksy_raw" / m["file"])).convert("RGB")
    sw, sh = im.size
    gray = cv2.cvtColor(cv2.cvtColor(__import__("numpy").array(im), cv2.COLOR_RGB2BGR), cv2.COLOR_BGR2GRAY)
    f = faces(gray)
    w, h = 1200, 1500
    item["w"], item["h"] = w, h
    if not f:
        item["focus"] = [0.5, 0.2]
        report.append((item["out"], "no face -> top-weighted")); continue
    x, y, fw, fh = f[0]
    scale = max(w / sw, h / sh)
    cw, ch = sw * scale, sh * scale
    headroom = 1.0 if kind == "work" else 0.7
    crop_top = (y - headroom * fh) * scale
    crop_left = (x + fw / 2) * scale - w / 2
    fy = 0.0 if ch - h <= 0 else min(1.0, max(0.0, crop_top / (ch - h)))
    fx = 0.5 if cw - w <= 0 else min(1.0, max(0.0, crop_left / (cw - w)))
    item["focus"] = [round(fx, 3), round(fy, 3)]
    report.append((item["out"], f"face {fw}x{fh} at y={y}/{sh} -> focus {item['focus']}"))

json.dump(plan, open(ROOT / "scripts/photos.json", "w"), indent=0)
for r in report: print(*r)
