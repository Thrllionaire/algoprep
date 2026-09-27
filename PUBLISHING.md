# Publishing a new lesson

This course is a static HTML site published with GitHub Pages, from the `master`
branch root of `github.com/Thrllionaire/algoprep`. Live at:
https://thrllionaire.github.io/algoprep/

## Two repos, one workspace

`/home/naren/dev/algoprep` holds two independent git repos:

- The **outer repo** (this directory, public) — tracks the published site:
  `lessons/`, `reference/`, `assets/`, `index.html`, `mission.html`,
  `resources.html`, `MISSION.md`, `RESOURCES.md`, `README.md`, `build.sh`,
  `PUBLISHING.md`.
- The **inner repo**, rooted at `learning-records/` (private:
  `github.com/Thrllionaire/algoprep-progress`) — tracks `learning-records/*.md`.
  `NOTES.md` is untracked in both, because it holds candid notes about the learner.

The outer repo's `.gitignore` excludes `/learning-records/` and `NOTES.md`, so
`git add`/`git status` in this directory never touches the private repo. This split
only matters for git — the `/teach` skill reads and writes plain filesystem paths
and has no idea two repos are involved, so lesson generation works the same.

To commit progress (learning records):

```bash
cd /home/naren/dev/algoprep/learning-records
git add -A && git commit -m "..." && git push
```

There is no build step for lessons — the HTML in `lessons/` and `reference/` is
committed as-is and served directly. The only generation step is converting the two
root markdown files (`MISSION.md`, `RESOURCES.md`) to HTML, which only needs to
happen when those files change.

## 1. Add the lesson files

New lesson HTML goes in `lessons/NNNN-slug.html`; a matching reference card (if any)
goes in `reference/NNNN-slug.html`, numbered to match its lesson. Copy the structure
of an existing lesson — same `<head>`, same `../assets/lesson.css` and
`../assets/widgets.css` links, same `masthead` / `colophon` / `footer` markup — so
the shared stylesheet and widgets apply.

**Reuse the components in `assets/` rather than inlining anything a second lesson
would duplicate:**

- `assets/lesson.css` — the house style. Every page links it.
- `assets/widgets.css` — styles for the interactive widgets. Link it only if used.
- `assets/quiz.js` — `AlgoQuiz.mount(rootId, dataId)`. Retrieval-practice quiz:
  shuffled options, commit-first gate, immediate explanation, reshuffled replay.
  Config is a `<script type="application/json">` block; see lesson 0001.
- `assets/ladder.js` — `ConstraintLadder.mount(rootId)`. The interactive
  constraint → budget → families table.

Two rules on links from a file in `lessons/` or `reference/`:

- Paths back to the repo root use `../`.
- Link to the **generated HTML**, not the raw markdown: `../mission.html` and
  `../resources.html`, never `../MISSION.md` or `../RESOURCES.md`. The site does not
  serve the markdown.

When designing a quiz, keep every option the same word count and close in character
count, and check that the correct option is never the longest or shortest — option
length must not leak the answer. There is a checker at the bottom of this file.

## 2. Regenerate the mission/resources pages (only if they changed)

```bash
cd /home/naren/dev/algoprep && ./build.sh
```

That wraps `MISSION.md` and `RESOURCES.md` in the site chrome with pandoc. It is
idempotent; run it whenever either file changes.

## 3. Update the homepage

Add the new lesson (and reference card, if any) to `index.html`, under the
`<h2>Lessons</h2>` / `<h2>Reference</h2>` lists, in lesson-number order, each with a
one-sentence `<span class="blurb">`. Move the `class="upcoming"` placeholder down to
whatever comes next, or drop it.

Also add the lesson to the lists in `README.md`, which is what GitHub shows on the
repo page.

## 4. Commit and push

```bash
cd /home/naren/dev/algoprep
git add lessons/ reference/ assets/ index.html mission.html resources.html \
        MISSION.md RESOURCES.md README.md
git commit -m "Add lesson NNNN: <title>"
git push
```

Don't `git add` `learning-records/` or `NOTES.md` from this directory — they're
gitignored here and belong to the private progress repo instead (see above).

GitHub Pages rebuilds automatically on push, usually within 1-2 minutes. Check build
status with:

```bash
gh api repos/Thrllionaire/algoprep/pages/builds/latest
```

## 5. Verify

Open the new page and confirm it renders and links resolve:

```bash
curl -s -o /dev/null -w "%{http_code}\n" \
  https://thrllionaire.github.io/algoprep/lessons/NNNN-slug.html
```

A `200` means it's live.

### If the build shows `"status":"errored"` with no useful message

Usually transient (e.g. pushing twice in quick succession). Trigger a manual rebuild
and poll it:

```bash
gh api -X POST repos/Thrllionaire/algoprep/pages/builds
sleep 15 && gh api repos/Thrllionaire/algoprep/pages/builds/latest
```

## Local checks worth running before you push

Verify every relative link in the new files resolves on disk:

```bash
cd /home/naren/dev/algoprep && python3 - <<'PY'
import pathlib, re
for src in pathlib.Path('.').glob('**/*.html'):
    if '.git' in src.parts: continue
    for r in sorted(set(re.findall(r'(?:href|src)="([^"#]+)"', src.read_text()))):
        if r.startswith(('http', 'mailto', '#')): continue
        t = (src.parent / r).resolve()
        print(('  OK  ' if t.exists() else ' MISS '), src, '->', r)
PY
```

Validate a lesson's quiz JSON and check for answer-length tells:

```bash
cd /home/naren/dev/algoprep && python3 - <<'PY'
import json, re, pathlib, sys
for p in pathlib.Path('lessons').glob('*.html'):
    for m in re.finditer(r'<script type="application/json"[^>]*>(.*?)</script>', p.read_text(), re.S):
        d = json.loads(m.group(1))
        for q in d['questions']:
            ln = {o['text']: len(o['text']) for o in q['options']}
            c = [o['text'] for o in q['options'] if o.get('correct')]
            assert len(c) == 1, f"{p}: {q['tag']} has {len(c)} correct options"
            v = sorted(ln.values()); flag = ''
            if ln[c[0]] == max(v) and v.count(max(v)) == 1: flag = 'LONGEST'
            if ln[c[0]] == min(v) and v.count(min(v)) == 1: flag = 'SHORTEST'
            words = {len(o['text'].split()) for o in q['options']}
            if len(words) > 1: flag += ' UNEVEN-WORDS'
            print(f"{p.name} {q['tag']:<18} correct={ln[c[0]]:>2} all={v} {flag}")
PY
```

## One-time setup (already done, for reference)

- `git init -b master`, `gh repo create algoprep --public --source=. --remote=origin --push`
- `.nojekyll` added at repo root so GitHub Pages serves the HTML as-is instead of
  running it through Jekyll.
- Pages enabled via `gh api -X POST repos/Thrllionaire/algoprep/pages
  -f "source[branch]=master" -f "source[path]=/"`.
- Progress tracking split into a private repo: `/learning-records/` and `NOTES.md`
  added to the outer `.gitignore`, then `git init -b master` + `gh repo create
  algoprep-progress --private --source=. --remote=origin --push` run from inside
  `learning-records/`.
