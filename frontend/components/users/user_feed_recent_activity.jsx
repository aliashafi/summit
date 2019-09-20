import React from 'react';
import { calculateElevationGain } from '../../util/gpx_util.js';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class Headers extends React.Component {
    render() {
        const selected = this.props.selectedPane;

        const headers = Object.keys(this.props.panes).map((pane, index) => {
            let path = "";
            if (pane === "Bike") path = window.images.biking_icon;
            if (pane === "Swim") path = window.images.swimming_icon;
            if (pane === "Run") path = window.images.running_icon;
            const klass = pane === selected ? 'active-tab' : '';

            return (
                
                <p
                    key={index}
                    id={klass}
                    onClick={() => this.props.onTabChosen(pane)}
                ><img src={path} /></p>
            );
        });

        return (
            <ul className='tabs'>
                {headers}
            </ul>

        );
    }
}

export default class UserFeedRecentActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPane: "Bike"
        };
        this.selectTab = this.selectTab.bind(this);
    }

    compareDates(date1, date2){
        let first = new Date(date1.time)
        let second = new Date(date2.time)
        if (first > second) {
            return 1;
        }else if (second > first){
            return -1;
        }else{
            return 0;
        } 
        
    }

    subtractDays(time, d) {
        let test = time;
        test.setTime(test.getTime() - (d * 24 * 60 * 60 * 1000));
        return test;
    } 

    getLastSevenDays(activityType){
        let bike = this.props.activity.filter(act => act.activity_type === activityType);
        if (bike.length === 0) return [0,0];
        // bike = bike.sort(this.compareDates);
        let end = new Date(bike[0].time);
        let copy = `${end}`
        let start = this.subtractDays(end, 7)
        let newEnd = new Date(copy)
        return [start, newEnd]
    }

    between(dates, currentDate){
        let current = new Date(currentDate)
        if ((current >= dates[0]) && (current <= dates[1])){
            return true;
        }else{
            return false;
        }
    }

    getElevation(activity_elevation){
        let elevation = JSON.parse(activity_elevation)
        const gains = calculateElevationGain(elevation)
        return gains;
    }

    getElapseTime(elapsed_time) {
        let measuredTime = new Date(null)
        measuredTime.setSeconds(elapsed_time);
        let MHSTime = measuredTime.toISOString().substr(11, 8);
        let newTime = MHSTime.slice(1).split(":")
        let displayTime = `${newTime[0]}h ${newTime[1]}m`
        return displayTime;
    }

    getDay(dateTime){
        let date = new Date(dateTime)
        return date.getDay()
    }



    selectTab(num) {
        this.setState({ selectedPane: num });
    }

    makePanes(){
        
        const bikeDates = this.getLastSevenDays("Bike");
        const runDates = this.getLastSevenDays("Run");

        let panes = {"Bike": 0, "Run": 0, "Swim":0}
        let panesElevation = { "Bike": 0, "Run": 0, "Swim": 0 }
        let panesTime = { "Bike": 0, "Run": 0, "Swim": 0 }
        let dayCountRun = { 0: 1, 1: 1, 2: 1, 3: 1, 5: 1, 6: 1}
        let dayCountRide = { 0: 1, 1: 1, 2: 1, 3: 1, 5: 1, 6: 1}
        let dayCountSwim = { 0: 0, 1: 0, 2: 0, 3: 0, 5: 0, 6: 0 }
        this.props.activity.forEach(act => {
            switch (act.activity_type) {
                case "Bike":
                    if (this.between(bikeDates, act.time)){
                        panes["Bike"] += act.distance
                        panesElevation["Bike"] += this.getElevation(act.elevation)
                        panesTime["Bike"] += act.elapse_time
                        let day = this.getDay(act.time)
                        dayCountRide[day] += 1
                    }
                    break;
                case "Run":
                    if (this.between(runDates, act.time)) {
                        panes["Run"] += act.distance
                        panesElevation["Run"] += this.getElevation(act.elevation)
                        panesTime["Run"] += act.elapse_time
                        let day = this.getDay(act.time)
                        dayCountRun[day] += 1
                    }
                    break;
                case "Swim":
                        panes["Swim"] += act.distance
                        // panesElevation["Bike"] += this.getElevation(act.elevation)
                    break;
            };
        })

        return [panes, panesElevation, panesTime, dayCountRide, dayCountRun, dayCountSwim]
    }

    render(){
        let allPanes = this.makePanes()
        const panes = allPanes[0]
        const panesElevation = allPanes[1]
        const panesTime = allPanes[2]
        const pane = panes[this.state.selectedPane];
        const dayCountRide = allPanes[3]
        const dayCountRun = allPanes[4]
        const dayCountSwim = allPanes[5]
        
        //this code is so undry - future me please clean this up..
        const dataRide = Object.keys(dayCountRide).map(key => {
            
            return ({ day: key, amt: dayCountRide[key] })
        })
        const dataRun = Object.keys(dayCountRun).map(key => {

            return ({ day: key, amt: dayCountRun[key] })
        })

        const dataSwim = Object.keys(dayCountSwim).map(key => {

            return ({ day: key, amt: dayCountSwim[key] })
        })
        return (
            <div className="recent-activity-tab">

                <div className="week-stats">
                        <Headers
                            selectedPane={this.state.selectedPane}
                            onTabChosen={this.selectTab}
                            panes={panes}>
                        </Headers>

                        <div className='tab-content'>
                            <h1>THIS WEEK</h1>
                            
                            <article>
                            {Math.floor(panes[this.state.selectedPane])} {this.state.selectedPane === "Swim" ? "yd" : "mi"}
                            </article>

                            
                            {this.state.selectedPane === "Bike" ?
                            <div id="recent-activity-chart">
                                <BarChart width={150} height={40} data={dataRide}>
                                <Bar dataKey="amt" fill="#79d7bd"  />
                                </BarChart>
                                <section>
                                <span>M</span><span>T</span>
                                <span>W</span><span>T</span>
                                <span>F</span><span>S</span><span>S</span>
                                </section>
                            </div>

                            : this.state.selectedPane === "Run" ?
                            <div id="recent-activity-chart">
                                <BarChart width={150} height={40} data={dataRun}>
                                    <Bar dataKey="amt" fill="#79d7bd" />
                                </BarChart>
                                <section>
                                    <span>M</span><span>T</span>
                                    <span>W</span><span>T</span>
                                    <span>F</span><span>S</span><span>S</span>
                                </section>
                            </div>

                            :
                                <div id="recent-activity-chart">
                                    <BarChart width={150} height={40} data={dataSwim}>
                                        <Bar dataKey="amt" fill="#79d7bd" />
                                    </BarChart>
                                    <section>
                                        <span>M</span><span>T</span>
                                        <span>W</span><span>T</span>
                                        <span>F</span><span>S</span><span>S</span>
                                    </section>
                                </div>


                            }

                            

                            <section>
                                <p>{Math.floor(panesElevation[this.state.selectedPane])} ft</p>
                                <div id="short-border-right"></div>
                                <p>{this.getElapseTime(panesTime[this.state.selectedPane])}</p>
                            </section>

                            

                            {this.state.selectedPane === "Bike" ?
                            <img src={window.images.bike_icon_circle} alt=""/> :
                            this.state.selectedPane === "Run"  ? 
                            <img src={window.images.run_icon_circle} alt="" /> :
                            <img src={window.images.swim_icon_circle} alt="" />
                            }

                            
                        
                        </div>

                   

                        
                   

                </div>
            
            </div>
        )

    }
};

