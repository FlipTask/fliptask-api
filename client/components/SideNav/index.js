import React,{Component} from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import UserBox from "./UserBox";
import NavList from "./NavList";
import Footer from "./Footer";
import NewWorkspace from "./NewWorkspace";

class SideNav extends Component{
    render(){
        const {
            user,
            activeBoard,
            boards
        } = this.props;
        const openWorkspace = this.props.match.path === "/workspace" ? true : false;
        return (
            <React.Fragment>
                <div className="header--primary">
                    <UserBox />
                    <NavList
                        accordian={true}
                        title={"Teams"}
                        urlPrefix={"/teams"}
                        list={user.meta.team_list}
                        activeItem={activeBoard}
                        AddListItem={NewWorkspace}
                    />
                    <NavList
                        accordian={true}
                        open={openWorkspace}
                        title={"Workspaces"}
                        urlPrefix={"/workspace"}
                        list={boards}
                        activeItem={activeBoard}
                        AddListItem={NewWorkspace}
                    />
                    <Footer />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({user, boards}) => ({
    activeBoard: boards.activeBoard,
    user: user.user,
    boards: boards.boards,
});
export default withRouter(connect(mapStateToProps,{
})(SideNav));