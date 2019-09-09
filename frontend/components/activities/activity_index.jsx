import React from 'React'
import ActivityIndexItem from './activity_index_item';

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
                <ActivityIndexItem 
                    id={activity.id}
                    key={activity.id}
                    activity={activity} 
                    fetchActivity={this.props.fetchActivity} 
                    />
            )
        })
        return(
            <div>
                <li>
                    <div id='map'></div>
                    {activities}
                </li>
                
            </div>
        )

    }

}

export default ActivityIndex;