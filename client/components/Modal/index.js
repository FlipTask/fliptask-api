import React,{Component} from "react";
import { createPortal } from "react-dom";
import ModalWrapper from "./ModalWrapper";

const modalRoot = document.getElementById("root-modal");
class Modal extends Component{
    constructor(props){
        super(props);
        this.element = document.createElement("div");
        this.element.classList.add("modal--wrapper");
    }
    componentDidMount() {
        modalRoot.appendChild( this.element );
    }
    componentWillUnmount() {
        modalRoot.removeChild( this.element );
    }
    render(){
        return createPortal( <ModalWrapper {...this.props}/>, this.element )
    }
}

export default Modal;
