import React from 'React'
import {withRouter} from 'react-router-dom'


class ActivityIndexItem extends React.Component {

    constructor(props) {
        super(props)
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXNoYWZpIiwiYSI6ImNqenEzM3E5cDBjbzAzbW1wOGRic2huZTcifQ.P364O3bVxYCXn6iPnx3BLg';
        this.route = Object.values(JSON.parse(this.props.activity.coordinates))
        const centerRoute = this.route[Math.floor(this.route.length / 2)]
        this.map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: centerRoute, //this is the center
            zoom: 12
        });
        
        
        
    }


    componentDidMount(){
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
            <div>
            
            </div>
        )
    }

};

export default withRouter(ActivityIndexItem);