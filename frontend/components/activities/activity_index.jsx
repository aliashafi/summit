import React from 'react'
import ActivityItem from './Activity_Item';
import ActivityMap from './Activity_Map'

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
                    />
            )
        })

        return(
            <div>
                <section className="activity-feed">
                    {activities}
                </section>
                
            </div>
        )

    }

}

export default ActivityIndex;