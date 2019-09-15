import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {fetchAllKudos} from '../../../actions/kudos/kudo_actions'
import { fetchAllActivities } from '../../../actions/activities/activity_actions'


const mapStateToProps = (state, ownProps) => ({
    kudos: state.entities.kudos, 
    users: state.entities.users
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllActivities: (page) => dispatch(fetchAllActivities(page)), 
    fetchAllKudos: (id) => dispatch(fetchAllKudos(id))
})

class KudoIndex extends React.Component {

    constructor(props){
        super(props)
        
    }
    componentDidUpdate(prevProps){
        if (Object.values(prevProps.kudos).length !== Object.values(this.props.kudos).length) {
            this.props.fetchAllActivities(this.props.page)
            
            // this.props.fetchAllKudos(this.props.activity.id)
        }
    }

    render(){
        let kudos = this.props.activity.kudo_ids.map(kudoId => this.props.kudos[kudoId])
        let users = []
        console.log(kudos)
        if (kudos[0]){ 
            users = kudos.map(kudo => this.props.users[kudo.user_id])
        }
        return(
            <div id="kudos">
            <div id="user-kudos"> {users.slice(0,3).map(user => {
                return(<div key={user.id} className="profile-picture-small-comment">
                    <img src={user.photoUrl} alt="" />
                </div>)
            })} 
            </div>

                {users.length > 0 ? 
                        <p>{users.length} kudos </p> : "" 
                }
                {this.props.activity.comment_ids.length >= 2 ?

                    <h1 id="num-comments"> 
                        <p id="dot"> . </p> 
                        <p id="comment-num">
                        {this.props.activity.comment_ids.length} comments</p> 
                        </h1> :
                    this.props.activity.comment_ids.length > 0 ? 

                    <h1 id="num-comments">
                        <p id="dot"> . </p>
                        <p id="comment-num">
                            {this.props.activity.comment_ids.length} comment</p>
                    </h1> : ""

                }
                
            </div>

        )
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(KudoIndex))