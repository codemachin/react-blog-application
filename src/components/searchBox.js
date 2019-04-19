import React, { Component } from 'react';

class SearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: ''
        }
        this.settext = this.settext.bind(this)
    }
    settext(e){
        this.setState({
            category:e.target.value
        })
        this.props.setSearch(e)
    }
    render() {
        return (
            <form className="form-inline ">
                <input style={{minWidth:"145px"}} className="form-control mr-sm-2" name='text' type="search" value={this.state.category} onChange={this.settext.bind(this)} placeholder="Search by Title" aria-label="Search" />
            </form>
        )
    }
}

export default SearchBox