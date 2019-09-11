import ActivityIndexContainer from '../activities/activity_index_container';
import UserFeedProfileContainer from '../users/user_feed_profile_container'
import React from 'react'

const Feed = (props) => {

    return(
        <div className="all-feed">
            <UserFeedProfileContainer />
            <ActivityIndexContainer />
            <div className="grid-right"> stuff </div>
        </div>
    )

};

export default Feed;