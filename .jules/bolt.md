## 2026-04-17 - [Spatial Sorting for 2D Side-Scrollers]
**Learning:** For side-scrolling games where objects are mostly static, sorting level objects by their horizontal (X) coordinate at load time transforms O(N) rendering and collision loops into O(M) where M is the number of objects visible or near the player. This is a massive win for performance as levels grow in complexity.
**Action:** Always check if game objects can be spatially ordered to enable early-exit loops and frustum culling.
