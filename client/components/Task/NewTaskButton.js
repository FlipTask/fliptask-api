import React,{Component} from "react";
import TaskModal from "./TaskModal";

class NewTaskButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            openModal: false
        }
    }

    toggleModal = () => {
        this.setState({
           openModal: !this.state.openModal 
        });
    }
    render(){
        const {listId} = this.props;
        return (
            <React.Fragment>
                {
                    this.state.openModal
                    ?
                    <TaskModal 
                        toggleModal={this.toggleModal} 
                        listId={listId} 
                        open={this.state.openModal} 
                        title={"Create New Task"}
                    />   
                    :
                    ""
                }
                <button type="button" className="btn text-primary shadowed rounded" onClick={this.toggleModal}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    Add New Task
                </button>
            </React.Fragment>
        )
    }
}


export default NewTaskButton;