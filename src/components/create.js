import React,{Component} from 'react';
import {createBlog} from '../services/blogService'
import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

class Create extends Component{

    constructor(props){
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOnChange = this.handleOnChange.bind(this)
        this.state={
            title:'',
            description:'',
            blogBody: '',
            category: '',
            titleValid:true,
            descValid:true,
            bodyValid:true,
            catValid:true
        }
    }

    handleSubmit(event){
        event.preventDefault()

        let data = {
            title: this.state.title,
            description: this.state.description,
            blogBody: this.state.blogBody,
            category: this.state.category
        }

        createBlog(data).then((result) => {
            if(!result.data.error){
                toastr.success(`Blog posted successfully.`)
                console.log(result)
                this.props.history.push('/view/' + result.data.data.blogId)
            }else{
                toastr.error(`Some error occurred.`)
                console.log(result)
            }

        })

    }

    handleOnChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
        if (event.target.name == 'title'){
            if (event.target.value==''){
                this.setState({
                    titleValid : false
                })
            }else{
                this.setState({
                    titleValid: true
                })
            }
        }
        if (event.target.name == 'description'){
            if (event.target.value == ''){
                this.setState({
                    descValid: false
                })
            }else{
                this.setState({
                    descValid: true
                })
            }
        }
        if (event.target.name == 'category'){
            if (event.target.value == ''){
                this.setState({
                    catValid: false
                })
            }else{
                this.setState({
                    catValid: true
                })
            }
        }
        if (event.target.name == 'blogBody'){
            if (event.target.value == ''){
                this.setState({
                    bodyValid: false
                })
            }else{
                this.setState({
                    bodyValid: true
                })
            }
        }
    }

    render(){

        return (
            <div className="jumbotron p-4 p-md-5 text-black rounded bg-light" style={{ marginTop: "20px" }}>
                <div className="col-md-12 px-0">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input onChange={this.handleOnChange} type="text" name='title' className="form-control" id="title" aria-describedby="emailHelp" placeholder="Enter title" />
                            {
                                !this.state.titleValid?<small id="emailHelp" className="form-text text-danger">This field is required.</small>:''
                            }
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleOnChange} type="text" name='description' className="form-control" id="desc" placeholder="Enter description" />
                            {
                                !this.state.descValid ? <small id="emailHelp" className="form-text text-danger">This field is required.</small> : ''
                            }
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleOnChange} type="text" name='blogBody' className="form-control" id="blogBody" placeholder="Enter blog body" />
                            {
                                !this.state.bodyValid ? <small id="emailHelp" className="form-text text-danger">This field is required.</small> : ''
                            }
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleOnChange} type="text" name='category' className="form-control" id="category" placeholder="Enter category" />
                            {
                                !this.state.catValid ? <small id="emailHelp" className="form-text text-danger">This field is required.</small> : ''
                            }
                        </div>
                        <button type="submit" disabled={!this.state.category || !this.state.description || !this.state.title || !this.state.blogBody} className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )

    }
}

export default Create