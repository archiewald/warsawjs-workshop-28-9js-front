import idb from "idb";

export const dbPromise = idb.open("9JS", 1, upgradeDB => {
  upgradeDB.createObjectStore("posts", { keyPath: "id" });
});
