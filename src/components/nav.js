import React,{Component} from 'react';

class Nav extends Component {
    setCategory(value){
        this.props.categoryData(value)
    }
    render(){
        return (
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">
                    {
                        this.props.categories.map((value,i)=>{
                            if(value==''){
                                return <a style={{ cursor: 'pointer' }} key={i} className="p-2 text-muted" onClick={() => this.setCategory('')}>All</a>
                            }
                            return <a style={{cursor:'pointer'}} key={i} className="p-2 text-muted" onClick={()=> this.setCategory(value)}>{value}</a>
                        })
                    }
                </nav>
            </div>
    
        )
    }
}

export default Nav