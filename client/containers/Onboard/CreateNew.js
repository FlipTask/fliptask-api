import React, {Component} from "react";
import {connect} from "react-redux";
import DropDown from "../../components/DropDown";
import {Redirect} from "react-router-dom";
import Input from "../../components/Input";
import InviteBox from "../../components/InviteBox";
import {searchOrganization, createNewOrganization, sendInvitation} from "../../actions";

class CreateNew extends Component {
    constructor(props){
        super(props);
        // console.log(props);
        this.fixedOption = {
            name: "Create New Organization",
            value: "create_new",
            alwaysVisible: true
        }
        this.state = {
            mailList: [],
            selected: {},
            name: "",
            createNew: false,
            skipInvitation: props.user.user.meta.is_org_verified,
            invite: false,
            options: [this.fixedOption]
        }
    }

    handleOnChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const obj = {};
        obj[name] = value;
        this.setState(obj);
    };
    submitNewOrg = async(e) => {
        e.preventDefault();
        if (this.state.name && this.state.name.length > 3) {
            const res = await this.props.createNewOrganization(this.state.name);
            if(!res.error){
                this.setState({
                    invite: true
                });
            }
        }
    }

    toggleCreateNew = (e) => {
        e && e.preventDefault();
        this.setState({
            createNew: !this.state.createNew
        })
    }
    onSelect = (e, option) => {
        if (e.target.value === "create_new") {
            this.toggleCreateNew();
        } else {
            this.setState({selected: option});
        }
    }
    onSearch = (e) => {
        this.setState({
            name: e.target.value
        }, async() => {
            const res = await this
                .props
                .searchOrganization(this.state.name);
            if (!res.error) {
                const optionList = Object.assign([], res.data).map((op) => {
                    op.value = op._id;
                    return op;
                });
                this.setState({
                    options: [
                        ...optionList,
                        this.fixedOption
                    ]
                });
            }
        });
    }
    onMailChange = (data = []) => {
        this.setState({
            mailList: data
        });
    }
    sendInvitation = async() => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const mailList = this.state.mailList.filter((el) => re.test(el));
        await this.props.sendInvitation(mailList);
        this.setState({
            skipInvitation: true
        });
        this.props.history.push("/workspace");
    }
    setInvite = (e) => {
        e && e.preventDefault();
        this.setState({
            invite: true
        });
    }
    render() {
        const {name} = this.state;
        const {user} = this.props;
        
        if((user && user.user && user.user.meta && user.user.meta.is_org_verified) && this.state.skipInvitation){
            return <Redirect to="/workspace" />
        }
        if (!user.isAuthorised) {
            return <Redirect to="/login"/>
        }
        return (
            <React.Fragment>
            <div style={{
                height: "60px"
            }}>
                <img
                    style={{
                        maxWidth: "100%",
                        height: "inherit",
                        padding: "0.6em"
                    }}
                    src="/assets/logo-horizontal.png"
                />
            </div>
            <div className="page-wrapper row">
                <div className="column page-side-wrapper">
                    <div style={{
                            width: "50%",
                            margin: "auto"                        
                    }}>
                        {
                            this.state.invite ?
                            <React.Fragment>
                                <h2 className="text-white text-left">Invite your team</h2>
                                <InviteBox
                                    onChange={this.onMailChange}
                                    value={this.state.mailList}
                                />
                                <div style={{
                                    marginTop: "1em",
                                    display: "flex",
                                    justifyContent: "space-between"
                                    }}>
                                    <button onClick={this.sendInvitation} className="btn bg-primary rounded bordered text-white shadowed"
                                        type="button">
                                        Invite
                                    </button>
                                    <a className="link back-link text-white" href="#" onClick={this.setInvite}>
                                        SKIP >>
                                    </a>
                                </div>
                            </React.Fragment>
                            :
                            <form className="login-form">
                                {!this.state.createNew
                                    ? <DropDown
                                            selected={this.state.selected && this.state.selected.name}
                                            onChange={this.onSearch}
                                            onSelect={this.onSelect}
                                            placeholder="Search Your Organization Name , e.g., Amazon Inc"
                                            value={this.state.name}
                                            options={this.state.options}
                                            name="name"
                                            className="rounded shadowed"/>
                                    : <React.Fragment>
                                        <Input
                                            className="rounded shadowed"
                                            type="text"
                                            placeholder="Your Organization Name , e.g., Amazon Inc"
                                            value={name}
                                            onChange={this.handleOnChange}
                                            name="name"/>
                                        <button
                                            style={{marginTop: "1em"}}
                                            className={`w-100 btn bg-primary text-white rounded shadowed`}
                                            onClick={this.submitNewOrg}
                                            type="button">
                                            Create New Organization
                                        </button>
                                        <a
                                            href="#"
                                            onClick={this.toggleCreateNew}
                                            className="link back-link text-white">Go Back</a>
                                    </React.Fragment>
                                }
                            </form>   
                        }                        
                    </div>
                </div>
            </div>
            </React.Fragment>
        );
    }
}
const mapStateToProps = ({user}) => ({user: user, isAuthorised: user.isAuthorised});
export default connect(mapStateToProps, {searchOrganization, createNewOrganization, sendInvitation})(CreateNew);
