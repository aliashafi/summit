import React from 'react'
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from 'recharts';

class CustomizedLabel extends React.Component{

    constructor(props){
        super(props)
    }

    getElapseTime(elapsed_time) {
        let measuredTime = new Date(null)
        measuredTime.setSeconds(elapsed_time);
        let MHSTime = measuredTime.toISOString().substr(11, 8);
        let newTime = MHSTime.slice(1).split(":")
        let displayTime = `${newTime[0]}h ${newTime[1]}m`
        return displayTime;
    }

    render() {
        const { x, y, fill, value } = this.props;
        return(
        <text id="text-chart"
            x={x}
            y={y}
            dy={-1}
            fontSize='16'
            fontFamily='sans-serif'
            fill={fill}
            >{this.getElapseTime(value)}
        </text>
        )
    }
};


class LastFourWeeksBar extends React.Component{
    constructor(props){
        super(props)

    }

    arrSum(arr) {
        return arr.reduce(function (a, b) {
            return a + b
        }, 0);
    }

    getActivityHours(intensities){
        let allWeeks = []
        intensities.forEach((count, week) => {
            let hours = {}
            hours["week"] = week
            hours["count"] = this.arrSum(Object.values(count))
            allWeeks.push(hours)
        })

        return allWeeks

    }

    getHoursAndMins(seconds){
        let mins = Math.floor(seconds / 60);
        let hours = 0;
        if (mins > 60){
            hours = Math.floor(mins / 60);
            mins = mins % 60;
        }
        if (hours > 0){
            return `${hours}h ${mins}m`
        }else{
            return `${mins}m`
        }
    }

    render(){

        let data = this.getActivityHours(this.props.data)
        let minCount = data.map(week => {
            return (<div>{this.getHoursAndMins(week.count)}</div>)
        })
        
        return(
            <div className ="chart-container">
                <div id="chart">
                    <BarChart
                        width={145}
                        height={100}
                        data={data}
                        // layout="vertical"
                        // margin={{
                        //     top: 20, right: 30, left: 20, bottom: 5,
                        // }}
                    >
                        {/* <XAxis axisLine={false}/>
                        <YAxis dataKey="week"
                            axisLine={false}/> */}

                        <Bar type="category" dataKey="count" fill="#8884d8" >
                            
                        </Bar>
                        {/* <Bar dataKey="week" stackId="a" fill="#82ca9d" /> */}
                    </BarChart>
                </div>

                <div className="weekly-count">
                    {minCount}
                </div>
            </div>
        )
    }
}

export default LastFourWeeksBar;