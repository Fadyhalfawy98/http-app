import Axios from "axios"
import React, { Component } from "react";
const PATH = "https://jsonplaceholder.typicode.com/posts";

//UnExpected Error Function
Axios.interceptors.response.use(null, error => {
  const expectedError = error.response
      && error.response.status >= 400
      && error.response.status < 500;

  if (!expectedError){
    console.log("Logging the error.. ", error);
    alert("An unexpected error occurred..");
    return Promise.reject(error);
  }

  return Promise.reject(error);
});
//------------------------------------------------------------------------------------

class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await Axios.get(PATH);
    this.setState({ posts });
  }

  render() {
    const {posts} = this.state;

    return (
        <React.Fragment>
          <button className="btn btn-outline-info btn-group-lg"
                  onClick={this.handleAdd}
          >
            Add
          </button>
          <table className="table">
            <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            <tr>

            </tr>
            {posts.map(post => (
                <tr key={post.id}>
                  <td>{post.title}</td>
                  <td>
                    <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => this.handleUpdate(post)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => this.handleDelete(post)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </React.Fragment>
    );
  }

  handleAdd = async () => {
    const { posts } = this.state;
    const object =  {title: "new post", body: "np"};
    const { data: post } = await Axios.post(PATH, object);
    const postsArray = [post, ...posts]
    this.setState({ posts: postsArray});

  };

  handleUpdate = async post => {
    const { posts } = this.state;
    post.title = "Update Completed!";
    const postsArray = [...posts];
    const index = postsArray.indexOf(post);
    postsArray[index] = { ...post };
    this.setState({posts: postsArray});
    // await Axios.put(PATH + "/" + post.id, post);
    await Axios.patch(PATH + "/" + post.id);

  };

  handleDelete = async post => {
    const { posts } = this.state;
    const originalPosts = posts;
    const postsFiltered = posts.filter(p => p.id !== post.id);
    this.setState({ posts: postsFiltered });
    try { await Axios.delete(PATH + "/" + post.id); }
    catch (e) {
      if (e.response && e.response.status === 404)
        alert("This post has already been deleted!");

      this.setState({ posts: originalPosts});
    }
  };
}

export default App;

