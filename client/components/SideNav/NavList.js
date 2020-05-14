import React,{Component} from "react";
import {NavLink} from "react-router-dom";
import Animation from "./../Animation";

class NavListItem extends Component{
    render(){
        const {listItem, active, urlPrefix} = this.props;
        return (
            <NavLink
                title={listItem.title || listItem.name}
                to={`${urlPrefix}/${listItem._id}`}
                activeClassName="active-workspace"
                className={`nav-list-item text-white`}
            >
                <span className="nav-list-item--lastactive">
                    <i className={`fas fa-circle ${active ? "text-success" : ""}`}></i>
                </span>
                <span className="nav-list-item--name ellipsis">{listItem.title || listItem.name}</span>
            </NavLink>
        )
    }
}
class NavList extends Component{
    constructor(props){
        super(props);
        this.state = {
            accordian: props.accordian || false,
            open: (props.accordian === true || props.accordian == "true") ? (props.open || false) : true,
        }
    }
    toggleOpen = (e) => {
        this.setState({
            open: !this.state.open
        });
    }
    render(){
        const {
            title,
            list,
            urlPrefix,
            activeItem,
            AddListItem
        } = this.props;
        const {accordian,open} = this.state;
        return (
            <div className="nav-list">
                <div className="nav-list-heading text-light" onClick={(e) => {
                    if(accordian){
                        this.toggleOpen(e);
                    }else{
                        return false;
                    }
                }}>{title}</div>
                <Animation show={open} mountAnimation="slideDownOpen" unmountAnimation="slideUpClose">
                    <div className={`nav--list`}>
                        <div className="nav-list--wrapper">
                            
                            {
                                list.map((listItem,i) => {
                                    return <NavListItem
                                                active={listItem._id === activeItem._id ? true : false} 
                                                listItem={listItem} 
                                                key={i}
                                                urlPrefix={urlPrefix}
                                            />
                                })
                            }
                            
                        </div>
                        <AddListItem/>
                    </div>
                </Animation>
            </div>
        )
    }
}

export default NavList;