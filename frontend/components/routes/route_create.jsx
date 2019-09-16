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
        this.map = {}
        this.draw = {}
    }

    componentDidMount(){
        
        this.map = new mapboxgl.Map({
            container: 'map', // container id
            style: 'mapbox://styles/mapbox/streets-v9', //hosted style id
            center: [-122.401295, 37.798984], // starting position
            zoom: 13, // starting zoom
        });
        this.drawMap()
        
    }


    drawMap(){
        this.draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                line_string: true,
                trash: true
            },
            styles: [
                {
                    "id": "gl-draw-line",
                    "type": "line",
                    "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
                    "layout": {
                        "line-cap": "round",
                        "line-join": "round"
                    },
                    "paint": {
                        "line-color": "#3b9ddd",
                        "line-dasharray": [0.2, 2],
                        "line-width": 4,
                        "line-opacity": 0.7
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
        this.map.addControl(this.draw);
        this.map.on('draw.create', this.updateRoute);
        this.map.on('draw.update', this.updateRoute);
        this.map.on('draw.delete', this.removeRoute);
    }


    updateRoute() {
        this.removeRoute(); // overwrite any existing layers
        var data = this.draw.getAll();
        var answer = document.getElementById('calculated-line');
        var lastFeature = data.features.length - 1;
        var coords = data.features[lastFeature].geometry.coordinates;
        var newCoords = coords.join(';')
        this.getMatch(newCoords);
    }

    getMatch(e) {
        mapboxgl.accessToken = 'pk.eyJ1IjoiYWxpYXNoYWZpIiwiYSI6ImNqenEzM3E5cDBjbzAzbW1wOGRic2huZTcifQ.P364O3bVxYCXn6iPnx3BLg';
        // https://www.mapbox.com/api-documentation/#directions
        var url = 'https://api.mapbox.com/directions/v5/mapbox/cycling/' + e + '?geometries=geojson&steps=true&&access_token=' + mapboxgl.accessToken;
        var req = new XMLHttpRequest();
        req.responseType = 'json';
        req.open('GET', url, true);
        const addRoute = this.addRoute
        req.onload = function () {
            var jsonResponse = req.response;
            var distance = jsonResponse.routes[0].distance * 0.001; // convert to km
            var duration = jsonResponse.routes[0].duration / 60; // convert to minutes
            // add results to info box
            document.getElementById('calculated-line').innerHTML = 'Distance: ' + distance.toFixed(2) + ' km<br>Duration: ' + duration.toFixed(2) + ' minutes';
            var coords = jsonResponse.routes[0].geometry;
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
        console.log(coords)
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
            <div>
                <div id="map"></div>
                <div className='info-box'>
                    <p>Draw your route using the draw tools (25 points max)</p>
                    <div id='calculated-line'></div>
                </div>
            </div>
        )
    }
    
}

export default RouteCreate;