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

## Reference cards

Printable, revisit-often distillations. These are the durable artefacts; lessons are scaffolding.

1. [The Constraint Ladder](https://thrllionaire.github.io/algoprep/reference/0001-constraint-ladder.html)
   — bound → budget → surviving families, plus the eight tells, on one page.

## Course materials

- [MISSION.md](./MISSION.md) — what this course is for, and what it is not.
- [RESOURCES.md](./RESOURCES.md) — the trusted sources behind every claim, communities worth
  joining, and the gaps still open.
- [PUBLISHING.md](./PUBLISHING.md) — how to add a lesson and ship it.

## Repo layout

```
index.html            homepage
mission.html          generated from MISSION.md by ./build.sh
resources.html        generated from RESOURCES.md by ./build.sh
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

Learning records and working notes live in a separate private repo; see
[PUBLISHING.md](./PUBLISHING.md).

## Built with

Written with [Claude Code](https://claude.com/claude-code) using the
[`/teach`](https://github.com/anthropics/claude-code) skill from `mattpocock-skills`.
