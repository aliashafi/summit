import React from 'react';
import {withRouter} from 'react-router-dom';
import ActivityMap from './activity_map'
import { formatDate } from '../../util/date_util'


class ActivityItem extends React.Component {

    constructor(props){
        super(props)
    }

    getElapseTime(){
        let measuredTime = new Date(null)
        measuredTime.setSeconds(this.props.activity.elapse_time); 
        let MHSTime = measuredTime.toISOString().substr(11, 8);
        return MHSTime.slice(1)
    }

    render(){
        const dist = Math.round(this.props.activity.distance * 100)/ 100
        const speed = Math.round(this.props.activity.average_speed * 100)/ 100

        return (
        <div id="activity-item">
            <div id="activity-username">
                <p>Demo User</p>
                    <p id="time">{formatDate(this.props.activity.time)}</p>
            </div>
                
            <section id="activity-details">
                    {this.props.activity.activity_type !== 'Bike' ? (
                        <img src="assets/running_icon.png" alt="" />
                    ) :
                        <img src="assets/bike_icon.png" alt="" />
                    }
                
                <div id="activity-header">
                    <h3 id="activity-title">{this.props.activity.title}</h3>
                    <p id="activity-description">{this.props.activity.description}</p>
                </div>
            </section>

            <section id="show-stats">
                <div>
                    <h3>Distance</h3>
                    <p>{dist} mi</p>
                </div>

                <div>
                    <h3>Average Speed</h3>
                    <p>{speed}</p>
                </div>

                <div>
                    <h3>Time</h3>
                    <p>{this.getElapseTime()}</p>
                </div>

            </section>

            <ActivityMap
                key={this.props.activity.id}
                activity={this.props.activity}
                fetchActivity={this.props.fetchActivity}
            />
        </div>
       
        )
    }

};

export default withRouter(ActivityItem);