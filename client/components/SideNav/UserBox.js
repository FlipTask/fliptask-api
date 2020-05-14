import React,{Component} from "react";
import UserOptions from "./UserOptions";

class UserBox extends Component{
    state = {
        openList: false
    }
    t = null;
    onClick = (e) => {
        this.t = null;
        this.setState({
            openList: !this.state.openList
        });
    }
    onBlur = (e) => {
        e.preventDefault();
        clearTimeout(this.t);
        this.t = setTimeout(() => {
            this.setState({
                openList: false
            });  
            clearTimeout(this.t);
        },100);
    }
    render(){
        return(
            <div tabIndex="0" className="user-box" onClick={this.onClick} onBlur={this.onBlur}>
                <div className={`user-box--wrapper ${this.state.openList ? "active" : ""}`}>
                    <div className="user-box--img">
                        <img src="/assets/avatars/64px/1.png" alt="1.png"/>
                    </div>
                    <div className="user-box--info">
                        <span className="user-box--name text-white">Ashish Kumar</span>
                        <span className="user-box--status text-light">
                            <i className="fa fa-moon"></i>
                            Away
                        </span>
                    </div>
                    <div className="user-box--dropdown">
                        <i className="fas fa-chevron-down"></i>
                    </div>
                    {
                        this.state.openList ?
                        <UserOptions/>
                        :
                        ""
                    }
                </div>
            </div>
        );
    }
}

export default UserBox;