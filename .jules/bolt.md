## 2024-04-21 - Spatial Pruning and Path2D Batching
**Learning:** Binary search for spatial pruning must account for object width. A simple search for `obj.x >= minX` can miss wide objects that start before the viewport but overlap it. Tracking `maxObjWidth` and adjusting the search range to `minX - maxObjWidth` ensures correctness. Additionally, callback-based iteration (`forEachInRange`) avoids array allocations in hot loops, reducing GC pressure.
**Action:** Always consider object bounds (not just start position) when implementing spatial queries and favor callbacks over array returns for performance-critical iterators.

## 2024-05-15 - Binary Search Initialization
**Learning:** When using binary search for the first index satisfying a condition, initializing the result to the array length (instead of 0) ensures that if no objects satisfy the condition (e.g., all objects are off-screen to the left), the resulting loop correctly skips all elements rather than falling back to index 0.
**Action:** Always initialize search results to a "null" or "end" state that prevents accidental full-array iteration when no matches are found.
