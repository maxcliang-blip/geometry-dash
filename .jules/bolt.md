## 2024-04-21 - Spatial Pruning and Path2D Batching
**Learning:** Binary search for spatial pruning must account for object width. A simple search for `obj.x >= minX` can miss wide objects that start before the viewport but overlap it. Tracking `maxObjWidth` and adjusting the search range to `minX - maxObjWidth` ensures correctness. Additionally, callback-based iteration (`forEachInRange`) avoids array allocations in hot loops, reducing GC pressure.
**Action:** Always consider object bounds (not just start position) when implementing spatial queries and favor callbacks over array returns for performance-critical iterators.

## 2026-05-21 - Viewport Culling and Path2D Batching Synergy
**Learning:** Combining spatial pruning (via binary search) with Path2D batching provides the best performance balance. Batching reduces Canvas API overhead by grouping similar geometry, while culling prevents constructing and processing off-screen geometry entirely, which is critical for extremely long levels where batching alone would still process too many points.
**Action:** Always implement viewport culling even when using batched rendering to maintain O(visible) complexity instead of O(total).
