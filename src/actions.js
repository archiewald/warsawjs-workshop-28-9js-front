import { dbPromise } from "./idb.js";

// export const addFavourite = id => {
//   console.log({ id });
//   dbPromise.then(db => {
//     db.transaction("posts")
//       .objectStore("posts")
//       .get(id)
//       .then(post => {
//         console.log({ post });
//         dbPromise.then(dbt => {
//           if (post.data.type === "image") {
//             addImage(
//               `${process.env.REACT_APP_SERVER_BACK}/images/${post.data.src}`
//             );
//           }
//           dbt
//             .transaction("posts-fav", "readwrite")
//             .objectStore("posts-fav")
//             .put(post);
//         });
//       });
//   });
// };

export const addFavourite = id => {
  dbPromise.then(db => {
    db.transaction("posts")
      .objectStore("posts")
      .get(id)
      .then(post => {
        if (post.data.type === "image")
          addImage(
            `${process.env.REACT_APP_SERVER_BACK}/images/${post.data.src}`
          );

        dbPromise.then(dbt => {
          dbt
            .transaction("posts-fav", "readwrite")
            .objectStore("posts-fav")
            .put(post);
        });
      });
  });
};

export const removeFavourite = id => {
  console.log({ id });
  return dbPromise.then(db => {
    db.transaction("posts-fav", "readwrite")
      .objectStore("posts-fav")
      .delete(id);
  });
};

function addImage(url) {
  caches.open("storage-posts").then(cache => {
    fetch(url).then(response => {
      console.log({ response });
      cache.put(url, response.clone);
    });
  });
}
