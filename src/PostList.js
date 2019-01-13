import React, { Component } from "react";
import PostView from "./posts/postView";
import { dbPromise } from "./idb";

class PostList extends Component {
  defaultPage = 1;

  state = {
    posts: [],
    notNewPost: true,
    noPostCaches: false
  };

  componentDidMount() {
    this.loadPage();
  }

  loadPage = () => {
    if (this.state.noPostCaches) return;

    fetch(
      `${process.env.REACT_APP_SERVER_BACK}/posts/?_page=${this
        .defaultPage++}}&_limit=4&_sort=createdAt&_order=asc`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          accept: "application/json"
        }
      }
    )
      .then(res => res.json())
      .then(res => {
        dbPromise.then(db => {
          var tx = db.transaction("posts", "readwrite");
          res.map(item => {
            console.log({ item });
            tx.objectStore("posts").put({
              id: item.id,
              createdAt: item.createdAt,
              likes: item.likes,
              data: { ...item }
            });
            return false;
          });
        });
        //   .then(() => {
        //     this.readContentFromIdb();
        //   })
        //   .catch(() => {});
      });
  };

  render() {
    return (
      <div id="content">
        <h1>Home page list</h1>
        <h4 className={"subheader"}>Order by</h4>
        <div className="orderOption">
          <button>By date</button>
          <button>By likes</button>
        </div>
        {this.state.posts.length ? (
          this.state.posts.map(post => (
            <PostView
              reloadIndexDb={this.readContentFromIdb}
              listFacouriteId={this.state.listFacouriteId}
              post={post}
              key={post.id}
            />
          ))
        ) : (
          <h4>There aren't any posts</h4>
        )}
        {!this.state.noPostCaches ? (
          <div>
            <button
              disabled={this.state.order === "by-likes"}
              className={"loadMore"}
              onClick={() => {
                this.loadPage();
              }}
            >
              {this.state.order === "by-likes"
                ? "To load more content you have to change order"
                : "Load more funny content"}
            </button>
          </div>
        ) : (
          <div>That's over. Finally just go outside.</div>
        )}
      </div>
    );
  }
}

export default PostList;
