import { createElementWithAttribute } from "../utils/createElementWithAttribute.js";

function PostsContainer({ $app, initialState }) {
  this.$app = $app;
  this.state = initialState;
  this.$target = createElementWithAttribute({
    tag: "div",
    attributes: { id: "posts-container" },
  });
  this.$app.appendChild(this.$target);
  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };
  this.render = () => {
    if (this.state.searchWord.length >= 1) {
      this.$target.innerHTML = `${this.state.postsBySearch
        .map(
          (post) => `<div class="post">
            <h2 class="post-title">${post.title}</h2>
            <div class="post-body">${post.body}</div>
            <div class="post-info"></div>
            <div class="number">${post.id}</div>
          </div>`
        )
        .join("")}`;
    } else {
      this.$target.innerHTML = `${this.state.posts
        .map(
          (post) => `<div class="post">
            <h2 class="post-title">${post.title}</h2>
            <div class="post-body">${post.body}</div>
            <div class="post-info"></div>
            <div class="number">${post.id}</div>
          </div>`
        )
        .join("")}`;
    }

    //   post를 그려서
  };
}

export default PostsContainer;
