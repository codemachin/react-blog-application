import React, { Component } from 'react';
import { getSingleBlog, deleteBlog } from '../services/blogService'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class Single extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title:'',
            category:'',
            blogBody:'',
            description:''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.getBlogData(this.props.match.params.id)
    }

    getBlogData(currentBlogId){
        getSingleBlog(currentBlogId).then((result) => {
            console.log(result)
            if(!result.data.error){
                let data = result.data.data
                this.setState({
                    title: data.title,
                    category: data.category,
                    bodyHtml: data.bodyHtml,
                    description: data.description
                })

            }else{
                toastr.error('Some error occurred')
            }
        })
    }

    deleteBlog(){
        deleteBlog(this.props.match.params.id).then((result) => {
            console.log(result)
            if(!result.data.error){
                toastr.success(`Blog deleted successfully.`)
                this.props.history.push('/')
            }else{
                toastr.error(`Some error occurred.`)
            }
        })
    }

    render(){
        return (
            <div className="jumbotron p-4 p-md-5 text-black rounded bg-white" style={{ marginTop:"20px",border:"solid 1px lightgrey" }}>
                <div className="col-md-12 px-0 text-center">
                    <h1>{this.state.title}</h1>
                    <h5>{this.state.category}</h5>
                    <br></br>
                    <h3 dangerouslySetInnerHTML={{ __html: this.state.bodyHtml}}></h3>
                    <h4>{this.state.description}</h4>
                </div>
                <div className="text-center mt-5">
                    <button type="button" onClick={this.deleteBlog} className="btn btn-outline-secondary mr-5">Delete</button>
                    <button type="button" onClick={() => this.props.history.push('/edit/' + this.props.match.params.id)} className="btn btn-outline-secondary mr-5">Edit</button>
                    <button type="button" onClick={this.props.history.goBack} className="btn btn-outline-secondary">Go back</button>
                </div>
            </div>
            
    
        )
    }
    
}

export default Single