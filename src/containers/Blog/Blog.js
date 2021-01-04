import React, { Component } from 'react';
import Posts from '../Blog/Posts/Posts';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
import { Route, NavLink, Switch } from 'react-router-dom';
import './Blog.css';


const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

class Blog extends Component {
    state = {
        auth: true //it is used for redirect guard
    }

    render() {
        return (
            <div>
                <header className='Blog'>
                    <ul>
                        <li><NavLink to="/posts/" exact
                            activeClassName='my-active'
                            activeStyle={{
                                color: '#fa923f',
                                textDecoration: 'underline'
                            }}>Posts</NavLink></li>
                        <li><NavLink to={{
                            //pathname=this.props.match.url+'/new-posts' 
                            //this is relative path
                            pathname: '/new-post',   //this is absolute path
                            hash: '#submit',
                            search: '?quick-submit=true'
                        }}>New Posts</NavLink></li>
                    </ul>
                </header>
                <Switch>
                    {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null}{/* This is redirect guard*/}
                    <Route path="/posts" component={Posts} />
                    {/* <Redirect from='/' to="/posts/" /> */}
                    <Route render={() => <h1>Page not found....!</h1>} />
                    {/* OR */}
                    {/* <Route path="*" render={() => <h1>Not Found</h1>} /> */}
                </Switch>
            </div>
        );
    }
}

export default Blog;