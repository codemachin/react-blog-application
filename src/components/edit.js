import React, { Component } from 'react';
import { getSingleBlog, editBlog } from '../services/blogService'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class edit extends Component {

    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.state = {
            title: '',
            description: '',
            blogBody: '',
            category: ''
        }
    }

    componentDidMount() {
        console.log(this.props.match.params.id)
        this.getBlogData(this.props.match.params.id)
    }

    getBlogData(currentBlogId) {
        getSingleBlog(currentBlogId).then((result) => {
            console.log(result)
            if (!result.data.error) {
                let data = result.data.data
                this.setState({
                    title: data.title,
                    category: data.category,
                    blogBody: data.bodyHtml,
                    description: data.description
                })

            } else {
                toastr.error('Some error occurred')
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault()

        let data = {
            title: this.state.title,
            description: this.state.description,
            blogBody: this.state.blogBody,
            category: this.state.category
        }

        editBlog(this.props.match.params.id,data).then((result) => {
            if (!result.data.error) {
                toastr.success(`Blog edited successfully.`)
                console.log(result)
                this.props.history.push('/view/' + this.props.match.params.id)
            } else {
                toastr.error(`Some error occurred.`)
                console.log(result)
            }

        })

    }

    handleOnChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <div className="jumbotron p-4 p-md-5 text-black rounded bg-light" style={{ marginTop: "20px" }}>
                <div className="col-md-12 px-0">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input onChange={this.handleOnChange} value={this.state.title} type="text" name='title' className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title" />
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleOnChange} value={this.state.description} type="text" name='description' className="form-control" id="desc" placeholder="Enter description" />
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleOnChange} value={this.state.blogBody} type="text" name='blogBody' className="form-control" id="blogBody" placeholder="Enter blog body" />
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleOnChange} value={this.state.category} type="text" name='category' className="form-control" id="category" placeholder="Enter category" />
                        </div>
                        <button type="submit" disabled={!this.state.category || !this.state.description || !this.state.title || !this.state.blogBody} className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }

}

export default edit