import ActivityIndexContainer from '../activities/activity_index_container';
import ActivityIndex from '../activities/activity_index'
import UserFeedProfile from '../users/user_feed_profile'
import React from 'react'

class Feed extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchAllActivities();
        this.props.fetchFollowers();
        this.props.fetchFollowing();
        this.props.fetchAllUsers();
    }

    render(){
        return(
            <div>
            
                {this.props.activities.length > 0 ? 
                    <div className="all-feed">
                        <UserFeedProfile
                                followers={this.props.followers}
                                following={this.props.following}
                                activities={this.props.activities}
                                current_user={this.props.current_user}
                            />      
                        <ActivityIndex
                            users={this.props.users} 
                            activities={this.props.activities}
                        /> 

                        <div className="grid-right">
                            <section>Challenges
        
                    </section>Insipration
        
                    <section>Some of your friends
        
                    </section>

                        </div>
                    </div>
                
                : ""
                }


            </div>
                
            
        )
    }

};

export default Feed;