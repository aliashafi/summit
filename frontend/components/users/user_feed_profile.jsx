import React from 'react'
import { formatDate } from '../../util/date_util'
import UserFeedRecentActivity from './user_feed_recent_activity'
import {fetchUser} from '../../util/users_util'

class UserFeedProfile extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        // this.props.fetchFollowers()
        // this.props.fetchFollowing()
        this.props.fetchAllActivities()
        this.props.fetchUser
    }

    ownActivities() {
        let ownActivities = [];
        this.props.activities.forEach(act => {
            if (act.user_id === this.props.current_user.id) ownActivities.push(act);
        })

        return ownActivities
    }

    latestActivity() {
        let activities = this.ownActivities()
        let last = activities[activities.length - 1]
        return last ? { "title": last.title, "date": last.time } : { "title": "", "date": "" }

    }

    render (){
        return(

        <div className="grid-left">
        <div id="card">
            <div className="user-feed-profile">
                <h3>{this.props.current_user.first_name} {this.props.current_user.last_name}</h3>
                {/* <img src={this.props.current_user.photoUrl}/> */}

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
                        <p>{this.ownActivities().length}</p>
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
                <UserFeedRecentActivity activity={this.ownActivities()} />

            </div>
            </div>
        )
    }

}


export default UserFeedProfile;