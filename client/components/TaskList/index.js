import React,{Component} from "react";
import NewTaskButton from "./../Task/NewTaskButton";
import Task from "./../Task";
import TaskCardPlaceHolder from "./../Task/TaskCardPlaceHolder";

class TaskList extends Component{
    onMouseUp = (e) => {
        this.props.dropableList.onMouseUp(e,(instance) => {
            this.props.swapTaskList(this.props.workspace._id,{
                index: instance.targetIndex,
                id: instance.sourceElement.getAttribute("list_id")
            });
        });  
    }
    render(){
        const {
            data = {},
            mouseEvents,
            dropableTasks,
            dropableList,
            index
        } = this.props;
        return (
            <React.Fragment>
                <div className="drop-list dragable-list task-list--wrapper" 
                    list_id={data._id}
                    onMouseDown={(e) => dropableList.onMouseDown(e)}
                    onMouseLeave={(e) => dropableList.onMouseLeave(e)}
                    onMouseUp={(e) => this.onMouseUp(e)}
                    index={index}
                >
                    <div className="task-list">
                    <div className="task-list--header">
                        <p className="task-list--title ellipsis">{data.title}</p>
                        <span className="task-list--options-btn"><i className="fas fa-ellipsis-v text-light"></i></span>
                    </div>
                            <div className="task-list--body">
                                {
                                    data.tasks && data.tasks.length === 0 ?
                                    <TaskCardPlaceHolder />
                                    :
                                    data.tasks && data.tasks.map((task,i) => {
                                        return <Task 
                                                dropableTasks={dropableTasks} 
                                                listId={data._id} 
                                                mouseEvents={mouseEvents} 
                                                index={i} 
                                                key={i} 
                                                task={task}
                                            />
                                    })
                                }
                            </div>
                        <div className="task-list--footer">
                            <NewTaskButton listId={data._id}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>

        )
    }
}

export default TaskList;