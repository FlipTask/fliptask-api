import React,{Component} from "react";
import TokenInput from 'react-customize-token-input';

class InviteBox extends Component{
    state = {
        cData: []
    }
    validateEmail = (email) => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
    }
    onChange = (tokens) => {
        const data = tokens.map((token, index) => {
            return token.value;
        });
        this.setState({ cData: data }, () => {
            if(this.props.onChange){
                this.props.onChange(this.state.cData);
            }
        });
    }
    handleKeyDown = (onEndEdit) => (e) => {
        const { value } = e.target;

        if (e.keyCode === 13) { // Enter key
            onEndEdit(value);
        }
    }
    handleBlur = (onEndEdit) => (e) => {
        onEndEdit();
    }
    validator = (data, index, allData) => {
        const isValid = this.validateEmail(data);
        if(!isValid){
            return "Not a valid email"
        }
        // Check duplicated
        const matched = allData.filter((item, idx, array) => {
            // console.log(item, data);
            return idx !== index && item === data;
        });
        if (matched.length > 0) {
            return `${matched[0]} Duplicated`;
        }
        return null;
    }
    tokenRender = (props) => {
        const {
            key,
            data,
            meta,
            onStartEdit,
            onEndEdit,
            onDelete
        } = props;
        const { activated } = meta;

        if (activated) {
            return (
                <div key={key} className="token--item customize-token-input---token---2ASwp">
                    <input
                        ref={input => input && input.focus()}
                        defaultValue={data}
                        onKeyDown={this.handleKeyDown(onEndEdit)}
                        onBlur={this.handleBlur(onEndEdit)}
                    />
                </div>
            );
        }

        return (
            <div title={meta.error ? meta.error: ""} key={key} className={`token--item customize-token-input---token---2ASwp ${meta.error ? "bg-warning text-white" : "bg-primary text-white"}`}>
                <div
                    onClick={() => onStartEdit()}
                    role="presentation"
                >
                    {data}
                </div>
                <i className="fa fa-times text-light" onClick={() => onDelete()}/>
            </div>
        );
    }
    render(){
        const {value} = this.props;
        return (
            <div className="invite-box">
                <TokenInput
                    className="invite-box-wrapper"
                    placeholder={this.state.cData.length > 0 ? "Add another email" : "Invite your team by email"}
                    defaultData={value || this.state.cData}
                    tokenRender={this.tokenRender}
                    onTokensUpdate={this.onChange}
                    separators={['\\+',' ']}
                    validator={this.validator}
                />
            </div>
        )
    }
}

export default InviteBox;