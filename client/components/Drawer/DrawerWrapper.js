import React,{ Component } from "react";
import Animation from "./../Animation";
import Loader from "./../Loader";
class DrawerWrapper extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
        this.heightFactor = 0;
    }
    onCancel = () => {
        this.props.onCancel();
    }
    onSubmit = () => {
        this.props.onSubmit();
    }
    componentDidMount(){
        
    }
    render(){
        const { 
            loader=false,
            title, 
            disableActions,
            open,
            HeaderComponent,
            FooterComponent
        } = this.props;
        return (
            <Animation show={open} mountAnimation="drawer-slide-in" unmountAnimation="drawer-slide-out">
                <div className="drawer">
                    {
                        loader ?
                        <Loader />
                        : ""   
                    }
                    <div className="drawer--header">
                        {
                            HeaderComponent ? 
                            <HeaderComponent />
                            :
                            <p>
                                {title}
                            </p>
                        }
                        <span 
                            className="drawer-cancel-btn text-light"
                            onClick={this.onCancel}
                        >
                            <i className="fas fa-times"></i>
                        </span>
                    </div>
                    <div className="drawer--body"
                    >
                        {
                            this.props.children
                        }
                    </div>
                    <div className="drawer--footer">
                        {
                            FooterComponent ?
                            <FooterComponent />
                            :
                            <button className={`btn text-white bg-primary ${disableActions ? "disabled" : ""}`} onClick={this.onSubmit}>Submit</button>   
                        }
                    </div>
                </div>
            </Animation>
        )
    }
}
export default DrawerWrapper;