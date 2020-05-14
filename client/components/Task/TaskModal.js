import React,{Component} from "react";
import loadable from '@loadable/component';
import {connect} from "react-redux";
import Drawer from "../Drawer";
import Input from "../Input";
import {
    createNewTask,
    updateTask,
    uploadTaskDescriptionImages
} from "../../actions";
import DropDown from "./../DropDown";
import {priority} from "./../../constants/PriorityMap";
import Comment from "./../Comment";
const InputEditor = loadable(() => import(
    /* webpackChunkName: "InputEditor" */ './../Input/InputEditor'
));
const ImageUpload = loadable(() => import(
   /* webpackChunkName: "ImageUpload" */ "./../ImageUpload" 
));

class TaskModal extends Component{
    constructor(props){
        super(props);
        const { listId, task } = props;
        this.state = {
            loader: false,
            images: [],
            disableModalActions: false,
            edit: (task && task._id) ? false : true,
            task: task || {
                task_list: listId,
                title: "",
                description: "",
                due_date: "",
                priority: "",
                desc_images: [],
            }
        }
    }
    
    toggleModal = () => {
        this.setState({
           openModal: !this.state.openModal 
        });
    }
    
    getOnlyChangedValues = () => {
        const taskKeys = Object.keys(this.props.task);
        return taskKeys.reduce((acc,key) => {
            if(this.state.task[key] != this.props.task[key]){
                acc[key] = this.state.task[key];
            }
            if(key == "task_list" || key == "_id"){
                acc[key] = this.state.task[key];
            }
            return acc;
        },{});
    }
    handleOnChange = (e,option) => {
        const name = e.target.name;
        const value = e.target.value;
        const obj = {
            ...this.state.task
        };
        obj[name] = value;
        this.setState({
            ...this.state,
            task: obj
        });
    };
    createNewTask = async() =>{
        this.setState({
            disableModalActions: true,
            loader: true,
        });
        if(!this.state.task._id){ //CREATE NEW
            const res = await this.props.createNewTask({
                ...this.state.task,
            });
            // console.log(res.data.task_id);
            if(this.state.images.length > 0 && !res.error){
                await this.props.uploadTaskDescriptionImages(
                    this.state.images,
                    res.data._id
                );
            } 
        }else{ // EDIT
            if(this.state.images.length > 0){
                await this.props.uploadTaskDescriptionImages(
                    this.state.images,
                    this.state.task._id
                );
            }
            this.props.updateTask({
                ...this.getOnlyChangedValues(),
            });
        }
        this.setState({
            disableModalActions: false,
            loader: false,
            edit: false,
        },() => {
            // this.props.toggleModal(); 
        });
    }
    toggleEditMode = () => {
        this.setState({
            edit: !this.state.edit
        });
    }
    updateImages = (files = []) => {
        this.setState({
            images: files
        });
    }
    render(){
        if(!this.props.open){
            return null;
        }
        const HeaderComponent = () => {
            return (
                <React.Fragment>
                    <p className="ellipsis">
                        {this.state.task.title || this.props.title}
                    </p>
                    {
                        !this.state.edit?
                        <button onClick={this.toggleEditMode} className="btn sm bg-primary text-white rounded">
                            <i className="fas fa-pencil-alt"></i> Edit Task</button>
                        :
                        <button onClick={this.toggleEditMode} className="btn sm bg-warning text-white rounded">Cancel</button>
                    }
                    
                </React.Fragment>
            )
        }
        
        const FooterComponent = () => {
            return (
                <React.Fragment>
                    <button 
                        className={`btn text-white bg-primary ${!this.state.edit ? "disabled" : ""}`} 
                        onClick={this.createNewTask}
                    >
                        {!this.state.task._id ? "Save" : "Update"}
                    </button>
                </React.Fragment>
            )
        }
        const dueDate = new Date(this.state.task.due_date);
        const date = this.state.task.due_date ? `${dueDate.getFullYear()}-${dueDate.getMonth()+1 < 10 ? "0" : ""}${dueDate.getMonth()+1}-${dueDate.getDate() < 10 ? "0" : ""}${dueDate.getDate()}` : "";
        return(
            <React.Fragment>
                    <Drawer
                        loader={this.state.loader}
                        FooterComponent={FooterComponent}
                        HeaderComponent={this.state.task._id ? HeaderComponent : null}
                        open={this.props.open}
                        disableActions={this.state.disableModalActions}
                        onCancel={this.props.toggleModal}
                        onSubmit={this.createNewTask}
                        title={this.props.title}
                    >
                        <div className="create-new-task--modal modal-form">
                            <div className="task-details">
                                <Input
                                    readOnly={!this.state.edit}
                                    label="Title"
                                    type="Input"
                                    className={`bordered-on-focus form-input ${!this.state.edit ? "readOnly" : "border"}`}
                                    placeholder="Title" 
                                    name="title" 
                                    value={this.state.task.title} 
                                    onChange={this.handleOnChange}
                                />
                                
                                <InputEditor
                                    readOnly={!this.state.edit}
                                    label="Description"
                                    value={this.state.task.description}
                                    onChange={this.handleOnChange}
                                    name="description"
                                    placeholder="Description"
                                />
                                <ImageUpload
                                    name="desc_images"
                                    readOnly={!this.state.edit}
                                    onChange={this.updateImages}
                                    files={this.state.task.desc_images}
                                />
                                {/* <Comment/> */}
                            </div>
                            <div className="task-meta-info">
                                <div className="task-meta-block">
                                    <DropDown
                                        readOnly={!this.state.edit}
                                        label="Priority"
                                        placeholder="Task Priority" 
                                        options={priority} 
                                        name="priority"
                                        onSelect={this.handleOnChange}
                                        selected={this.state.task.priority}
                                        className={`bordered-on-focus form-input ${!this.state.edit ? "readOnly" : "border"}`}
                                    />
                                </div>
                                <div className="task-meta-block">
                                    <Input 
                                        readOnly={!this.state.edit}
                                        label="Due Date"
                                        type="date"
                                        className={`bordered-on-focus form-input ${!this.state.edit ? "readOnly" : "border"}`}
                                        placeholder="Due Date"
                                        name="due_date" 
                                        value={date} 
                                        onChange={this.handleOnChange}
                                        pattern="\d{4}-\d{2}-\d{2}"
                                    />
                                </div>
                            </div>
                        </div>
                    </Drawer>
            </React.Fragment>

        )
    }
}

const mapStateToProps = () => ({
    
});

export default connect(mapStateToProps,{
    createNewTask,
    updateTask,
    uploadTaskDescriptionImages
})(TaskModal);