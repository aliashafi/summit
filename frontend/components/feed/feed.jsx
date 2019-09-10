import ActivityIndexContainer from '../activities/Activity_Index_Container';
import UserFeedProfileContainer from '../users/user_feed_profile_container'
import React from 'react'

const Feed = (props) => {

    return(
        <div className="all-feed">
            <UserFeedProfileContainer />
            <ActivityIndexContainer />
            <div id="filler"> stuff </div>
        </div>
    )

};

export default Feed;