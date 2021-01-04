import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

import { Route, Link } from 'react-router-dom';

import './Posts.css';

class Posts extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts').then(
            response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({ posts: updatedPosts });
                console.log('Data fetched');
            }
        ).catch(erro => {
            console.log(erro);
            // this.setState({ error: true });
        })
    }

    postSelectedHandler = (id) => {
        this.props.history.push('/posts/' + id);
        // console.log(this.props)
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong...!</p>
        if (!this.state.error) {
            posts = this.state.posts.map(
                post => {
                    return (
                        // <Link to={'/posts/' + post.id} key={post.id}>
                            <Post
                                title={post.title}
                                author={post.author}
                                clicked={() => this.postSelectedHandler(post.id)} />
                        // </Link>
                    );

                }
            )
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path="/posts/:id" exact component={FullPost} />
            </div>

        );
    }
}

export default Posts;