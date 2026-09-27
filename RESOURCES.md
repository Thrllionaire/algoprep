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

- [USACO Guide — Two Pointers](https://usaco.guide/silver/two-pointers)
  States the *validity condition* for a two-pointer sweep instead of handing out a template:
  "movement in one direction should not reverse the effects of movement in the other direction."
  Splits same-direction (sliding window) from opposite-ends (sorted input). Use for: deciding
  whether a window is legal at all. Primary source for
  [lesson 0002](./lessons/0002-the-shape-of-the-answer.html).

- [USACO Guide — Introduction to Prefix Sums](https://usaco.guide/silver/prefix-sums) and
  [More on Prefix Sums](https://usaco.guide/silver/more-prefix-sums)
  The identity `sum(l..r) = p[r] − p[l−1]`, then max-subarray-via-running-minimum-prefix (i.e.
  Kadane), 2-D prefix sums and difference arrays. Use for: everything contiguous that isn't a
  window. Note the introductory module covers *static range queries only* — the hash-map counting
  trick is not there; it's in the problem solution below.

- [USACO Guide — CSES Subarray Sums II solution](https://usaco.guide/problems/cses-1661-subarray-sums-ii/solution)
  The prefix-sum + hash-map counting technique, worked: "at each index i, we can count the number
  of prefixes with sum equal to prefixSum[i]−x". Use for: counting exact-sum subarrays, which is
  the one contiguous problem a sliding window gets *wrong* rather than slow.

- [Competitive Programmer's Handbook — ch. 8, *Amortized analysis*](https://cses.fi/book/book.pdf)
  Pages 77–79. Presents two pointers as an *amortisation result* rather than a template, which is
  the framing that makes the nested `while` defensible: *"While there is no useful upper bound on
  how many steps the pointer can move on a single turn, we know that the pointer moves a total of
  O(n) steps during the algorithm, because it only moves to the right."* Note its subarray-sum
  loop is the mirror image of the usual template (left outer, right inner) — useful evidence that
  the template is not the technique. Primary source for
  [lesson 0003](./lessons/0003-the-window-invariant.html).

- [USACO Guide — Sliding Window](https://usaco.guide/gold/sliding-window)
  Covers the fixed-size window and the monotonic-deque variant for window minimum/maximum — the
  two cases where the general shrink-loop template does not apply. Quotes CPH for the definition:
  *"A sliding window is a constant-size subarray that moves from left to right through the array."*
  Use for: the variants deliberately deferred out of lesson 0003.

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

- **No trusted source yet for greedy-versus-DP.** Lesson 0002 deliberately left greedy out of
  the shape × return-type grid because it is a proof obligation rather than a shape. That needs
  its own lesson and a source on *exchange arguments*, which nothing here covers.

- Searched for high-trust "how to recognise patterns" writing and found mostly SEO content
  (leetcopilot, studocu, assorted Medium posts). Deliberately excluded. The USACO Guide modules
  above are the trustworthy substitute: they state conditions rather than listing templates.

- **No high-trust source for the `exactly(k) = atMost(k) - atMost(k-1)` counting identity.**
  Searched; the results are entirely SEO content and LeetCode discussion posts, which this course
  excludes. It is one line of inclusion–exclusion, so [lesson 0003](./lessons/0003-the-window-invariant.html)
  **derives it in place** rather than citing anyone. Flagged here so the lack of a citation is a
  recorded decision rather than an oversight.
