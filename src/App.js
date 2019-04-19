import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch ,Link} from 'react-router-dom';
import './App.css';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './components/home'
import Single from './components/single'
import Create from './components/create'
import edit from './components/edit'
import SearchBox from './components/searchBox'

import {createStore} from 'redux'

const reducer = (state, action) => {
  console.log(state, action)
  switch (action.type){
    case 'ADD':
      state = state + action.payload;
      break;
  }
  return state
}

const store = createStore(reducer, 1)

store.subscribe(()=>{
  console.log('store updated!', store.getState())
})
store.dispatch({
  type: 'ADD',
  payload: 10
})


class App extends Component {

  constructor(props){
    super(props)
    this.setSearch = this.setSearch.bind(this)
    this.child = React.createRef();
  }

  setSearch(e){
    if(this.child.current){
      this.child.current.setSearchText(e.target.value);
    }
  }

  render() {
    
    return (
        <div className="container">
        <Router>
          <header className="blog-header py-3">
            <div className="row flex-nowrap justify-content-between align-items-center">
              <div className="col-4 pt-1">
                <a className="text-muted" href="#">Subscribe</a>
              </div>
              <div className="col-4 text-center head-title">
                <Link className="blog-header-logo text-dark" to={'/'}>Random Blogs</Link>
              </div>
              <div className="col-4 d-flex justify-content-end align-items-center">
                <SearchBox setSearch={this.setSearch} />
                <Link className="btn btn-sm btn-outline-secondary" to={'/create'} style={{whiteSpace:'nowrap'}}>Add new Blog</Link>             
              </div>
            </div>
          </header>

          
            <Switch>
            <Route exact path="/" component={() => (<Home ref={this.child} />)}/>
              <Route path="/view/:id" component={Single} />
              <Route path="/create" component={Create} />
              <Route path="/edit/:id" component={edit} />
              <Redirect from='*' to='/' />
            </Switch>
          </Router>
                  
        </div>
    );
  }
}



export default App;
