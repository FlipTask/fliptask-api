import React,{Component} from "react";
import { createPortal } from "react-dom";
import DrawerWrapper from "./DrawerWrapper";
import Animation from "./../Animation";
const modalRoot = document.getElementById("root-modal");

class Drawer extends Component{
    constructor(props){
        super(props);
        this.element = document.createElement("div");
        this.element.classList.add("drawer--wrapper");
        // this.element.classList.add("hide");
    }
    componentDidMount() {
        modalRoot.appendChild(this.element);
        // this.element.classList.remove("hide");
        // this.element.classList.add("drawer-slide-in");
    }
    componentWillUnmount() {
        
        // this.element.classList.add("drawer-slide-out");
        // this.element.classList.remove("drawer-slide-in");
        // clearTimeout(this.delay);
        // this.delay = setTimeout(() => {
            modalRoot.removeChild( this.element );
        //     clearTimeout(this.delay);
        // },500);
    }
    render(){
        return createPortal( 
            <DrawerWrapper {...this.props}/>
        , this.element )
    }
}

export default Drawer;
