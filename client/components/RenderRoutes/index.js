import React,{Component} from "react";
import { Switch, Route,Redirect } from "react-router";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import AuthorizedRoute from "../AuthorizedRoute";
const appName = require("../../../package.json").name;

class RenderRoutes extends Component{
    render(){
        const {
            routes = [],
            extraProps = {},
            switchProps = {},
            user,
            isAuthenticated
        } = this.props;
        if(!routes){
            return null;
        }
        // const isAuthenticated = isAuthenticated;
        return(
            <Switch {...switchProps}>
                {
                    routes.map((route,i) => {
                        const {component: Component} = route;
                        if(route.secureRoute && isAuthenticated){
                            return <Route
                                        key={route.key || i}
                                        path={route.path}
                                        exact={route.exact}
                                        strict={route.strict}
                                        component={props =>{
                                            // if(isAuthenticated && (user.meta && user.meta.is_org_verified)){
                                            //     return <route.component {...props} {...extraProps} route={route} />
                                            // }else if(isAuthenticated && (user.meta && !user.meta.is_org_verified)){
                                            //     console.log("should redirect to /onboad");
                                                return <Component {...props} {...extraProps} route={route} />
                                            // }else{
                                            //     return (<Redirect to="/login"/>);
                                            // }
                                        }}
                                    />
                        }else{
                            return <Route
                                        key={route.key || i}
                                        path={route.path}
                                        exact={route.exact}
                                        strict={route.strict}
                                        component={props =>{
                                                if(route.render){
                                                    return route.render({ ...props, ...extraProps, route: route })
                                                }else{
                                                    return <Component {...props} {...extraProps} route={route} />
                                                }
                                            }
                                        }
                                    /> 
                        }
                    })
                }
            </Switch>
        )
    }
}

const mapStateToProps = ({user}) => ({
    isAuthenticated: user.isAuthorised,
    user: user.user
});

export default withRouter(connect(mapStateToProps,{})(RenderRoutes));
