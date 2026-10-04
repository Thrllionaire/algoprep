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
7. [Recursion, Memo, Table](https://thrllionaire.github.io/algoprep/lessons/0007-recursion-memo-table.html)
   — the same coin-problem function written three ways, so the recursion, the memoization and the
   bottom-up table stop looking like three separate topics and start looking like one idea with
   different bookkeeping.
8. [What the Children Return](https://thrllionaire.github.io/algoprep/lessons/0008-what-the-children-return.html)
   — trees and DFS, where the recursion *is* the data structure, so naming the pattern is free and
   the only real decision is what the function returns. Includes the diameter bug that is wrong on
   81% of random trees and right on every tree you would sketch by hand, and a click-the-nodes
   trace of a post-order walk.
9. [The Root Knows One Thing](https://thrllionaire.github.io/algoprep/lessons/0009-the-root-knows-one-thing.html)
   — heaps, the first pattern in this course whose licence is a partial order rather than a full
   one. The classic inversion — a min-heap capped at k for a k-th-*largest* query — and the bug
   that agrees with the correct answer on the first query and disagrees on 99% of every query
   after.
10. [Which End You Sort By](https://thrllionaire.github.io/algoprep/lessons/0010-which-end-you-sort-by.html)
    — two interval problems, same `[start, end]` input shape, opposite sort key: keep the most
    non-overlapping (sort by end) versus merge into coverage (sort by start). Swapping the key on
    either one breaks it on about one interval set in six — the two mistakes are mirror images of
    the same root cause.
11. [Counting Maximum Overlap](https://thrllionaire.github.io/algoprep/lessons/0011-counting-maximum-overlap.html)
    — Meeting Rooms II, solved two ways: a heap of end times (lesson 0009's licence, reapplied)
    and a sweep-line counter over arrival/departure events (lesson 0010's sort-once-sweep-once
    skeleton, with a counter in place of a pairwise comparison). The one new hazard is a tie-break
    the sweep needs and the heap doesn't — sort arrivals before departures and a meeting ending
    the instant another starts is wrongly counted as overlapping, on 36% of random trials.
12. [Subsets as Integers](https://thrllionaire.github.io/algoprep/lessons/0012-subsets-as-integers.html)
    — `n ≤ 20` cashed in: a subset is a bitmask, 2²⁰ is affordable and 20! is not; a missing shift
    in the membership test is wrong on 39% of random inputs.
13. [Prune Before You Recurse](https://thrllionaire.github.io/algoprep/lessons/0013-prune-before-you-recurse.html)
    — backtracking as choose, explore, undo, with the legality check before the recursive call:
    8-queens visits ~2,000 nodes instead of ~110,000; forgetting the undo is wrong on 31% of random boards.
14. [Keep With Probability One Over i](https://thrllionaire.github.io/algoprep/lessons/0014-keep-with-probability-one-over-i.html)
    — reservoir sampling: a uniform pick from a stream read once, kept fair by replacing with
    probability 1/i; the product telescopes to 1/n, and the fair-coin shortcut returns the last item
    50% of the time.
15. [Settle Each Node Once](https://thrllionaire.github.io/algoprep/lessons/0015-settle-each-node-once.html)
    — graph BFS/DFS: a visited set marked the moment a node is discovered, needed the instant a
    graph (unlike lesson 0008's trees) can offer more than one path to a node. Marking it one step
    late instead of at discovery turns 26 queue pushes into 106 on a 26-node, 105-edge graph.
16. [Path Compression Pays for Itself](https://thrllionaire.github.io/algoprep/lessons/0016-path-compression-pays-for-itself.html)
    — union-find: repeated or incremental connectivity questions answered by a parent-pointer
    forest instead of a fresh traversal every time. Union by size plus path compression keeps it
    near O(1); skip the size check and the same 2,000-node chain costs 1,999,000 pointer hops
    instead of 1,999.
17. [Nothing Left Pointing At It](https://thrllionaire.github.io/algoprep/lessons/0017-nothing-left-pointing-at-it.html)
    — topological sort: repeatedly peel off whatever has nothing left pointing at it, using
    in-degree counts rather than a single visited set. The one-visited-set shortcut for cycle
    detection falsely flags 75.4% of real, cycle-free dependency graphs.
18. [Pop What Can Never Answer](https://thrllionaire.github.io/algoprep/lessons/0018-pop-what-can-never-answer.html)
    — monotonic stack: nearest larger or smaller neighbour per element in O(n), by popping every
    waiting position a new arrival beats. Using `<=` instead of `<` disagrees with brute force on
    65.8% of tie-heavy arrays.
19. [One Node Per Prefix](https://thrllionaire.github.io/algoprep/lessons/0019-one-node-per-prefix.html)
    — tries: one node per distinct prefix answers prefix questions in O(length). Skipping the end
    flag makes `search` wrong on 14.6% of random queries.
20. [Two Prefixes, One Cell](https://thrllionaire.github.io/algoprep/lessons/0020-two-prefixes-one-cell.html)
    — two-string DP: edit distance as a grid with one cell per pair of prefix lengths. Lockstep
    greedy comparison is wrong on 38.7% of random small pairs.
21. [Cheapest First](https://thrllionaire.github.io/algoprep/lessons/0021-cheapest-first.html)
    — Dijkstra: settle the cheapest unsettled node via a min-heap. BFS with weights is wrong on 20.0%
    of random small graphs.
22. [Fingerprint, Then Check](https://thrllionaire.github.io/algoprep/lessons/0022-fingerprint-then-check.html)
    — rolling hash: prefix fingerprints make substring comparison O(1); different fingerprints prove a
    mismatch, equal ones only nominate a candidate. A character-sum fingerprint is wrong on 32.5% of
    random small cases.
23. [Counterexample Before Code](https://thrllionaire.github.io/algoprep/lessons/0023-counterexample-before-code.html)
    — greedy versus DP: hunt a counterexample on tiny inputs, then state the exchange argument.
    Largest-coin-first is wrong on 9.8% of random coin sets.

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
5. [Tree Recursion](https://thrllionaire.github.io/algoprep/reference/0008-tree-recursion.html)
   — the two questions to ask before writing a tree function, the three skeletons, which one each
   classic tree problem needs, the four silent bugs, and the recursion-depth fix.

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
- `tree.js` — `TreeTracer`: a step-through trace of a recursive walk over a rooted tree. The
  learner clicks the node the recursion settles next, with no options shown, and settled nodes keep
  the value they returned. Generic over tree shape, traversal order and the returned value, so
  reuse it for pre-order, in-order, BFS by level, or DFS over a graph.

Learning records and working notes live in a separate private repo; see
[PUBLISHING.md](./PUBLISHING.md).

## Built with

Written with [Claude Code](https://claude.com/claude-code) using the
[`/teach`](https://github.com/anthropics/claude-code) skill from `mattpocock-skills`.
