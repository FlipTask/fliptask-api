import React,{ Component } from "react";

class ModalWrapper extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    onCancel = () => {
        this.props.onCancel();
    }
    onSubmit = () => {
        this.props.onSubmit();
    }
    render(){
        const { title, disableActions } = this.props;
        return (
                <div className="modal">
                    <div className="modal--header">
                        <p>
                            {title}
                        </p>
                    </div>
                    <div className="modal--body">
                        {
                            this.props.children
                        }
                    </div>
                    <div className="modal--footer">
                        <button className={`btn bg-warning text-white ${disableActions ? "disabled" : ""}`} onClick={this.onCancel}>Cancel</button>
                        <button className={`btn text-white bg-primary ${disableActions ? "disabled" : ""}`} onClick={this.onSubmit}>Submit</button>
                    </div>
                </div>
        )
    }
}
export default ModalWrapper;