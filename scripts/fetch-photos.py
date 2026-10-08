#!/usr/bin/env python3
"""Fetch the owner-approved photos and crop them into public/.

Usage:  pip install pillow requests && python3 scripts/fetch-photos.py
Source list and crop plan: scripts/photos.json (the barbers' own Booksy uploads;
use on dutchcuts.com approved by Dutch Cuts on 2026-10-08).
"""
import io, json, os, sys
from pathlib import Path

try:
    import requests
    from PIL import Image, ImageOps
except ImportError:
    sys.exit("pip install pillow requests")

ROOT = Path(__file__).resolve().parent.parent
PLAN = json.load(open(ROOT / "scripts" / "photos.json"))
UA = {"User-Agent": "Mozilla/5.0 (dutchcuts.com asset fetch)"}


def fit(im, w, h, focus):
    sw, sh = im.size
    scale = max(w / sw, h / sh)
    im = im.resize((round(sw * scale), round(sh * scale)), Image.LANCZOS)
    cw, ch = im.size
    x = int((cw - w) * focus[0]); y = int((ch - h) * focus[1])
    return im.crop((x, y, x + w, y + h))


for item in PLAN["images"]:
    out = ROOT / "public" / item["out"]
    if out.exists():
        print("skip (exists)", item["out"]); continue
    r = requests.get(item["url"], headers=UA, timeout=60); r.raise_for_status()
    im = ImageOps.exif_transpose(Image.open(io.BytesIO(r.content))).convert("RGB")
    im = fit(im, item["w"], item["h"], item["focus"])
    out.parent.mkdir(parents=True, exist_ok=True)
    im.save(out, "JPEG", quality=item.get("q", 82), optimize=True, progressive=True)
    print("wrote", item["out"], im.size)
print("done")
