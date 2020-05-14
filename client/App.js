import React, {Component} from "react";
import {fetchUser} from "./actions";
import {connect} from "react-redux";
import { renderRoutes } from "react-router-config";
import Routes from "./Routes";

class App extends Component {
    componentDidMount = async() => {
        await this.props.fetchUser();
    }
    render() {
        return (
            <div className="page--container">
                {renderRoutes(Routes)}
            </div>
        );
    }
}
const mapStateToProps = () => ({
    
});

export default connect(mapStateToProps,{
   fetchUser 
})(App);
