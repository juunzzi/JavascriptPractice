import { getPostsByPageId } from "../utils/api.js";
import FilterContainer from "./FilterContainer.js";
import Loader from "./Loader.js";
import PostsContainer from "./PostsContainer.js";

function App({ $app }) {
  this.$app = $app;
  this.state = {
    posts: [],
    searchWord: "",
    postsBySearch: [],
    loading: false,
    pageID: 1,
  };

  const filter = new FilterContainer({
    $app,
    initialState: { searchWord: this.state.searchWord },
    onChange: (e) => {
      const {
        target: { value },
      } = e;
      const postsBySearch = this.state.posts.filter(
        (post) => post.title.includes(value) || post.body.includes(value)
      );
      this.setState({
        ...this.state,
        postsBySearch: postsBySearch,
        searchWord: e.target.value,
      });
    },
  });
  const postsContainer = new PostsContainer({
    $app,
    initialState: { posts: this.state.posts },
  });
  const loader = new Loader({
    $app,
    initialState: { loading: this.state.loading },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    //   업데이트 되는 컴포넌트만 셋스테이트 해주자.
    filter.setState({ searchWord: this.state.searchWord });
    postsContainer.setState({
      posts: this.state.posts,
      postsBySearch: this.state.postsBySearch,
      searchWord: this.state.searchWord,
    });
    loader.setState({ loading: this.state.loading });
  };
  this.init = async () => {
    window.onload = () => {
      const observationOption = {
        root: null,
        rootMargin: "0px",
        threshold: 0.9,
      };
      const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            try {
              this.setState({ ...this.state, loading: true });
              const posts = await getPostsByPageId(this.state.pageID);
              this.setState({
                ...this.state,
                pageID: this.state.pageID + 1,
                posts: [...this.state.posts, ...posts],
                loading: false,
              });
            } catch (e) {
              console.log("ㄱㅔ시물을 불러오는데 에러 발생하였스.");
            }
          }
        });
      }, observationOption);

      const target = document.querySelector(".loader");
      io.observe(target);
    };
  };
  this.init();
}

export default App;
