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

- [CSES Problem Set — Subarray Sums I (1660)](https://cses.fi/problemset/task/1660) and
  [Subarray Sums II (1661)](https://cses.fi/problemset/task/1661)
  The cleanest natural experiment in interview prep: two problems whose statements differ by the
  single word *positive*, with the same bound (n ≤ 2·10⁵) and the same return type, that require
  different techniques. 1660 is a window; 1661 is a prefix-sum hash map, because the window is no
  longer licensed. Use for: the window-versus-prefix decision, and as the practice pair for
  [lesson 0004](./lessons/0004-the-prefix-pair.html). Primary practice source for that lesson;
  the technique source is the USACO solution page above.

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

- [USACO Guide — Binary Search](https://usaco.guide/silver/binary-search)
  Covers binary search over an array, then generalises: *"binary search on the answer only works
  if the answer function is monotonic."* Gives the `last_true`/`first_true` templates for
  minimize/maximize-the-answer problems. Use for: everything about binary searching a constructed
  range of candidate answers rather than a sorted array. Primary source for
  [lesson 0006](./lessons/0006-choosing-the-search-space.html).

- [LeetCode 875, Koko Eating Bananas](https://leetcode.com/problems/koko-eating-bananas/) and
  [LeetCode 1011, Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/)
  Two "minimize the answer under a constraint" problems with the same binary-search-on-the-answer
  shape and two different feasibility checks. Practice pair for
  [lesson 0006](./lessons/0006-choosing-the-search-space.html), alongside
  [LeetCode 704, Binary Search](https://leetcode.com/problems/binary-search/) as the plain
  sorted-array contrast the lesson opens with.

- [Competitive Programmer's Handbook — ch. 7, *Dynamic Programming*](https://cses.fi/book/book.pdf)
  Pages 65–68 (read via `pdftotext`; the PDF's text is otherwise compressed and not directly
  fetchable). Introduces DP through the coin problem — fewest coins summing to x — stated first as
  a plain recurrence, then memoized, then rewritten as a bottom-up loop: *"the idea in dynamic
  programming is to formulate the problem recursively so that the solution to the problem can be
  calculated from solutions to smaller subproblems,"* and on preferring the iterative form,
  *"most competitive programmers prefer this implementation, because it is shorter and has lower
  constant factors ... still, it is often easier to think about dynamic programming solutions in
  terms of recursive functions."* Primary source for
  [lesson 0007](./lessons/0007-recursion-memo-table.html).

- [CSES Problem Set — Coin Combinations I (1633)](https://cses.fi/problemset/task/1633) and
  [Coin Combinations II (1634)](https://cses.fi/problemset/task/1634)
  The minimum-coins and count-the-ways versions of the same coin problem — same state, two
  different recurrences. Practice pair for
  [lesson 0007](./lessons/0007-recursion-memo-table.html).

- [Competitive Programmer's Handbook — ch. 14, *Tree algorithms*](https://cses.fi/book/book.pdf)
  Pages 133–136 (read via `pdftotext`). The best short statement of why trees are a recursion
  problem rather than a graph problem: *"the structure of a rooted tree is recursive: each node of
  the tree acts as the root of a subtree that contains the node itself and all nodes that are in
  the subtrees of its children."* Gives the DFS with the parent parameter (*"the purpose of the
  parameter e is to make sure that the search only moves to nodes that have not been visited
  yet"*), subtree sizes by DP, and — the reason this chapter matters more than its length suggests
  — the diameter with its two quantities *named apart*: `toLeaf(x)`, *"the maximum length of a path
  from x to any leaf"*, versus `maxLength(x)`, *"the maximum length of a path whose highest point
  is x"*. Confusing those two is the standard tree bug, and almost no other source names them
  separately. Primary source for
  [lesson 0008](./lessons/0008-what-the-children-return.html).

- [USACO Guide — Introduction to Tree Algorithms](https://usaco.guide/silver/intro-tree)
  The traversal-order vocabulary, stated as definitions rather than templates: *"Preorder: process
  the current node before recursively visiting its children"*, *"Postorder: recursively visit all
  children before processing the current node"*, and the subtree-size recurrence, *"a subtree is
  composed of a root node and the subtrees of the root's children. Thus, the size of a subtree is
  one plus the size of the root's childrens' subtrees."* Use for: naming pre-order versus
  post-order correctly, which is the same decision as "does this information come from above or
  below".

- [Python docs — `sys.setrecursionlimit`](https://docs.python.org/3/library/sys.html#sys.setrecursionlimit)
  The authority for the limit that turns a correct recursive tree DFS into a `RecursionError` on a
  path-shaped input: *"this limit prevents infinite recursion from causing an overflow of the C
  stack and crashing Python"*, and the warning that goes with raising it — *"the highest possible
  limit is platform-dependent … this should be done with care, because a too-high limit can lead
  to a crash."* Use for: the depth half of reading a tree problem's bound.

- [CSES Problem Set — Subordinates (1674)](https://cses.fi/problemset/task/1674) and
  [Tree Diameter (1132)](https://cses.fi/problemset/task/1132)
  Subtree sizes and the diameter, both at n ≤ 2·10⁵ — large enough that a path-shaped input meets
  Python's recursion limit, so they exercise the depth tell as well as the technique. Practice pair
  for [lesson 0008](./lessons/0008-what-the-children-return.html). The `.left`/`.right` versions of
  the same two problems are [LeetCode 104](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
  and [LeetCode 543](https://leetcode.com/problems/diameter-of-binary-tree/).

- [USACO Guide — Priority Queues](https://usaco.guide/silver/priority-queues)
  States the O(log N) guarantee plainly — *"insertion of elements, deletion of the element
  considered highest priority, and retrieval of the highest priority element, all in O(log N)
  time"* — and the direct recommendation, *"priority queues are simpler and faster than sets, so
  you should use them instead whenever possible."* Use for: the general case for a heap over a
  sorted structure. Primary source for [lesson 0009](./lessons/0009-the-root-knows-one-thing.html).

- [Python docs — `heapq`](https://docs.python.org/3/library/heapq.html)
  The min-heap invariant itself — *"the smallest element is always the root, `heap[0]`"* — plus
  the module's own honest warning that `nlargest`/`nsmallest` "perform best for smaller values of
  n," and that a one-shot top-k over a large collection is better served by `sorted()`. That
  warning is the static side of [lesson 0009](./lessons/0009-the-root-knows-one-thing.html)'s
  static-versus-stream tell, stated by the source itself rather than derived.

- [LeetCode 215, Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/),
  [LeetCode 703, Kth Largest Element in a Stream](https://leetcode.com/problems/kth-largest-element-in-a-stream/),
  and [LeetCode 347, Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/)
  215/703 are the minimal pair for [lesson 0009](./lessons/0009-the-root-knows-one-thing.html): same
  question, static array versus a growing stream. 347 is the follow-up practice problem — the same
  cap-at-k min-heap, over counts instead of raw values.

- [USACO Guide — Greedy Algorithms with Sorting](https://usaco.guide/silver/greedy-sorting)
  Works the "maximize the number of non-overlapping events" problem directly, and states the
  exchange argument for why sorting by *end* time (not start) is what makes the greedy choice
  provably optimal: *"If we have two events E₁ and E₂, with E₂ ending later than E₁, then it is
  always optimal to select E₁... the set of events that can go after E₂ is a subset of the events
  that can go after E₁."* Use for: the proof behind the sort-by-end half of
  [lesson 0010](./lessons/0010-which-end-you-sort-by.html). Practice pair: [LeetCode 435,
  Non-overlapping Intervals](https://leetcode.com/problems/non-overlapping-intervals/).

- [USACO Guide — Sweep Line](https://usaco.guide/plat/sweep-line)
  Platinum, and more than either interval lesson strictly needs, but its restaurant-customers
  example states the whole technique directly, including the one detail most treatments skip:
  *"Each interval is converted into two events: (aᵢ, +1) for an arrival and (bᵢ, −1) for a
  departure. All events are sorted by time; if two events coincide, departures are processed
  before arrivals."* That tie-break is the primary source for
  [lesson 0011](./lessons/0011-counting-maximum-overlap.html#tie)'s correctness bug — get it
  backwards and a meeting ending the instant another starts is counted as briefly overlapping it.
  Counting maximum overlap (Meeting Rooms II) is the point where heaps
  ([lesson 0009](./lessons/0009-the-root-knows-one-thing.html)) and sort-and-sweep intervals
  ([lesson 0010](./lessons/0010-which-end-you-sort-by.html)) meet, and this page is the rare case
  in this course of a technique stated outright rather than derived in place.

- [CSES Problem Set — Room Allocation (1164)](https://cses.fi/problemset/task/1164)
  The free practice problem for [lesson 0011](./lessons/0011-counting-maximum-overlap.html):
  identical to LeetCode 253 (Meeting Rooms II, premium-locked) in substance, and asks for the room
  assignment itself, not just the count — which only the heap solution in that lesson gives you
  directly.

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

- **No high-trust source for the "min-heap capped at size k gives the k-th largest" trick
  itself.** The USACO Guide and Python docs above establish the heap primitive and the
  static-versus-stream distinction, but neither states the specific inversion (min-heap, not
  max-heap, for a *largest*-k query). It is one line of reasoning from the heap property, so
  [lesson 0009](./lessons/0009-the-root-knows-one-thing.html) derives it in place, the same call
  as the `exactly(k)` identity in lesson 0003.

- **Resolved this session:** the prefix-sum *counting* technique did have a trusted source after
  all — the USACO Guide's CSES 1661 solution page, already listed above. Lesson 0004 cites it
  directly and derives nothing in place. This is unlike the `exactly(k) = atMost(k) − atMost(k−1)`
  identity below, which genuinely has none.

- **No high-trust source states the merge-overlapping-intervals overlap condition itself**
  (sort by start; two intervals overlap once the next one's start is ≤ the running merged end).
  USACO Guide's greedy-sorting page proves the *sort-by-end* half (max non-overlapping count) with
  a real exchange argument, but the union/merge direction is common competitive-programming
  knowledge with no single citable primary source — [lesson 0010](./lessons/0010-which-end-you-sort-by.html)
  derives it in place and property-tests it, the same call as the `exactly(k)` identity in lesson
  0003 and the heap inversion in lesson 0009.

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

- [USACO Guide — DP with Bitmasks](https://usaco.guide/gold/dp-bitmasks) — the `dp[S][i]`
  definition for Hamiltonian Flights; states honestly that its Python solution TLEs.
- [CSES 1623 — Apple Division](https://cses.fi/problemset/task/1623) — n ≤ 20, split into two
  groups; the lesson 0012 practice problem.
- **Gap:** no high-trust source states the `mask & -mask` lowest-bit incremental subset-sum
  trick; [lesson 0012](./lessons/0012-subsets-as-integers.html) derives it in place and
  property-tests it (0 disagreements / 3,000 trials against brute force).
