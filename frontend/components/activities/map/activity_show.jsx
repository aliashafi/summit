import React from 'react';
import ActivityMap from './activity_map';

class ActivityShow extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.fetchActivity(this.props.match.params.activityId)
        this.props.fetchAllUsers() 
    }

    render(){
        

        return(
            
            <div className="activity-show-page">
                    
                <div id="container-map">

                    <section className="userInfo-stats">

                    </section>

                    <section className="activity-map">
                        <div className="splits">
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
                            </table>

                        </div>
                        {this.props.activity ? 
                            <ActivityMap
                                key={this.props.activity.id}
                                activity={this.props.activity}
                                user={this.props.users[this.props.activity.user_id]}
                                interactive={true}
                                container={`map-show-${this.props.activity.id}`}
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