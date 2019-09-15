import React from 'react'
import { Link, withRouter } from 'react-router-dom'


class ActivityMap extends React.Component {

    constructor(props) {
        super(props);
        this.route = Object.values(JSON.parse(this.props.activity.coordinates));
        this.state = {
            map: "",
            routeLine: []
        }
        this.handleClick = this.handleClick.bind(this)
        
    
    }

    ///the below is taken from mapbox api

    getElevation(lat, lng) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXNoYWZpIiwiYSI6ImNqenEzM3E5cDBjbzAzbW1wOGRic2huZTcifQ.P364O3bVxYCXn6iPnx3BLg';
        var query = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2/tilequery/' + lng + ',' + lat + 
                '.json?layers=contour&limit=50&access_token=' + mapboxgl.accessToken;
        $.ajax({
            method: 'GET',
            url: query,
            }).done(function (data) {
                var allFeatures = data.features;
                // console.log(allFeatures);
                var elevations = [];
                for (let i = 0; i < allFeatures.length; i++) {
                    elevations.push(allFeatures[i].properties.ele);
                }
                // console.log(elevations);
                var highestElevation = Math.max(...elevations);

                // console.log(highestElevation);
        });
    }






    componentDidMount(){
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

        const routeLine = this.route.slice(0,this.route.length-1);
        // this.setState({map: this.map, routeLine: routeLine, centerRoute: centerRoute})
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

    handleClick(){
        this.props.history.location.pathname === "/feed" ?
        this.props.history.push(`/activity/${this.props.activity.id}`) :
        ""
    }

    render() {
        return (
            <div onClick={this.handleClick} id={this.props.container}></div>
        )
    }

};

export default withRouter(ActivityMap);
