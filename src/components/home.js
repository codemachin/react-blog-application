import React, { Component } from 'react';
import Nav from './nav'
import {getAllBlogs} from '../services/blogService'
import { Link } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
        this.catArray = {
            values : ['','movie', 'comedy', 'action', 'drama','horror', 'thriller', 'sci-fi', 'documentary']
        }
        this.state = {
            data:[],
            category:'',
            searchText:''
        }
    }

    componentDidMount() {
        this.getBlogs()
    }

    setSearchText(text){
        this.setState({
            searchText : text
        })
    }

    getBlogs(){
        getAllBlogs().then((result)=>{
            console.log(result)
            this.setState({
                data:result.data.data
            })
        })
    }

    handleCategory(category){
        this.setState({
            category : category
        })
    }


    render(){
        let filteredValues = this.state.data.filter(element => {
            if (this.state.category==''){
                return true
            }
            return element.category.toString().toLowerCase().includes(this.state.category.toString().toLowerCase())
        })
        filteredValues = filteredValues.filter(element => {
            if (this.state.searchText == '') {
                return true
            }
            return element.title.toString().toLowerCase().includes(this.state.searchText.toString().toLowerCase())
        })
        return (
            <div>
                
                <Nav categories={this.catArray.values} categoryData={this.handleCategory.bind(this)} />
                <div className="jumbotron p-4 p-md-5 text-white rounded bg-dark">
                    <div className="col-md-6 px-0">
                        <h1 className="display-4 font-italic">{this.state.data.length>0 ? this.state.data[0].title: 'title'}</h1>
                        <p className="lead my-3">{this.state.data.length > 0 ? this.state.data[0].description : 'description'}</p>
                        <p className="lead mb-0"><Link to={this.state.data.length > 0 ? '/view/' + this.state.data[0].blogId : ''} className="text-white font-weight-bold">Continue reading...</Link></p>
                    </div>
                </div>
                
                <div className="row mb-2">
                    {
                        filteredValues.map((blog,i) => {
                            return  (
                                <div key={i} className="col-md-6">
                                    <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                                        <div className="col p-4 d-flex flex-column position-static">
                                            <strong className="d-inline-block mb-2 text-primary">{blog.category}</strong>
                                            <h3 className="mb-0">{blog.title}</h3>
                                            <div className="mb-1 text-muted">Nov 12</div>
                                            <p className="card-text mb-auto">{blog.description}</p>
                                      
                                            <Link to={'/view/'+ blog.blogId} className="stretched-link">Continue reading</Link>
                                    
                                        </div>
                                        <div className="col-auto d-none d-lg-block">
                                            <div style={{ width: "200", height: "250", background: "#55595c", color: "#eceeef" }}></div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                

            </div>
        );
    }
}

export default Home