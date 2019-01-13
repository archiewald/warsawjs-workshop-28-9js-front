import React, { Component } from "react";
import { addFavourite, removeFavourite } from "../actions";

class PostView extends Component {
  render() {
    return (
      <article className="post">
        <header>
          <h5>{this.props.post.data.title}</h5>
        </header>
        <main>
          {this.props.post.data.type === "image" ? (
            <div>
              <div className="imagepost">
                <img
                  src={
                    this.props.post.data.is_abs
                      ? this.props.post.data.src_abs
                      : `${process.env.REACT_APP_SERVER_BACK}/images/${
                          this.props.post.data.src
                        }`
                  }
                  alt={this.props.post.data.title}
                />
              </div>
            </div>
          ) : (
            <div>
              <div className="textpost">{this.props.post.data.text}</div>
            </div>
          )}
        </main>
        <footer>
          <button>
            <i className="fas fa-thumbs-up" /> {this.props.post.likes}
          </button>
          <button
            onClick={() => {
              addFavourite(this.props.post.id);
            }}
          >
            <i className="far fa-heart" /> Add to favourite
          </button>
          <button
            onClick={() => {
              removeFavourite(this.props.post.id).then(() => {
                this.props.readContentFromIdb();
              });
            }}
          >
            <i className="far fa-heart" /> remove favourite
          </button>
          {this.props.post.data.author ? (
            <span className={"author"}>
              Author: <br />
              <strong>{this.props.post.data.author}</strong>
            </span>
          ) : (
            ""
          )}
        </footer>

        <div />
      </article>
    );
  }
}

export default PostView;
