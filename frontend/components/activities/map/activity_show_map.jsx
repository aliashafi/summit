import React from 'react'
import { withRouter } from 'react-router-dom'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area
} from 'recharts';
import CustomTooltipContainer from './custom_tool_tip_container'








class ActivityShowMap extends React.Component {

    constructor(props) {
        super(props);
        this.route = Object.values(JSON.parse(this.props.activity.coordinates));
        this.state = {
            geojson: {},
            map: "",
            route: []
        }


    }

    componentDidUpdate(){

        if (this.state.map.getSource("point")) this.moveDot();
       
    }



    moveDot(){
        let geojson = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": this.state.route[this.props.ui[0]]
                }
            }]
        };
       this.state.map.getSource('point').setData(geojson)
    }

    componentDidMount() {
        
        const dupRoute = this.route.slice()
        const zoom = this.route.length < 5000 ? 12 : 10

        const centerRoute = dupRoute.sort()[Math.floor(this.route.length / 2)]
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXNoYWZpIiwiYSI6ImNqenEzM3E5cDBjbzAzbW1wOGRic2huZTcifQ.P364O3bVxYCXn6iPnx3BLg';
        this.map = new mapboxgl.Map({
            container: this.props.container,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: centerRoute, //this is the center
            zoom: zoom,
            interactive: this.props.interactive
        });

        const routeLine = this.route.slice(0, this.route.length - 1);
        // this.setState({map: this.map, routeLine: routeLine, centerRoute: centerRoute})
        // last datapoint is not correct... check to see if this is the case for all


        ///for animated point
        let geojson = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": routeLine[5]
                }
            }]
        };

        this.geojson = geojson;

        ///create map
        let map = this.map;

        map.on('load', function () {
            map.addLayer({
                "id": "route",
                "type": "line",
                "zoom": 11,
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": routeLine.slice(5)
                        }
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#e64539",
                    "line-width": 2
                }
            });

            map.addSource('point', {
                "type": "geojson",
                "data": geojson
            })

            map.addLayer({
                "id": "point",
                "type": "circle",
                "source": "point",
                "paint": {
                    "circle-radius": 10,
                    "circle-color": "#3887be"
                }
            });
            
            geojson.features[0].geometry.coordinates = routeLine[100];

        })
        


        this.setState({map: this.map, geojson: geojson, route: routeLine})

    };

    render() {
        return (
            <div>
            <div id={this.props.container}>

            </div>
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
                        <XAxis dataKey="dist" interval={this.props.interval} />
                        <YAxis />
                        <Tooltip content={<CustomTooltipContainer />} position={{ y: 20 }} isAnimationActive={false} />
                        <Area name="elevation (ft)" type="monotone" dataKey="ele" stroke="#D9D9D9" fill="#D9D9D9" activeDot={{ r: 8 }} />
                    </AreaChart>
                </div>
            </div>
        )
    }

};

export default withRouter(ActivityShowMap);
