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


def luminance_mask(im):
    """White artwork on black → alpha mask (soft edges kept)."""
    return im.convert("L").point(lambda v: max(0, min(255, round((v - 40) * 255 / 160))))


def tint(mask, rgb):
    out = Image.new("RGBA", mask.size, rgb + (0,))
    out.putalpha(mask)
    return out


def brand(item):
    """Derive the site's logo assets from the owner's Booksy logo (white on black).
    Crops are fractions of the square source: the DC monogram, the DUTCH CUTS wordmark,
    and the two together. Written in ink (for paper) and paper (for ink) colours."""
    out_dir = ROOT / "public" / "brand"
    done = all((out_dir / f).exists() for f in ("mark-ink.png", "lockup-paper.png", "lockup-h-ink.png"))
    if done:
        print("skip (exists) brand/*"); return
    r = requests.get(item["url"], headers=UA, timeout=60); r.raise_for_status()
    src = ImageOps.exif_transpose(Image.open(io.BytesIO(r.content))).convert("RGB")
    W, H = src.size
    mask = luminance_mask(src)
    INK, PAPER = (0x14, 0x1A, 0x17), (0xF4, 0xF1, 0xEA)
    def box(fr):
        return tuple(round(v * (W if i % 2 == 0 else H)) for i, v in enumerate(fr))
    pad = round(0.012 * W)
    mark_box = box(item["mark"]); word_box = box(item["wordmark"])
    mark = mask.crop((mark_box[0] - pad, mark_box[1] - pad, mark_box[2] + pad, mark_box[3] + pad))
    word = mask.crop((word_box[0] - pad, word_box[1] - pad, word_box[2] + pad, word_box[3] + pad))
    lock = mask.crop((word_box[0] - pad, mark_box[1] - pad, word_box[2] + pad, word_box[3] + pad))
    # horizontal lockup for the nav: mark at left, wordmark at right, both the wordmark's cap height
    mh = word.height
    mark_h = mark.resize((round(mark.width * mh * 1.35 / mark.height), round(mh * 1.35)), Image.LANCZOS)
    gap = round(mh * 0.55)
    horiz = Image.new("L", (mark_h.width + gap + word.width, mark_h.height), 0)
    horiz.paste(mark_h, (0, 0)); horiz.paste(word, (mark_h.width + gap, (mark_h.height - word.height) // 2))
    out_dir.mkdir(parents=True, exist_ok=True)
    for name, m in (("mark", mark), ("wordmark", word), ("lockup", lock), ("lockup-h", horiz)):
        for tone, rgb in (("ink", INK), ("paper", PAPER)):
            tint(m, rgb).save(out_dir / f"{name}-{tone}.png", optimize=True)
    # the owner's square logo as-is (used where a solid tile is wanted) and the favicon
    src.resize((item["w"], item["h"]), Image.LANCZOS).save(out_dir / "logo.jpg", "JPEG", quality=item.get("q", 88), optimize=True, progressive=True)
    fav = Image.new("RGB", (256, 256), INK)
    fm = mark.resize((round(mark.width * 176 / mark.height), 176), Image.LANCZOS)
    fav.paste(Image.new("RGB", fm.size, PAPER), ((256 - fm.width) // 2, 40), fm)
    fav.save(ROOT / "src" / "app" / "icon.png", optimize=True)
    print("wrote brand/* + src/app/icon.png", mark.size, word.size, horiz.size)


for item in PLAN["images"]:
    if item.get("brand"):
        brand(item); continue
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
