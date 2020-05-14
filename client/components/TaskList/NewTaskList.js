import React,{Component} from "react";
import Input from "./../Input/index";
import {connect} from "react-redux";
import {
    createNewTaskList
} from "./../../actions";
class NewTaskList extends Component{
    constructor(props){
        super(props);
        this.state = {
            isFormOpen: false,
            task_list: {
                title: ""
            }
        }
        this.element = null;
    }
    componentDidMount(){
        this.element = document.getElementById("new-task-list-placeholder");
    }
    resetState(){
        this.setState({
            isFormOpen: false,
            task_list: {
                title: ""
            }
        });
    }
    handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const obj = {
            ...this.state.task_list
        };
        obj[name] = value;
        this.setState({
            ...this.state,
            task_list: obj
        });
    };
    createTaskList = async(e) => {
        console.log("this.props.boardId",this.props.boardId);
        const board = this.props.boardId;
        if(this.state.task_list.title.length > 0){
            await this.props.createNewTaskList({
                ...this.state.task_list,
                board
            });
            this.toggleForm();
            // this.resetState();
            this.element && this.element.scrollIntoView({
                behavior: "smooth", 
                block: "end", 
                inline: "nearest"
            });
        }
    }
    toggleForm = () => {
        this.setState({
            isFormOpen: !this.state.isFormOpen,
            task_list:{
                title: ""
            }
        });
    }
    render(){
        return(
            <div className="task-list--wrapper">
            <div className="task-list" id="new-task-list-placeholder">
                {
                    !this.state.isFormOpen 
                    ?
                    <button 
                        type="button"
                        onClick={this.toggleForm}
                        className="btn md btn-task rounded shadowed" 
                        style={{
                            width: "100%"
                        }}
                    >
                        <i className="fa fa-plus" aria-hidden="true"></i>
                        Create New List
                    </button>   
                    :
                    <div className="create-new-list-form">
                        <Input 
                            className="form-input"
                            placeholder="List Name"
                            type="text"
                            name="title"
                            value={this.state.task_list.title}
                            onChange={this.handleOnChange}
                        />
                        <div>
                            <button 
                                onClick={(e) => this.createTaskList(e, this.props.boardId)} 
                                type="button" 
                                className="btn sm bg-success text-white shadowed rounded">Create</button>
                            <button
                                onClick={this.toggleForm}
                                style={{marginLeft: "1em"}}
                                type="button" 
                                className="btn sm bg-warning text-white shadowed rounded">Cancel</button>
                        </div>
                    </div>
                }
            </div>
            </div>
        )
    }
}

const mapStateToProps = ({boards}) => ({
    boardId: boards.activeBoard._id
});

export default connect(mapStateToProps,{
    createNewTaskList
})(NewTaskList);