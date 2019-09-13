import React from 'react';
import {withRouter} from 'react-router-dom';
import ActivityMap from './map/activity_map'
import { formatDate } from '../../util/date_util'
import { calculateElevationGain } from '../../util/gpx_util.js'



class ActivityItem extends React.Component {

    constructor(props){
        super(props)
        this.elevation = JSON.parse(this.props.activity.elevation)
        
    }

    getElapseTime(){
        let measuredTime = new Date(null)
        measuredTime.setSeconds(this.props.activity.elapse_time); 
        let MHSTime = measuredTime.toISOString().substr(11, 8);
        return MHSTime.slice(1)
    }
    

    render(){
        const ele = calculateElevationGain(this.elevation);

        const dist = Math.round(this.props.activity.distance * 100)/ 100
        const speed = Math.round(this.props.activity.average_speed * 100)/ 100
        return (
        <div id="activity-item">
                
            <div id="activity-username">
                    <div className="profile-picture-small">
                        <img src={this.props.user.photoUrl} />
                    </div>
                    <div>
                        <p>{`${this.props.user.first_name} ${this.props.user.last_name}`}</p>
                        <p id="time">{formatDate(this.props.activity.time)}</p>
                    </div>
            </div>
                
            <section id="activity-details">
                    {this.props.activity.activity_type !== 'Bike' ? (
                        <img src={window.images.running_icon} alt="" />
                    ) :
                        <img src={window.images.biking_icon} alt="" />
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
                    <section></section>

                <div>
                    <h3>Avg Speed</h3>
                    <p>{speed}</p>
                </div>
                    <section></section>

                <div>
                    <h3>Time</h3>
                    <p>{this.getElapseTime()}</p>
                </div>

            </section>

            <ActivityMap
                key={this.props.activity.id}
                activity={this.props.activity}
                user={this.props.user}
                interactive={false}
                container={`map-${this.props.activity.id}`}
            />
        </div>
       
        )
    }

};

export default withRouter(ActivityItem);