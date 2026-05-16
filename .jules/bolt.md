## 2024-04-21 - Spatial Pruning and Path2D Batching
**Learning:** Binary search for spatial pruning must account for object width. A simple search for `obj.x >= minX` can miss wide objects that start before the viewport but overlap it. Tracking `maxObjWidth` and adjusting the search range to `minX - maxObjWidth` ensures correctness. Additionally, callback-based iteration (`forEachInRange`) avoids array allocations in hot loops, reducing GC pressure.
**Action:** Always consider object bounds (not just start position) when implementing spatial queries and favor callbacks over array returns for performance-critical iterators.

## 2024-05-24 - Path2D Batching vs. Viewport Culling
**Learning:** While `Path2D` is efficient for batching, drawing a massive static path every frame can be wasteful for the GPU in extremely long levels. Combining binary search (O(log N)) with dynamic `Path2D` creation for only visible objects (O(K)) provides the best of both worlds: minimal JS overhead and optimal GPU usage.
**Action:** Use spatial pruning to identify visible objects before constructing or submitting batch draw calls to the canvas.
