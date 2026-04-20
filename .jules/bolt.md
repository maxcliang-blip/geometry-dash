## 2025-05-14 - Performance Optimizations for Game Engine

**Learning:** Sorting level objects by X-coordinate in the constructor allows for efficient O(log N) lookup of relevant objects for collision and rendering using binary search, significantly reducing the per-frame processing cost from O(N) to O(Viewport).

**Action:** Always sort static level data by a spatial dimension (like X) during initialization to enable spatial partitioning/pruning. Use `Path2D` for batching similar shapes in Canvas to minimize context state changes and draw calls. Ensure binary search implementations handle edge cases where the range is outside the data set.
