# Glossary

Terms are used with exactly these meanings throughout the course. Where a term is *ours* —
coined for this course rather than standard — it says so, so you don't carry it into an
interview expecting to be understood.

---

**Budget** *(our term)* — the slowest time complexity you can afford, read off the input
constraints. See [lesson 0001](./lessons/0001-read-the-constraints-first.html) and the
[constraint ladder](./reference/0001-constraint-ladder.html).

**Contiguous** — occupying consecutive positions, with nothing skipped. The single most
load-bearing word in a problem statement: it separates subarrays from subsequences, and
therefore separates an O(n²) search space from a 2ⁿ one.

**Dynamic programming (DP)** — solving a problem by combining answers to smaller overlapping
subproblems, each computed once and reused. The defining feature is *overlap*: if subproblems
never repeat, you have plain recursion, not DP.

**Invariant** — a statement that is true every time control reaches a particular point in the
algorithm. "The window always contains at most k distinct characters" is an invariant. Getting
the invariant wrong, rather than the pattern wrong, is the most common way a correctly-identified
approach still fails.

**Kadane's algorithm** — the O(n) sweep for maximum-sum contiguous subarray. Equivalently, a
prefix-sum sweep that tracks the running *minimum* prefix seen so far; the best subarray ending
at `r` is `p[r]` minus that minimum.
([USACO Guide](https://usaco.guide/silver/more-prefix-sums))

**Monotonic** — moving in one direction only. A predicate is monotonic over a window if, once it
becomes false as the window grows, it stays false. This is the precise condition that licenses a
sliding window: *"movement in one direction should not reverse the effects of movement in the
other direction."* ([USACO Guide](https://usaco.guide/silver/two-pointers))

**Prefix sum** — an array `p` where `p[k]` is the sum of the original array's first `k` elements.
Its whole purpose is the identity `sum(arr[l..r]) = p[r] − p[l−1]`, which turns any range-sum
question into one subtraction. ([USACO Guide](https://usaco.guide/silver/prefix-sums))

**Return type** *(our term)* — what the problem asks you to hand back: *existence* (a yes/no),
a *count*, an *optimum* (a min or max value), the *object itself* (reconstruct the winning
subarray, path, or string), or *all* objects. Within a fixed shape, the return type decides the
machinery. See [lesson 0002](./lessons/0002-the-shape-of-the-answer.html).

**Search space** — the set of candidate answers implied by the shape. Its *size* is the number
that matters: a contiguous shape has n(n+1)/2 candidates, a subsequence shape has 2ⁿ.

**Shape** *(our term)* — the geometry of the thing the problem asks you to find: a contiguous
run, an order-preserving selection, an unordered selection, a pair, or an arrangement. See
[lesson 0002](./lessons/0002-the-shape-of-the-answer.html).

**Sliding window** — a pair of indices `l ≤ r` sweeping left to right over a sequence, where
each index only ever moves forward. Because both move at most n times in total, the sweep is
O(n) even though it examines many windows. Valid only when the governing predicate is monotonic.

**Subarray** — a contiguous slice of an array. There are n(n+1)/2 non-empty subarrays of an
n-element array (choose a start and an end), which is O(n²) of them.

**Subsequence** — a selection obtained by deleting zero or more elements *without reordering*
the rest. Not necessarily contiguous. There are 2ⁿ − 1 non-empty subsequences (each element is
in or out), which is why subsequence problems are DP or bitmask, never enumeration, unless n is
tiny.

**Subset** — a selection where order carries no meaning at all. Same 2ⁿ count as subsequences;
the difference is that with a subset you are free to sort the input first, and with a
subsequence you are not.

**Substring** — a subarray, in the context of strings. Contiguous. The word "substring" in a
problem statement is therefore a contiguity signal exactly as "subarray" is.

**Two pointers** — any technique using two indices that each traverse the input once. A sliding
window is the same-direction variant; the opposite-ends variant walks inward from both ends and
relies on the input being sorted. ([USACO Guide](https://usaco.guide/silver/two-pointers))
