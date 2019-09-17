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

    test(){
        
        document.getElementById("current-elevation")
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
        

        ///create map
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
