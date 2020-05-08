import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
      loadedPost: null
    }

    componentDidUpdate() {
    //   We can't pass in ID if it is null/false
      if (this.props.id) {
        // If we don't have this.state.loadedPost
        // Or if we do have one, but the IDs are different
        // And to prevent infinite loop
        if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
          axios.get('/posts/' + this.props.id)
            .then(response => {
              //   This is creating an infinite loop on click
              this.setState({ loadedPost: response.data});
              console.log('response', response);
            });
        }
      }
    }

    deletePostHandler = () => {
      // Don't need to pass data, as URL already has it from ID
      axios.delete('/posts/1')
        .then(response => {
          console.log('DELETE RES', response);
        });
    }

    render () {
      let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;

      // Post is a p where loading, as we selected post but data isn't there yet
      if (this.props.id) {
        post = <p style={{textAlign: 'center'}}>Loading...</p>;
      }

      // null in the state, is treated as false. So with this, we won't get in the if block
      // if (this.props.id) {
      // Check if state.loadedPost has been set
      if (this.state.loadedPost) {
        post = (
          <div className="FullPost">
            <h1>{this.state.loadedPost.title}</h1>
            <p>{this.state.loadedPost.body}</p>
            <div className="Edit">
              <button onClick={this.deletePostHandler} className="Delete">Delete</button>
            </div>
          </div>
        );
      }
      return post;
    }
}

export default FullPost;