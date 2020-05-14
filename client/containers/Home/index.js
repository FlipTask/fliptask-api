import React,{Component} from "react";
import {connect} from "react-redux";

const TeamCard = ({data}) => {
    return (
        <div className="card">
            Hello
        </div>
    )
}
class Home extends Component{
    render(){
        const {meta} = this.props;
        return(
            <div className="container">
                <div className="row">
                    Hellow
                    {
                        meta.team_list.map((team,i) => {
                            <TeamCard data={team} key={i}/>
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({user}) => ({
    meta: user.user.meta
});
export default connect(mapStateToProps,{})(Home);