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
            route: [],
            splitHover: [] 
        }

        this.currentSegment = this.currentSegment.bind(this);
        this.toggleSeg = this.toggleSeg.bind(this)

    }

    componentDidUpdate(){

        if (this.state.map.getSource("point")) this.moveDot();
       
    }

    currentSegment(mile){
        let bounds = this.props.splits[mile].interval
        let segment = this.route.slice(bounds[0], bounds[1])

        let geojson = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": segment
            }
        };
        
        this.state.map.getSource('segment').setData(geojson)
        // this.toggleSeg()
    }

    toggleSeg() {

        let geojson = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": []
            }
        };

        this.state.map.getSource('segment').setData(geojson)

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
            style: 'mapbox://styles/aliashafi/ck0plinho0l7p1co4uxrfikvs',
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

            map.addLayer({
                "id": "segment",
                "type": "line",
                "zoom": 11,
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": {
                            "type": "LineString",
                            "coordinates": []
                        }
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#3887be",
                    "line-width": 5
                }
            });

            map.addSource('point', {
                "type": "geojson",
                "data": geojson
            })

            map.addLayer({
                "id": "point1",
                "type": "circle",
                "source": "point",
                "paint": {
                    "circle-radius": 8,
                    "circle-color": "#ffffff",
                }
            });

            map.addLayer({
                "id": "point",
                "type": "circle",
                "source": "point",
                "paint": {
                    "circle-radius": 6,
                    "circle-color": "#3887be",
                }
            });
           
            
            geojson.features[0].geometry.coordinates = routeLine[100];

        })
        


        this.setState({map: this.map, geojson: geojson, route: routeLine})

    };

    render() {
        const splits = this.props.splits
        return (
            <div>

            <div id="splits-show-map">
                    {this.props.activity.activity_type === "Run" ?
                    <section>
                    <h1>Splits</h1>
                    <table className="table-splits">
                        <thead>
                            <tr>
                                <th>Mile</th>
                                <th>Split</th>
                                <th>Elevation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(splits).map(mile => {
                                return (<tr key={mile} onMouseOver={() => this.currentSegment(mile)} onMouseOut={this.toggleSeg}>
                                    <td>{mile}</td>
                                    <td>{splits[mile].split}</td>
                                    <td>{splits[mile].elevation}</td>
                                </tr>)
                            })}
                        </tbody>

                    </table>
                    </section>
                    : ""}
            
                <div id={this.props.container}></div>
                    

                </div>


                <div className="ele-graph">
                    <AreaChart
                        width={1000}
                        height={200}
                        data={this.props.data}
                        syncId="anyId"
                        margin={{
                            top: 10, right: 30, left: 0, bottom: 0,
                        }}
                        
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="dist" interval={this.props.interval} unit="mi"/>
                        <YAxis unit="ft"/>
                        <Tooltip content={<CustomTooltipContainer />} position={{ y: 20 }} isAnimationActive={false} stroke="#3887be"
                            />
                        <Area name="elevation (ft)" type="monotone" dataKey="ele" fill="#666" stroke="#666" 
                            activeDot={{ r: 8, color:"#3887be"}} />
                    </AreaChart>
                </div>
            </div>
        )
    }

};

export default withRouter(ActivityShowMap);
