#!/usr/bin/env bash
# Convert the root markdown pages to HTML for the published site.
# The only generation step in this repo — lesson and reference HTML is committed as-is.
# Run from the repo root after editing MISSION.md or RESOURCES.md.
set -euo pipefail

cd "$(dirname "$0")"

command -v pandoc >/dev/null || { echo "pandoc not found" >&2; exit 1; }

md2html() {
  local src="$1" title="$2" out="$3" body
  body=$(pandoc "$src" -f gfm -t html)
  cat > "$out" <<HTML
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<link rel="stylesheet" href="assets/lesson.css">
</head>
<body>
<div class="wrap">

<p class="kicker">Algorithm Intuition</p>

<div class="md-page">
${body}
</div>

<footer>
  <div class="pagenav">
    <a href="index.html">Home</a>
    <a href="mission.html">Mission</a>
    <a href="resources.html">Resources</a>
  </div>
</footer>

</div>
</body>
</html>
HTML
  echo "  ${src} -> ${out}"
}

echo "Generating pages:"
md2html MISSION.md   "Mission"   mission.html
md2html RESOURCES.md "Resources" resources.html
echo "Done."
