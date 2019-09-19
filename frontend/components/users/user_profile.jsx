import React from 'react'
import CountUp, { startAnimation } from 'react-countup';
import ActivityCallendar from './stats/activity_callendar'
import UserFeedRecentActivity from './user_feed_recent_activity';
import ActivityMap from '../activities/map/activity_map'
import { formatDate } from '../../util/date_util'


class UserProfile extends React.Component{

    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.fetchUserActivities()
    }

    subtractDays(time, d) {
        let test = time;
        test.setTime(test.getTime() - (d * 24 * 60 * 60 * 1000));
        return test;
    }

    getLastFourWeeks() {
        let activities = this.props.activities;
        let end = new Date(activities[this.props.activities.length - 1].time);
        let copy = `${end}`
        let start = this.subtractDays(end, 28)
        let newEnd = new Date(copy)
        return [start, newEnd]
    }

    between(dates, currentDate) {
        let current = new Date(currentDate)
        if ((current >= dates[0]) && (current <= dates[1])) {
            return true;
        } else {
            return false;
        }
    }

    getElapseTime(activity) {
        let measuredTime = new Date(null)
        measuredTime.setSeconds(activity.elapse_time);
        let MHSTime = measuredTime.toISOString().substr(11, 8);
        return MHSTime.slice(1)
    }


    render(){
        let dateBounds4 = [];
        let last4 = [];
        if (this.props.activities.length !== 0) {
            dateBounds4 = this.getLastFourWeeks()
            last4 = this.props.activities.filter(activity => {
                let date = new Date(activity.time)
                if (this.between(dateBounds4, date)) return activity
            })
        }


        return(
            
            <div >
                {this.props.activities.length > 0 ? 
                <div className="user-profile-page">
                    <div className="user-content">
                    <div className="profile-page-picture">
                        <img src={this.props.current_user.photoUrl} />
                    </div>
                    <p id="user-name">{this.props.current_user.first_name} {this.props.current_user.last_name}</p>
                    <div className="top-section">
                        <section>
                            <div id="last-4-weeks">
                                <p>Last 4 Weeks</p>
                                {/* <p>{last4.length}</p> */}
                                <CountUp end={last4.length}/>
                                <p>Total Activities</p>
                            </div>

                            <div>
                               
                                <ActivityCallendar activities={last4} bounds={dateBounds4}/>
                               
                            </div>

                        </section>

                    </div>
                </div>

                    <div id="user-feed-recent-profile">

                    <UserFeedRecentActivity activity={this.props.activities}/>
                    </div>


                        <div className="user-profile-maps">
                        
                        {last4.map(activity => {
                            return (
                                <div >
                                    <div id="profile-activity-details">
                                        <section id="activity-details">
                                            {activity.activity_type !== 'Bike' ? (
                                                <img src={window.images.running_icon} alt="" />
                                            ) :
                                                <img src={window.images.biking_icon} alt="" />
                                            }

                                            <div id="activity-header">
                                                <h3 id="activity-title">{activity.title}</h3>
                                                <p id="time">{formatDate(activity.time)}</p>
                                            </div>
                                        </section>

                                        <section id="show-stats">
                                            <div>
                                                <h3>Distance</h3>
                                                <p>{Math.round(activity.distance * 100) / 100} mi</p>
                                            </div>
                                            <section></section>

                                            <div>
                                                <h3>Avg Speed</h3>
                                                <p>{Math.round(activity.average_speed * 100)/ 100}</p>
                                            </div>
                                            <section></section>

                                            <div>
                                                <h3>Time</h3>
                                                <p>{this.getElapseTime(activity)}</p>
                                            </div>
                                            

                                        </section>
                                    </div>

                                        <ActivityMap
                                            key={activity.id}
                                            activity={activity}
                                            interactive={false}
                                            container={`map-${activity.id}`}
                                        />
                                </div>
                            )
                        })}
                    </div>
                </div>
                    
                : ""}

                
                    
            </div>
        )
    }
}

export default UserProfile;