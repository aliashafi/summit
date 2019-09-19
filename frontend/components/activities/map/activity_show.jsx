import React from 'react';
import ActivityShowMapContainer from './activity_show_map_container';
import ElevationGraph from './elevation_graph'
import {getElevationPerMile, getSplits} from '../../../util/elevation_util'
import { formatDate } from '../../../util/date_util'
import { calculateElevationGain } from '../../../util/gpx_util.js'




class ActivityShow extends React.Component {

    constructor(props) {
        super(props)
        
    }

    componentDidMount(){
        this.props.fetchActivity(this.props.match.params.activityId)
        this.props.fetchAllUsers() 
    }

    getElapseTime() {
        let measuredTime = new Date(null)
        measuredTime.setSeconds(this.props.activity.elapse_time);
        let MHSTime = measuredTime.toISOString().substr(11, 8);
        return MHSTime.slice(1)
    }

    

    render(){
        let data = {};
        let user = {};
        let dist = 0;
        let speed = 0;
        let eleGain = 0;
        let splits = {};

        if (this.props.activity){
            data = getElevationPerMile(this.props.activity.elevation, this.props.activity.distance)
            user = this.props.users[this.props.activity.user_id]
            dist = Math.round(this.props.activity.distance * 100) / 100
            speed = Math.round(this.props.activity.average_speed * 100) / 100
            let elevation = JSON.parse(this.props.activity.elevation)
            eleGain = Math.floor(calculateElevationGain(elevation));
            splits = getSplits(this.props.activity.time_stamps, this.props.activity.distance, this.props.activity.elevation)
        }

        
        
        return(
            
            <div className="activity-show-page">
                    
                <div id="container-map">
                    {user && this.props.activity ? 
                    <section className="userInfo-stats">
                        <div id="user-info-header">
                            <h1>{user.first_name} {user.last_name} - {this.props.activity.activity_type}</h1>
                        </div>

                        <div id = "activity-show-info">
                            <div className="profile-picture">
                                <img src={user.photoUrl} alt="" />
                            </div>

                            <div className="activity-details-show">
                                <div id="activity-time">
                                    {formatDate(this.props.activity.time)}
                                </div>

                                <div id="activity-show-title">
                                    {this.props.activity.title}
                                </div>

                                <div id="activity-title">
                                    {this.props.activity.description}
                                </div>
                            </div>

                            <div id="all-activity-stats">

                                <div id="activity-show-stats">
                                        <div>
                                            <section>
                                                <p>{dist}</p> <span>mi</span>
                                            </section>
                                            <h3>Distance</h3>
                                        </div>

                                        <div>
                                            <section>
                                                <p>{eleGain}</p> <span>ft</span>
                                            </section>
                                            <h3>Elevation</h3>
                                        </div>


                                        <div>
                                            <p>{this.getElapseTime()}</p>
                                            <h3>Elapsed Time</h3>
                                        </div>
                                </div>

                                    <div>
                                        <table className="route-data">
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th>Avg</th>
                                                    <th>Max</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>Speed</th>
                                                    <td>{speed}<abbr className="unit" title="miles per hour">mi/h</abbr></td>
                                                    <td>32.7<abbr className="unit" title="miles per hour">mi/h</abbr></td>
                                                </tr>
                                            </tbody>
                                        </table>

                                    </div>

                                </div>

                        </div>
                        

                    </section>
                    : ""}

                    <section className="activity-map">

                       

                        {this.props.activity ? 
                            <ActivityShowMapContainer
                                key={this.props.activity.id}
                                activity={this.props.activity}
                                user={this.props.users[this.props.activity.user_id]}
                                interactive={true}
                                container={`map-show-${this.props.activity.id}`}
                                data={data[0]} 
                                interval={data[1]}
                                splits = {splits}
                    
                            /> :
                            ""
                        }

                        

                        
                    </section>

    
                    </div>


                 

                
                
            </div>
        )
    }

}

export default ActivityShow;