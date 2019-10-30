import React from 'react'
import RouteForm from './route_form'

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
        this.toggleSave = this.toggleSave.bind(this);

        this.state = {
            routeType: "Ride",
            distance: 0,
            elevationGain: 0,
            coords: {},
            estimatedTime: 0,
            saveRoute: false
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

    updateRoute() {
            
        // this.addRoute()
        this.removeRoute(); // overwrite any existing layers
        let data = this.draw.getAll();
        let answer = document.getElementById('calculated-line');
        let lastFeature = data.features.length - 1;
        let coords = data.features[lastFeature].geometry.coordinates;

        let newCoords = coords.join(';')
        
        this.getMatch(newCoords);
    }

    saveEstTime(time){
        this.setState({ estimatedTime: time})
    }

    getMatch(e) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXNoYWZpIiwiYSI6ImNqenEzM3E5cDBjbzAzbW1wOGRic2huZTcifQ.P364O3bVxYCXn6iPnx3BLg';
        // https://www.mapbox.com/api-documentation/#directions
        let url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + e + '?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
        let req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', url, true);
        const addRoute = this.addRoute
        const saveEstTime = this.saveEstTime
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
            // saveEstTime(duration)
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
        
        this.setState({ coords: coords })
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

    toggleSave(e){
        
        if (e.target.id === "save-button"){
            this.state.saveRoute ?
                this.setState({ saveRoute: false }) : this.setState({ saveRoute: true })
        }else if (e.target.id === "save-route"){
            return
        } else if (e.target.className === "comment-modal") {
            this.state.saveRoute ?
                this.setState({ saveRoute: false }) : this.setState({ saveRoute: true })
            return 
        }else if (e.target.form.className === "create-route-form"){
            return 
        }
        
        
    }
    


    render(){
        
        
        return(
            <div className="container">
                <div id="map" class="top"></div>
                {/* <div className="create-route-nav"> */}

                {/* <div id="ride-run-icons"> */}
                <div id="icon-type">
                    <span onClick={() => this.toggleType("Run")}>
                            <img src={window.images.running_icon} alt=""/>
                            <p>Run</p>
                        </span>
                        <span onClick={() => this.toggleType("Ride")}>
                            <img src={window.images.biking_icon} alt="" />
                            <p>Ride</p>
                        </span>
                    </div>
                        <div 
                        onClick={(e) => this.toggleSave(e)}
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

                {this.state.saveRoute ? 
                <div onClick={this.toggleSave} className="comment-modal">
                <RouteForm 
                    coordinates={this.state.coords}
                    createRoute={this.props.createRoute}
                    currentUser={this.props.currentUser}/>
                </div>
                : ""}
            </div>
        )
    }
    
}

export default RouteCreate;