import React from 'react';
import ActivityShowMapContainer from './activity_show_map_container';
import ElevationGraph from './elevation_graph'
import {getElevationPerMile} from '../../../util/elevation_util'



class ActivityShow extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.fetchActivity(this.props.match.params.activityId)
        this.props.fetchAllUsers() 
    }

    

    render(){
        let data = {}
        if (this.props.activity){
            data = getElevationPerMile(this.props.activity.elevation, this.props.activity.distance)
        }

        return(
            
            <div className="activity-show-page">
                    
                <div id="container-map">

                    <section className="userInfo-stats">

                    </section>

                    <section className="activity-map">
                        {/* <div className="splits">
                            <h2>Splits</h2>
                            <table id="spilts-table">
                                <tbody>
                                <tr>
                                    <th>Mile</th>
                                    <th>Pace</th>
                                    <th>Elev</th>
                                </tr>
                                <tr>
                                    <td>test1</td>
                                    <td>test2</td>
                                    <td>test3</td>
                                </tr>
                                <tr>
                                    <td>test1</td>
                                    <td>test2</td>
                                    <td>test3</td>
                                </tr>
                                <tr>
                                    <td>test1</td>
                                    <td>test2</td>
                                    <td>test3</td>
                                </tr>
                                <tr>
                                    <td>test1</td>
                                    <td>test2</td>
                                    <td>test3</td>
                                </tr>
                                </tbody>
                            </table> */}

                        {/* </div> */}
                        {this.props.activity ? 
                            <ActivityShowMapContainer
                                key={this.props.activity.id}
                                activity={this.props.activity}
                                user={this.props.users[this.props.activity.user_id]}
                                interactive={true}
                                container={`map-show-${this.props.activity.id}`}
                                data={data[0]} 
                                interval={data[1]}
                            /> :
                            ""
                        }

                        
                    </section>

                    {/* <ElevationGraph data={data[0]} interval={data[1]} /> */}
    
                    </div>


                 

                
                
            </div>
        )
    }

}

export default ActivityShow;