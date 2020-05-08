import React, { Component } from 'react';
import axios from 'axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

  state = {
    posts: [],
    selectedPostID: null,  //null is false
    error: false
  }

  componentDidMount() {
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0,4);

        // map creates new array
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          };
        });
        // this.setState({ posts: response.data });
        this.setState({ posts: updatedPosts });
        console.log(this.state.posts);
      })
      .catch(error => {
        this.setState({ error: true });
        console.log('ERROR', error);
      });
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostID: id});
  }

  render () {
    let posts = <p style={{textAlign: 'center'}, {color: 'red'}}>Something went wrong! Error 404!</p>;

    // override varriable if there is no error
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return <Post
          title={post.title}
          key={post.id}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        />;
      });
    }

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost id={this.state.selectedPostID}/>
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;