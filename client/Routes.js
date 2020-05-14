import React from "react";
import loadable from '@loadable/component';
import {fetchUser} from "./actions";

const Loading = () => <h1>Loading...</h1>;
// const EntryPoints = require("./EntryPoints");

const App = loadable(() => import(/* webpackChunkName: "app", webpackPrefetch: true */ "./App"),{
    fallback: Loading,
    ssr: true
});

const AppContainer = loadable(() => import(/* webpackChunkName: "appcontainer", webpackPrefetch: true */ "./AppContainer"),{
    fallback: Loading,
    ssr: true
});
const Login  = loadable(() => import(/* webpackChunkName: "login", webpackPrefetch: true */ './containers/Auth/Login'),{
    ssr: true,
    fallback: Loading,
});
const SignUp  = loadable(() => import(/* webpackChunkName: "signup", webpackPrefetch: true */ './containers/Auth/SignUp'),{
    ssr: true,
    fallback: Loading,
});

const CreateNewOrg = loadable(() => import(/* webpackChunkName: "createneworg", webpackPrefetch: true */ "./containers/Onboard/CreateNew"),{
    ssr: true,
    fallback: Loading,
});

const Workspace = loadable(() => import(/* webpackChunkName: "workspace", webpackPrefetch: true */ "./containers/Workspace/index"),{
    ssr: true,
    fallback: Loading,
});
const WorkBoard  = loadable(() => import(/* webpackChunkName: "workboard", webpackPrefetch: true */ './containers/Workspace/WorkBoard'),{
    ssr: true,
    fallback: Loading,
});
const Home  = loadable(() => import(/* webpackChunkName: "home", webpackPrefetch: true */ './containers/Home'),{
    ssr: true,
    fallback: Loading,
});

export default [
    {
        component: AppContainer,
        loadData: (store) => {
            return [
               store.dispatch(fetchUser())
            ];
        },
        routes: [
            {
                exact: true,
                path: "/login",
                component: Login,
            },
            {
                path: "/",
                exact: true,
                component: Home,
                secureRoute: true
            },
            {
                // exact: false,
                path: "/workspace",
                component: Workspace,
                secureRoute: true,
                routes: [
                    {
                        path: "/workspace/:workspaceId",
                        component: WorkBoard,
                        secureRoute: true,
                    }
                ]
            },
            {
                exact: true,
                path: "/signup",
                component: SignUp
            },
            {
                exact: true,
                path: "/onboard",
                secureRoute: true,
                component: CreateNewOrg,
                
            }
        ]
    }
];