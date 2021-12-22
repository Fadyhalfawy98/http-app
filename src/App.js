import React, { Component } from "react";
import http from "./services/httpServices"
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import config from "./config.json"



class App extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await http.get(config.path);
    this.setState({ posts });
  }

  render() {
    const {posts} = this.state;

    return (
        <React.Fragment>
          <ToastContainer />
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
    const { data: post } = await http.post(config.path, object);
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
    // await Axios.put(config.path + "/" + post.id, post);
    await http.patch(config.path + "/" + post.id);

  };

  handleDelete = async post => {
    const { posts } = this.state;
    const originalPosts = posts;
    const postsFiltered = posts.filter(p => p.id !== post.id);
    this.setState({ posts: postsFiltered });
    try { await http.delete("s" + config.path + "/" + post.id); }
    catch (e) {
      if (e.response && e.response.status === 404)
        alert("This post has already been deleted!");

      this.setState({ posts: originalPosts});
    }
  };
}

export default App;

