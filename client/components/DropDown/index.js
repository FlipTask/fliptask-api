import React,{Component} from "react";
import Input from "./../Input";

  
class DropDown extends Component{
    state = {
        isSearchFocus: false,
        openList: false,
        searchKey:""
    }
    t = null;
    onFocus = (e,val) => {
        this.t = null;
        this.setState({
            openList: true
        });
        this.onSearchFocus(e,val)
    }
    onBlur = (e) => {
        e.preventDefault();
        clearTimeout(this.t);
        this.t = setTimeout(() => {
            this.setState({
                openList: false,
                searchKey: "",
                isSearchFocus: false
            });
            clearTimeout(this.t);
        },200);
    }
    onSelect = (e,option) => {
        this.props.onSelect(e,option)
    }
    onSearch = (e) => {
        if(typeof this.props.onChange === "function"){
            this.props.onChange(e)
        }else{
            this.setState({
                searchKey: e.target.value
            });
        }
    }
    componentWillUnmount(){
        clearTimeout(this.t);
    }
    onSearchFocus = (e,str) => {
        this.setState({
            searchKey: str,
            isSearchFocus: true
        });
    }
    render(){
        const {
            value,
            options = [], 
            name,
            placeholder,
            selected,
            className,
            label,
            readOnly=false,
        } = this.props;
        const fixedButton = options.filter(obj => obj.alwaysVisible)[0];
        const newOptions = options.filter(obj => !obj.alwaysVisible);
        const selectedOption = options.filter(o => o.value == selected)[0];
        let selectedValue = "";
        if(selectedOption && selectedOption.name){
            selectedValue = selectedOption.name
        }
        console.log(newOptions);
        return(
            <div className="dropdown" onClick={(e) => {
                if(!readOnly){
                    this.onFocus(e, selectedValue)
                }
            }}>
                <div className="dropdown--wrapper">
                    <div className="dropdown--input">
                        {
                            label ?
                            <label className="label">{label}</label>
                            :
                            ""
                        }
                        <Input
                            type="dropdown"
                            readOnly={readOnly}
                            value={
                                typeof this.props.onChange === "function" ? value :
                                (this.state.isSearchFocus ? this.state.searchKey : selectedValue)
                            }
                            onBlur={this.onBlur}
                            // type="text" 
                            onChange={this.onSearch} 
                            name={name} 
                            placeholder={value || placeholder}
                            className={className}
                        />
                    </div>
                    {
                        this.state.openList
                        ?
                        <div className="dropdown--list">
                            <div className="dropdown--list-container">
                            <div className="dropdown--list_wrapper">
                                {
                                    newOptions && newOptions.filter((obj) => obj.name.toLowerCase().startsWith(this.state.searchKey)).map((option,i) => {
                                        return (
                                            <button 
                                                type="button"
                                                key={i} 
                                                name={name}
                                                value={option.value} 
                                                className={
                                                    `dropdown-list-item ${option.alwaysVisible ? "fixed-at-bottom" : ""}`
                                                } 
                                                onClick={(e) => this.onSelect(e,option)}
                                            >
                                                {option.name}
                                            </button>
                                        ) 
                                    })
                                }
                            </div>
                            {
                                fixedButton ? 
                                    <button 
                                        type="button"
                                        name={name}
                                        value={fixedButton.value} 
                                        className={
                                            `text-primary dropdown-list-item fixed-at-bottom`
                                        } 
                                        onClick={this.onSelect}
                                    >
                                        {fixedButton.name}
                                    </button>
                                    :
                                    ""
                            }
                            </div>
                        </div>
                        :
                        ""
                    }
                </div>
            </div>
        )
    }
}

export default DropDown;