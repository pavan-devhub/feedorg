"""Extract Product 360 HTML into React data and CSS."""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
html = (ROOT / "product360.html").read_text(encoding="utf-8")

style_match = re.search(r"<style>(.*?)</style>", html, re.DOTALL)
css = style_match.group(1)
css = re.sub(r"html,body\{[^}]*\}", "", css, count=1)
css = re.sub(
    r"body\{\s*font-family:.*?min-height:100vh;\s*\}",
    "",
    css,
    count=1,
    flags=re.DOTALL,
)
css = re.sub(r"::selection\{[^}]*\}", "", css, count=1)
css = re.sub(
    r"\*\{box-sizing:border-box;\}",
    ".product360-page, .product360-page *{box-sizing:border-box;}",
    css,
    count=1,
)
css = css.replace("footer{", ".product360-page footer{")

page_prefix = """/* Product360 - scoped page styles */
.product360-page {
  min-height: 100vh;
  margin: 0;
  padding: 0;
  color: var(--ink, #1c2320);
  font-family: 'Segoe UI','Noto Sans Telugu','Nirmala UI',-apple-system,'Helvetica Neue',Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  background:
    radial-gradient(circle at 8% 0%, #fbead9 0%, transparent 38%),
    radial-gradient(circle at 96% 12%, #dcf3ea 0%, transparent 40%),
    var(--bg, #f8f7f3);
}
.product360-page ::selection { background: #ffe08a; }

"""

css_path = ROOT / "src" / "components" / "Product360.css"
css_path.write_text(page_prefix + css, encoding="utf-8")
print("Wrote", css_path)

js_match = re.search(r"<script>(.*?)</script>", html, re.DOTALL)
js = js_match.group(1)
constants = js.split("function esc(s)")[0]
data_js = re.sub(r"^const ", "export const ", constants, flags=re.MULTILINE)
data_path = ROOT / "src" / "data" / "product360Data.js"
data_path.parent.mkdir(parents=True, exist_ok=True)
data_path.write_text(data_js.strip() + "\n", encoding="utf-8")
print("Wrote", data_path, "bytes", data_path.stat().st_size)
