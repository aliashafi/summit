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
        
        let zoom = this.route.length < 5000 ? 12 : 10

        if (this.props.custom) {
            zoom = 9;
        }

        const centerRoute = dupRoute.sort()[Math.floor(this.route.length / 2)]
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXNoYWZpIiwiYSI6ImNqenEzM3E5cDBjbzAzbW1wOGRic2huZTcifQ.P364O3bVxYCXn6iPnx3BLg';
        this.map = new mapboxgl.Map({
            container: this.props.container,
            // style: 'mapbox://styles/mapbox/streets-v11',
            style: 'mapbox://styles/aliashafi/ck0plinho0l7p1co4uxrfikvs',
            center: centerRoute, //this is the center
            zoom: zoom,
            interactive: this.props.interactive
        });

        const routeLine = this.route.slice(0,this.route.length-1);
        // this.setState({map: this.map, routeLine: routeLine, centerRoute: centerRoute})
        // last datapoint is not correct... check to see if this is the case for all

    
        

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
