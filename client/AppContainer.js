import React, {Component} from "react";
import {renderRoutes} from "react-router-config";
import RenderRoutes from "./components/RenderRoutes";
  

class AppContainer extends Component {
    render() {
        // console.log("Trying to render",renderRoutes(this.props.route.routes));
        return (
            <RenderRoutes routes={this.props.route.routes}/>
        );
    }
}


export default AppContainer;
