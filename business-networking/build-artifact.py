#!/usr/bin/env python3
"""Собирает однофайловую версию сайта (для публикации артефактом)."""
import pathlib, re, sys

here = pathlib.Path(__file__).parent
html = (here / "index.html").read_text(encoding="utf-8")
body = html.split("<!-- ARTIFACT:BEGIN -->")[1].split("<!-- ARTIFACT:END -->")[0]
fonts = re.search(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^>]*>', html).group(0)

out = "\n".join([
    "<title>Контур Нетворк</title>",
    fonts,
    "<style>",
    (here / "styles.css").read_text(encoding="utf-8"),
    "</style>",
    body.strip(),
    "<script>",
    (here / "app.js").read_text(encoding="utf-8"),
    "</script>",
    "",
])
dest = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else here / "dist.html"
dest.write_text(out, encoding="utf-8")
print(f"{dest} — {len(out)} байт")
