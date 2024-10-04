import { initEdgeStore } from "@edgestore/server";

const es = initEdgeStore.create();

// Export the router configuration separately
export const edgeStoreRouter = es.router({
  myPublicImages: es.imageBucket(),
});
