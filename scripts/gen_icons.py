#!/usr/bin/env python3
"""Genera icono adaptativo, icono legacy y splash screens de Android
a partir del logo de marca (public/favicon.svg) y los coloca en
android/app/src/main/res/**, sustituyendo los placeholders de Capacitor.
"""
import io
import math
import cairosvg
from PIL import Image, ImageDraw

RES = "android/app/src/main/res"
BRAND_BG = (124, 77, 255, 255)   # --lila (#7c4dff) - fondo icono
SPLASH_BG = (240, 244, 255, 255)  # --fondo (#f0f4ff) - fondo splash

def render_svg(path, size):
    """Rasteriza el SVG a un PNG cuadrado transparente de `size`x`size`."""
    svg_bytes = open(path, "rb").read()
    png_bytes = cairosvg.svg2png(bytestring=svg_bytes, output_width=size, output_height=size)
    return Image.open(io.BytesIO(png_bytes)).convert("RGBA")

def to_white_silhouette(mark):
    """Deriva una silueta blanca opaca a partir del canal alfa de `mark`
    (evita depender de parsear los colores CSS/display-p3 del SVG)."""
    alpha = mark.split()[3]
    white = Image.new("RGBA", mark.size, (255, 255, 255, 0))
    white.putalpha(alpha)
    return white

def paste_centered(canvas, mark, scale):
    """Pega `mark` centrado en `canvas`, escalado a `scale` * min(canvas.size)."""
    cw, ch = canvas.size
    target = int(min(cw, ch) * scale)
    mw, mh = mark.size
    ratio = target / max(mw, mh)
    new_size = (max(1, int(mw * ratio)), max(1, int(mh * ratio)))
    mark_resized = mark.resize(new_size, Image.LANCZOS)
    x = (cw - new_size[0]) // 2
    y = (ch - new_size[1]) // 2
    canvas.alpha_composite(mark_resized, (x, y))
    return canvas

def circle_mask(im):
    mask = Image.new("L", im.size, 0)
    d = ImageDraw.Draw(mask)
    d.ellipse([0, 0, im.size[0], im.size[1]], fill=255)
    out = im.copy()
    out.putalpha(mask)
    return out

# 1) Icono adaptativo: foreground (marca en blanco, safe-zone 66% de 108dp)
FOREGROUND_SIZES = {
    "mipmap-mdpi": 108,
    "mipmap-hdpi": 162,
    "mipmap-xhdpi": 216,
    "mipmap-xxhdpi": 324,
    "mipmap-xxxhdpi": 432,
}
mark_master = render_svg("public/favicon.svg", 1024)
mark_white_master = to_white_silhouette(mark_master)

for folder, size in FOREGROUND_SIZES.items():
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    paste_centered(canvas, mark_white_master, 0.5)
    canvas.save(f"{RES}/{folder}/ic_launcher_foreground.png")

# 2) Icono legacy (pre-API26): cuadrado y redondo, fondo de marca + logo
LEGACY_SIZES = {
    "mipmap-mdpi": 48,
    "mipmap-hdpi": 72,
    "mipmap-xhdpi": 96,
    "mipmap-xxhdpi": 144,
    "mipmap-xxxhdpi": 192,
}
for folder, size in LEGACY_SIZES.items():
    canvas = Image.new("RGBA", (size, size), BRAND_BG)
    paste_centered(canvas, mark_white_master, 0.6)
    canvas.save(f"{RES}/{folder}/ic_launcher.png")
    circle_mask(canvas).save(f"{RES}/{folder}/ic_launcher_round.png")

# 3) Splash screens: fondo claro + logo de marca (colores originales) centrado
SPLASH_SIZES = {
    "drawable": (480, 320),
    "drawable-land-mdpi": (480, 320),
    "drawable-land-hdpi": (800, 480),
    "drawable-land-xhdpi": (1280, 720),
    "drawable-land-xxhdpi": (1600, 960),
    "drawable-land-xxxhdpi": (1920, 1280),
    "drawable-port-mdpi": (320, 480),
    "drawable-port-hdpi": (480, 800),
    "drawable-port-xhdpi": (720, 1280),
    "drawable-port-xxhdpi": (960, 1600),
    "drawable-port-xxxhdpi": (1280, 1920),
}
for folder, (w, h) in SPLASH_SIZES.items():
    canvas = Image.new("RGBA", (w, h), SPLASH_BG)
    paste_centered(canvas, mark_master, 0.28)
    canvas.convert("RGB").save(f"{RES}/{folder}/splash.png")

print("Iconos y splash generados correctamente.")
