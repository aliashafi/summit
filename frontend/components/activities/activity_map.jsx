import React from 'React'
import {withRouter} from 'react-router-dom'


class ActivityMap extends React.Component {

    constructor(props) {
        super(props)
        this.route = Object.values(JSON.parse(this.props.activity.coordinates))
        
        
    }

    componentDidMount(){
        const dupRoute = this.route.slice()

        const centerRoute = dupRoute.sort()[Math.floor(this.route.length / 2)]
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXNoYWZpIiwiYSI6ImNqenEzM3E5cDBjbzAzbW1wOGRic2huZTcifQ.P364O3bVxYCXn6iPnx3BLg';
        this.map = new mapboxgl.Map({
            container: `map-${this.props.activity.id}`,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: centerRoute, //this is the center
            zoom: 12
        });
        const routeLine = this.route.slice(0,this.route.length-1);
        // last datapoint is not correct... check to see if this is the case for all
        
        let map = this.map;
        map.on('load', function() {
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
        })
    
    };

    render() {

        return (
            <div id={`map-${this.props.activity.id}`}></div>
        )
    }

};

export default withRouter(ActivityMap);