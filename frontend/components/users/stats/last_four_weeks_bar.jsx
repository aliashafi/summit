import React from 'react'
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from 'recharts';

const renderCustomizedLabel = (props) => {
    const {
        x, y, width, height, value,
    } = props;
    const radius = 10;

    return (
        <g>
            <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#8884d8" />
            <text x={x + width / 2} y={y - radius} fill="#666" textAnchor="middle" dominantBaseline="middle">
                {value}
            </text>
        </g>
    );
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

    render(){

        let data = this.getActivityHours(this.props.data)
        return(
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
                        {/* <LabelList dataKey="count" content={renderCustomizedLabel}/> */}
                    </Bar>
                    {/* <Bar dataKey="week" stackId="a" fill="#82ca9d" /> */}
                </BarChart>
            </div>
        )
    }
}

export default LastFourWeeksBar;