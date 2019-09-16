import React from 'react'

// https://blog.mapbox.com/map-hacks-directions-api-draw-tools-7557134622e9
// this component was generated with help from this article

class RouteCreate extends React.Component{
    constructor(props){
        super(props)
        this.updateRoute = this.updateRoute.bind(this)
        this.removeRoute = this.removeRoute.bind(this)
        this.addRoute = this.addRoute.bind(this)

        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXNoYWZpIiwiYSI6ImNqenEzM3E5cDBjbzAzbW1wOGRic2huZTcifQ.P364O3bVxYCXn6iPnx3BLg';
        this.geocoder = new MapboxGeocoder({ // Initialize the geocoder
            accessToken: mapboxgl.accessToken, // Set the access token
            mapboxgl: mapboxgl, // Set the mapbox-gl instance
            marker: false, // Do not use the default marker style
        });
        this.map = {}
        this.draw = {}
        this.toggleType = this.toggleType.bind(this);
        this.testing = this.testing.bind(this)

        this.state = {
            routeType: "Ride",
            distance: 0,
            elevationGain: 0,
            coords: {},
            
        }
    }

    componentDidMount(){
        
    this.map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v9', //hosted style id
        center: [-122.401295, 37.798984], // starting position
        zoom: 13, // starting zoom
        
        });
        let map = this.map;
        let geocoder = this.geocoder
        this.map.on('load', function () {
            map.addSource('single-point', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: []
                }
            });

            map.addLayer({
                id: 'point',
                source: 'single-point',
                type: 'circle',
                paint: {
                    'circle-radius': 10,
                    'circle-color': '#448ee4'
                }
            });

            // Listen for the `result` event from the Geocoder
            // `result` event is triggered when a user makes a selection
            //  Add a marker at the result's coordinates
            geocoder.on('result', function (e) {
                map.getSource('single-point').setData(e.result.geometry);
            });
        });
       
        this.drawMap()
        
    }

    toggleType(activityType){
        this.setState({ routeType: activityType})
    }

    drawMap(){
        
        let geocoder = this.geocoder
        this.draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                line_string: true,
                trash: true
            },
            styles: [
                {
                    "id": "gl-draw-line",
                    "type": "line", //change this to "line" if you want to see something
                    "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#3b9ddd",
                        "line-dasharray": [0.2, 2],
                        "line-width": 4,
                        "line-opacity": 0
                    }
                },
                {
                    "id": "gl-draw-polygon-and-line-vertex-halo-active",
                    "type": "circle",
                    "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                    "paint": {
                        "circle-radius": 10,
                        "circle-color": "#FFF"
                    }
                },
                {
                    "id": "gl-draw-polygon-and-line-vertex-active",
                    "type": "circle",
                    "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
                    "paint": {
                        "circle-radius": 6,
                        "circle-color": "#3b9ddd",
                    }
                },
            ]
        });
        

        this.map.addControl(geocoder);
        this.map.addControl(this.draw);
        this.map.on('draw.create', this.updateRoute);
        this.map.on('draw.update', this.updateRoute);
        this.map.on('draw.delete', this.removeRoute);
        this.map.on("click", this.updateRoute);
    }

    testing(){
        console.log("hello")
    }

    updateRoute() {
            
        // this.addRoute()
        this.removeRoute(); // overwrite any existing layers
        let data = this.draw.getAll();
        let answer = document.getElementById('calculated-line');
        let lastFeature = data.features.length - 1;
        let coords = data.features[lastFeature].geometry.coordinates;

        let newCoords = coords.join(';')
        this.setState({coords: newCoords})
        this.getMatch(newCoords);
    }

    getMatch(e) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXNoYWZpIiwiYSI6ImNqenEzM3E5cDBjbzAzbW1wOGRic2huZTcifQ.P364O3bVxYCXn6iPnx3BLg';
        // https://www.mapbox.com/api-documentation/#directions
        let url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + e + '?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', url, true);
        const addRoute = this.addRoute
        req.onload = function () {
            let jsonResponse = req.response;
            let distance = jsonResponse.routes[0].distance * 0.001; // convert to km
            let duration = jsonResponse.routes[0].duration / 60; // convert to minutes
            // add results to info box
            document.getElementById('calculated-line').innerHTML = distance.toFixed(2)
            document.getElementById('calculated-line-ele').innerHTML = duration.toFixed(2)
                // + ' km<br>Duration: ' + duration.toFixed(2) + ' minutes';
            let coords = jsonResponse.routes[0].geometry;
            // add the route to the map
            addRoute(coords);
        };
        req.send();
    }

    addRoute(coords) {
        if (this.map.getSource('route')) {
            this.map.removeLayer('route')
            this.map.removeSource('route')
            
        } else {
            this.map.addLayer({
                "id": "route",
                "type": "line",
                "source": {
                    "type": "geojson",
                    "data": {
                        "type": "Feature",
                        "properties": {},
                        "geometry": coords
                    }
                },
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#3b9ddd",
                    "line-width": 8,
                    "line-opacity": 0.8
                }
            });
        };
    }

    removeRoute() {
        if (this.map.getSource('route')) {
            this.map.removeLayer('route');
            this.map.removeSource('route');
            document.getElementById('calculated-line').innerHTML = '';
        } else {
            return;
        }
    }

    


    render(){
        
        
        return(
            <div className="container">
                <div id="map"></div>
                {/* <div className="create-route-nav"> */}
                    {/* <div onClick={() => this.toggleType("Run")} id="icon-type">
                        <img src={window.images.running_icon} alt=""/>
                        <p>Run</p>
                    </div>

                    <div onClick={() => this.toggleType("Ride")} id="icon-type">
                        <img src={window.images.biking_icon} alt="" />
                        <p>Ride</p>
                    </div> */}
                    {/* <div>Test</div> */}
                        <div 
                            id="save-button">
                                Save Route</div>
                    
                {/* </div> */}
                <div className='info-box'>
                    
                    <div id="route-type-1"> 
                        {this.state.routeType} 
                        <p>Route Type</p>
                    </div>

                    <div id="route-type">
                        <span id="calculated-line-ele">0 </span> min
                        <p>Duration</p>
                    </div>

                    <div id="route-type">
                        <span id="calculated-line"> 0 </span> mi
                        <p>Distance</p>
                    </div>

                    

                </div>
            </div>
        )
    }
    
}

export default RouteCreate;