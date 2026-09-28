# algoprep

A short course on **pattern-recognition intuition** for LeetCode-style algorithm problems,
aimed at Staff Engineer+ interviews.

**Live site: https://thrllionaire.github.io/algoprep/**

Most interview prep teaches patterns one at a time and hopes recognition emerges. This course
runs the other way: it teaches **triage** first, because ruling out the techniques that *cannot*
apply is far easier than naming the one that does — and it does most of the work.

## Lessons

1. [Read the Constraints First](https://thrllionaire.github.io/algoprep/lessons/0001-read-the-constraints-first.html)
   — the input bound gives you a time budget, and the budget eliminates whole families of
   technique before you understand the problem. Interactive constraint ladder plus a
   six-question triage drill.
2. [The Shape of the Answer](https://thrllionaire.github.io/algoprep/lessons/0002-the-shape-of-the-answer.html)
   — count the candidates the answer's shape implies, divide by the budget, and the machinery is
   forced. Includes the one contrast that fails *silently* when you get it wrong: sliding window
   versus prefix sums.
3. [The Window Invariant](https://thrllionaire.github.io/algoprep/lessons/0003-the-window-invariant.html)
   — write one sentence before the loop and the shrink condition stops being something you recall.
   Includes a step-through trace where you place `left` yourself, and the longest-versus-shortest
   inversion that catches almost everyone.
4. [The Prefix Pair](https://thrllionaire.github.io/algoprep/lessons/0004-the-prefix-pair.html)
   — two CSES problems one word apart, and the technique changes completely. Stop thinking about
   subarrays and think about the boundaries either side of them; the hash map is only how you stop
   paying for the search. Includes a multi-select trace over a prefix tape.
5. [The Inward Walk](https://thrllionaire.github.io/algoprep/lessons/0005-the-inward-walk.html)
   — Two Sum, sorted or not, one word apart again. Walking in from both ends is licensed by
   sortedness rather than a monotonic predicate, and the proof is what tells you which pointer is
   safe to move.
6. [Choosing the Search Space](https://thrllionaire.github.io/algoprep/lessons/0006-choosing-the-search-space.html)
   — binary search on the answer. There's no array this time; you build the search space from a
   range of candidates and the licence is a monotonic feasibility check instead of a sorted
   structure.

## Reference cards

Printable, revisit-often distillations. These are the durable artefacts; lessons are scaffolding.

1. [The Constraint Ladder](https://thrllionaire.github.io/algoprep/reference/0001-constraint-ladder.html)
   — bound → budget → surviving families, plus the eight tells, on one page.
2. [Shape to Family](https://thrllionaire.github.io/algoprep/reference/0002-shape-to-family.html)
   — candidate counts per shape, the shape × return-type matrix, the window-vs-prefix-sum rule,
   and both Python templates.
3. [Window Invariants](https://thrllionaire.github.io/algoprep/reference/0003-window-invariant.html)
   — the skeleton's four blanks, all three update positions, the longest and shortest templates
   side by side, and the table of cases where a window is the wrong tool.
4. [The Prefix Pair](https://thrllionaire.github.io/algoprep/reference/0004-prefix-pair.html)
   — the identity, the four templates, the key-selection table, the four silent bugs, and the
   window-versus-prefix decision on one page.

## Course materials

- [MISSION.md](./MISSION.md) — what this course is for, and what it is not.
- [GLOSSARY.md](./GLOSSARY.md) — every term used with exactly one meaning, and marked where it is
  ours rather than standard.
- [RESOURCES.md](./RESOURCES.md) — the trusted sources behind every claim, communities worth
  joining, and the gaps still open.
- [PUBLISHING.md](./PUBLISHING.md) — how to add a lesson and ship it.

## Repo layout

```
index.html            homepage
mission.html          generated from MISSION.md by ./build.sh
resources.html        generated from RESOURCES.md by ./build.sh
glossary.html         generated from GLOSSARY.md by ./build.sh
lessons/              NNNN-slug.html, committed as-is and served directly
reference/            NNNN-slug.html, numbered to match its lesson
assets/               shared components — reuse before authoring anything new
build.sh              the only generation step (markdown pages → HTML)
```

Shared components in `assets/`:

- `lesson.css` — the house style. Every page links it.
- `widgets.css` — styles for the interactive widgets below.
- `quiz.js` — `AlgoQuiz`: retrieval-practice quiz with shuffled options, a commit-first gate,
  immediate explanations, and a reshuffled replay.
- `ladder.js` — `ConstraintLadder`: type an `n`, see your budget and the surviving families.
- `grid.js` — `DecisionGrid`: a generic two-axis lookup table with a detail panel. Used for
  shape × return type; reuse it for any future taxonomy.
- `window.js` — `WindowTracer`: a step-through trace of any forward-only two-pointer sweep. The
  learner clicks where `left` comes to rest, so it is free retrieval rather than multiple choice.
  Reuse it for opposite-ends two pointers, or binary search on the answer.
- `prefix.js` — `PrefixTracer`: a step-through trace of any complement-lookup sweep over a prefix
  array. The learner multi-selects *every* earlier boundary that closes a qualifying subarray.
  Generic over the prefix statistic, so reuse it for sums, sums mod k, ±1 balance, or parity masks.

Learning records and working notes live in a separate private repo; see
[PUBLISHING.md](./PUBLISHING.md).

## Built with

Written with [Claude Code](https://claude.com/claude-code) using the
[`/teach`](https://github.com/anthropics/claude-code) skill from `mattpocock-skills`.
