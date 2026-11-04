"""Generate tiny blurred JPEG data URLs for every image under public/projects and public/images/reference."""
import base64, glob, io, os
from PIL import Image, ImageFilter

root = os.getcwd()
files = sorted(glob.glob("public/projects/*/*.jpg") + glob.glob("public/images/reference/*.jpg"))
lines = []
for f in files:
    im = Image.open(f).convert("RGB")
    im.thumbnail((10, 10))
    im = im.filter(ImageFilter.GaussianBlur(0.4))
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=40, optimize=True)
    data = base64.b64encode(buf.getvalue()).decode()
    src = "/" + os.path.relpath(f, "public").replace("\\", "/")
    lines.append(f'  "{src}": "data:image/jpeg;base64,{data}",')

out = (
    "/**\n"
    " * Tiny blurred previews for every local image (generated — do not edit by hand).\n"
    " * Regenerate after adding images: python scripts/make-blur.py\n"
    " */\n"
    "export const blurData: Record<string, string> = {\n" + "\n".join(lines) + "\n};\n\n"
    "/** Props for next/image: a blurred preview when one exists. */\n"
    "export function blurProps(src: string) {\n"
    "  const data = blurData[src];\n"
    "  return data ? ({ placeholder: \"blur\", blurDataURL: data } as const) : ({} as const);\n"
    "}\n"
)
open("content/blur.ts", "w", encoding="utf8").write(out)
print(len(files), "images,", os.path.getsize("content/blur.ts") // 1024, "KB")
