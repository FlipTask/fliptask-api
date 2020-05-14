import React,{Component} from "react";

class BoardHeader extends Component{
    render(){
        const {board} = this.props;
        return(
            <div className="header">
                <h2>{board.title}</h2>
            </div>
        )
    }
}
export default BoardHeader;