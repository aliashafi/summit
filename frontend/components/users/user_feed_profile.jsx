import React from 'react'
import { formatDate } from '../../util/date_util'
import UserFeedRecentActivity from './user_feed_recent_activity'
import {fetchUser} from '../../util/users_util'
import { withRouter} from 'react-router-dom'

class UserFeedProfile extends React.Component {

    constructor(props){
        super(props)
    }



    ownActivities() {
        let ownActivities = [];
        this.props.currentUserActivities.forEach(act => {
            if (act.user_id === this.props.current_user.id) ownActivities.push(act);
        })

        return ownActivities
    }

    latestActivity() {
        
        let activities = Object.values(this.props.currentUserActivities)
        let last = activities[activities.length - 1]
        return last ? { "title": last.title, "date": last.time } : { "title": "No recent activity", "date": "" }

    }

    render (){
        const activities = Object.values(this.props.currentUserActivities)

        return(
        <div className="grid-left">
        <div id="card">
            <section className="profile-picture-container">
            <div className="profile-picture"
                onClick={() =>
                    this.props.history.push(`/users/${this.props.current_user.id}`)}>
                <img src={this.props.current_user.photoUrl} />
            </div>

            </section>
            <div className="user-feed-profile">
                <h3>{this.props.current_user.first_name} {this.props.current_user.last_name}</h3>

                <section className="followers-following-Activities">
                    <div>
                        <h3>Following</h3>
                        <p>{this.props.following.length}</p>
                    </div>
                    <div id="short-border-right"></div>

                    <div>
                        <h3>Followers</h3>
                        <p>{this.props.followers.length}</p>
                    </div>
                    <div id="short-border-right"></div>

                    <div>
                        <h3>Activites</h3>
                        <p>{activities.length}</p>
                    </div>

                </section>

                <section className="recent-activity">
                    <h3>Latest Activity</h3>
                    <p>{this.latestActivity().title}</p>
                    <li>{this.latestActivity().date ? formatDate(this.latestActivity().date) : this.latestActivity().date}</li>

                </section>

                <div id="short-border"></div>
                <div id="training-log">
                    Your Training Log
                </div>

            </div>
                <UserFeedRecentActivity activity={activities} />

            </div>
            </div>
        )
    }

}


export default withRouter(UserFeedProfile);