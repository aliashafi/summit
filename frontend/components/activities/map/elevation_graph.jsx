import React from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
} from 'recharts';

const CustomTooltip = ({ active, payload, label, coordinate }) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p id="current-elevation">{`elevation : ${payload[0].value} ft`}</p>
                <p className="miles">{`miles : ${label} mi`}</p>
            </div>
        );
    }

    return null;
};

class ElevationGraph extends React.Component {


    constructor(props) {
        super(props)

    }
        

    render() {
        
        
       return(
           <div className="ele-graph">
               <AreaChart
                   width={1000}
                   height={300}
                   data={this.props.data}
                   syncId="anyId"
                   margin={{
                       top: 10, right: 30, left: 0, bottom: 0,
                   }}
               >
                   <CartesianGrid strokeDasharray="3 3" />
                   <XAxis dataKey="dist" interval={this.props.interval}/>
                   <YAxis />
                   <Tooltip content={<CustomTooltip />} position={{ y: 20 }} isAnimationActive={false}  />
                   <Area name="elevation (ft)" type="monotone" dataKey="ele" stroke="#D9D9D9" fill="#D9D9D9" activeDot={{ r: 8}}/>
               </AreaChart>
           </div>
       );
  }


}

export default ElevationGraph;