import React from 'react'
import ActivityItem from './activity_item';
import ActivityMap from './activity_map'


class ActivityIndex extends React.Component {

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchAllActivities()
    }


    render(){
        const activities = this.props.activities.map(activity => {
            return(
                <ActivityItem 
                    key={activity.id}
                    activity={activity} 
                    fetchActivity={this.props.fetchActivity}
                    current_user={this.props.current_user}
                    />
            )
        })

        return(
            <div className="grid-center">
                <section className="activity-feed">
                    {activities}
                </section>
                
            </div>
        )

    }

}

export default ActivityIndex;