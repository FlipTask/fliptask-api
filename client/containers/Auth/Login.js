import React, {Component} from "react";
import {connect} from "react-redux";
import Input from "../../components/Input";
import {tryLogin} from "../../actions";
import { Redirect } from "react-router-dom";
import {Link} from "react-router-dom";
class Login extends Component {
    state = {
        username: "",
        password: ""
    };

    handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const obj = {};
        obj[name] = value;
        this.setState(obj);
    };
    submitLogin = async() => {
        const {login} = this.props;
        const {username, password} = this.state;
        const res = await login({
            email: username,
            password,
        });
    };

    render() {
        const {username, password} = this.state;
        const {
            isAuthorised,
            error,
            isLoading
        } = this.props;
        if(isAuthorised){
            return <Redirect to="/onboard" />
        }else{
            return (
                <div className="page-wrapper">
                    <div className="row">
                        <div className="column page-side-wrapper">
                            <img src="/assets/help.png" alt="HELP.png"/>
                            <h1>Plan</h1>
                            <h2>Collaborate</h2>
                            <h3>Succeed</h3>
                        </div>
                        <div className="column">
                            <div className="login-form-wrapper">
                                <img src="/assets/logo.png" className="logo-img"/>
                                <form className="login-form">
                                    {
                                        error.message ? 
                                        <p className="inline--error">{error.message}</p> : ""
                                    }
                                    <Input
                                        iconPosition="left"
                                        icon="envelope-square"
                                        className="rounded shadowed border"
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={this.handleOnChange}
                                        name="username"/>
                                    <Input
                                        iconPosition="left"
                                        icon="unlock-alt"
                                        className="rounded shadowed border"
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={this.handleOnChange}
                                        name="password"/>
                                    <button className={`btn bg-awesome gradient rounded shadowed text-white form-control ${isLoading ? "disabled" : ""}`} onClick={this.submitLogin} type="button">
                                        Login
                                    </button>
                                    <Link className="auth-back-link" to="/signup">New Here ? Sign Up</Link>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}
const mapStateToProps = ({user}) => ({
    isAuthorised : user.isAuthorised,
    error: user.error,
    isLoading: user.isLoading
});
export default connect(mapStateToProps,{
    login : tryLogin
})(Login);
