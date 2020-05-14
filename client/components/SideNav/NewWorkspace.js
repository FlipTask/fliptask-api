import React,{Component} from "react";
import {connect} from "react-redux";
import Input from "./../Input";

import {
    createNewBoard    
} from "./../../actions";

class NewWorkspace extends Component{
    state = {
        addBoard: false,
        title: ""
    }
    handleChange = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    toggleAddBoard = () => {
        this.setState({
            title: "",
            addBoard: !this.state.addBoard
        })
    }
    createBoard = async() => {
        if(this.state.title && this.state.title.length > 3){
           await this.props.createNewBoard(this.state.title);
           this.toggleAddBoard();
        }
    }
    render(){
        return(
            <div className="new-workspace">
                {
                    this.state.addBoard
                    ?
                    <React.Fragment>
                        <Input
                            type="text"
                            placeholder="New Workspace Name"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            className="rounded shadowed"
                        />
                        <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "0.4em"
                        }}>
                            <button 
                                onClick={this.toggleAddBoard}
                                style={{width:"45%"}}
                                type="button" 
                                className="btn sm text-white bg-warning  rounded shadowed"
                            >
                                Cancel
                            </button>
                            
                            <button 
                                onClick={this.createBoard}
                                style={{width:"45%"}}
                                type="button" 
                                className="btn sm text-white bg-success rounded shadowed"
                            >
                                Create
                            </button>
                        </div>
                    </React.Fragment>
                    :
                    
                    <button type="button" className="btn text-light bg-transparent" onClick={this.toggleAddBoard}>
                        <i className="fas fa-plus"></i>
                        Add Workspace
                    </button>
                }


            </div>
        )
    }
}

const mapStateToProps = ({}) => ({
    
});

export default connect(mapStateToProps,{
    createNewBoard
})(NewWorkspace);