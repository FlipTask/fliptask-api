import React,{ Component } from "react";
import {connect} from "react-redux";
import {changeActiveBoard, swapTaskCard,swapTaskList} from "../../actions";
import TaskList from "../../components/TaskList";
import NewTaskList from "../../components/TaskList/NewTaskList";
import DropableList from "./DropableList";
import BoardHeader from "../../components/Header/BoardHeader";
import {withRouter} from "react-router"

class WorkBoard extends Component{
    constructor(props){
        super(props);
        this.state = {
            workspaceId: props.match.params.workspaceId
        }
        this.dropableTasks = new DropableList({
            expandType: "vertical",
            placeholder: {
                className: "task-card task-card-placeholder"
            },
            source: {
                item: {
                    className: "dragable",
                    activeClassName: "active-task-card-item"
                }
            },
            target: {
                container: {
                    className: "task-list--wrapper"
                }
            }
        });
        this.dropableList = new DropableList({
            expandType: "horizontal",
            placeholder: {
                className: "task-list--wrapper"
            },
            source: {
                item: {
                    className: "dragable-list"
                }
            },
            target: {
                container: {
                    className: "dropable-list"
                }
            }
        });
    }
    static getDerivedStateFromProps(props,state){
        if(props.match && props.match.params.workspaceId && (props.match.params.workspaceId != state.workspaceId)){
            props.changeActiveBoard(props.match.params.workspaceId)
            return {
                ...state,
                workspaceId: props.match.params.workspaceId
            }
        }
        return null;
    }
    componentDidMount = () => {
        const {match} = this.props;
        if(match && match.params.workspaceId){
            this.props.changeActiveBoard(match.params.workspaceId);
        }
    }
    onMouseMove = (e) => {
        this.dropableTasks.onMouseMove(e);
    }
    onMouseUp = (e) => {
        this.dropableTasks.onMouseUp(e, (ins) => {
            this.props.swapTaskCard({
                to: {
                    list_id: ins.currentTargetList.getAttribute("list_id"),
                    index: ins.targetIndex
                },
                from : {
                    list_id: ins.sourceElement.getAttribute("list_id"),
                    task_id: ins.sourceElement.getAttribute("id")
                }
            })
        });
    }
    onMouseLeave = (e) => {
        this.dropableTasks.onMouseLeave(e)
    }
    onMouseEnter = (e,loc) => {
        this.dropableTasks.onMouseEnter(e);
    }
    
    onMouseDown = (ev,loc,task) => {
        this.dropableTasks.onMouseDown(ev);
    }
    render(){
        const {
            workspace
        } = this.props;
        return (
            
            <React.Fragment>
                <BoardHeader board={workspace}/>
                <div className="container-fluid dropable-list" 
                    onMouseMove={(e) => {
                        this.onMouseMove(e);
                        this.dropableList.onMouseMove(e);
                    }} 
                >
                    {
                        workspace.task_list.map((t,i) => {
                            return (
                                <TaskList
                                    workspace={workspace}
                                    index={i}
                                    data={t} 
                                    key={i}
                                    swapTaskList={this.props.swapTaskList}
                                    dropableList={this.dropableList}
                                    dropableTasks={this.dropableTasks}
                                    mouseEvents={{
                                        onMouseMove: this.onMouseMove,
                                        onMouseDown: this.onMouseDown,
                                        onMouseEnter: this.onMouseEnter,
                                        onMouseLeave: this.onMouseLeave,
                                        onMouseOver: this.onMouseOver,
                                        onMouseUp: this.onMouseUp
                                    }}
                                />
                            )
                        })
                    }
                    <NewTaskList />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({boards}) => ({
    workspace: boards.activeBoard
});

export default withRouter(connect(mapStateToProps,{
    changeActiveBoard,
    swapTaskCard,
    swapTaskList
})(WorkBoard));