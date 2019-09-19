import React from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';


class BarChart extends React.Component {

    render() {
        const data = Object.keys(this.props.data).map( key => {
            return {day: key, amt: this.props.data[key]}
        })
        return (
            <div>
            <BarChart width={150} height={40} data={data}>
                <Bar dataKey="date" fill="#8884d8" />
            </BarChart>
            </div>
        );
    }
}


export default BarChart;