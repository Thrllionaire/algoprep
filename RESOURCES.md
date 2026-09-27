# Algorithm Problem Intuition — Resources

Curated, high-trust only. Knowledge in lessons should be drawn from here.

## Knowledge

- [NeetCode Roadmap](https://neetcode.io/roadmap)
  A dependency graph of 18 topics, deliberately ordered so each builds on the last
  (Arrays & Hashing → Two Pointers → Sliding Window → Stack → Binary Search → … → Bit
  Manipulation). Use for: deciding *what order* to learn patterns in, and for a curated
  problem set per pattern. This is our spine for the 4–6 week sprint.

- [The NeetCode Roadmap on One Page, with the Pattern Behind Each Topic](https://www.grokkingthecodinginterview.com/blog/neetcode-roadmap)
  Maps each of the 18 roadmap topics to the underlying reusable pattern (e.g. Linked List →
  "Fast & Slow Pointers, In-place Reversal"). Use for: the topic → pattern translation, which
  is exactly the layer our mission cares about.

- [Sean Prashad's Leetcode Patterns](https://seanprashad.com/leetcode-patterns/)
  179 questions grouped by pattern, filterable by difficulty, company and topic. Crucially it
  ships short "how to recognise this" tips per problem. Use for: drilling recognition on a
  specific pattern, and for company-targeted practice once loops are scheduled.
  ([source repo](https://github.com/seanprashad/leetcode-patterns))

- [Grokking the Coding Interview — pattern list](https://github.com/dipjul/Grokking-the-Coding-Interview-Patterns-for-Coding-Questions)
  The canonical 14-pattern taxonomy: Sliding Window, Two Pointers, Fast & Slow Pointers, Merge
  Intervals, Cyclic Sort, In-place LinkedList Reversal, Tree BFS, Tree DFS, Two Heaps, Subsets,
  Modified Binary Search, Bitwise XOR, Top-K Elements, K-way Merge. Use for: the vocabulary of
  pattern names, and per-pattern recognition cues. (The maintained commercial version lives at
  [DesignGurus](https://www.designgurus.io/course/grokking-the-coding-interview); the free
  GitHub mirrors carry the same taxonomy.)

- [USACO Guide — Time Complexity](https://usaco.guide/bronze/time-comp)
  The authoritative constraint→complexity ladder, with the operations-per-second assumption
  stated honestly ("a conservative estimate … is 10^8, but it could be closer to 5·10^8 given
  good constant factors"). Use for: everything about reading constraints. Primary source for
  [lesson 0001](./lessons/0001-read-the-constraints-first.html).

- [Competitive Programmer's Handbook — Antti Laaksonen (free PDF)](https://cses.fi/book/book.pdf)
  Rigorous, free, and short on hand-waving. Chapters 1–2 cover complexity; 6 is greedy; 7 is
  DP; 11–14 graphs. Use for: when a pattern's *why* is unclear and blog posts are being vague.
  Denser than we need for interviews — dip in, don't read cover to cover.

- [Bjork & Bjork on desirable difficulty (retrieval, spacing, interleaving)](https://bjorklab.psych.ucla.edu/research/)
  The learning-science basis for why these lessons quiz rather than explain. Use for: trusting
  the method when a lesson feels harder than reading a tutorial would.

## Wisdom (Communities)

- [r/leetcode](https://www.reddit.com/r/leetcode/)
  Highest-volume place to post "here's my approach, what did I miss". Noisy, but the
  approach-critique threads are genuinely useful. Use for: sanity-checking your triage
  reasoning against strangers.

- [interviewing.io](https://interviewing.io/)
  Anonymous mock interviews with engineers from large companies, plus a large library of
  recorded real interviews. Use for: the "can't explain while coding" muscle, and for
  calibrating what Staff+ narration actually sounds like. The recorded-interview archive is
  free and is the single best wisdom source for interview *performance* as distinct from
  problem solving.

- [Blind](https://www.teamblind.com/)
  Use narrowly: current company-specific question patterns and loop formats. Ignore the
  compensation doom-scrolling.

## Gaps

- **No trusted source yet for reservoir sampling / randomised algorithms in an interview
  context.** Naren named it explicitly; needs a search before that lesson.
- **No source yet on the Staff+-specific bar** — how much the algorithm round actually weighs
  versus design at that level, and what "senior-flavoured" narration looks like. Worth
  resolving early, because it could reshape the mission.
- No verified Python-specific idiom reference (e.g. when `bisect`, `heapq`, `deque`,
  `collections.Counter` are the intended tool). Likely needed as a reference doc.
