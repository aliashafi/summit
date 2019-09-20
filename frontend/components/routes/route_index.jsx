import React from 'react'
import ActivityMap from '../activities/map/activity_map'


class RouteIndex extends React.Component{

    componentDidMount(){
        
        this.props.fetchAllRoutes(this.props.currentUser.id);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.history.push("/routes/create") 
    }
    

    render(){
        let user = {}
        let routes = Object.values(this.props.routes)
        let allRoutes = []

        if (routes.length !== 0){
            // user = this.props.users[this.props.currentUser.id]
            // routes = user.route_ids.map(route => this.props.routes[route])
            
            
            allRoutes = routes.map(route => {
                if (route){
               return ( 
                <div key={route.id * 5} className="custom-route-details-map">
               <ActivityMap
                    key={route.id}
                    activity={route}
                    user={user}
                    interactive={false}
                    container={`map-custom-${route.id}`}
                    custom={true}
                />

                    <div key={route.id * 2} id="custom-route-details">
                        <p key={route.id * 3}>{route.title}</p>
                        <p key={route.id * 4}>{route.route_type}</p>
                    </div>
                </div>
                
                )
            }})
        }
        return(

            <div className="custom-route-page"> 
                <section>
                    <h2> My Routes</h2>

                    <div onClick={this.handleClick}
                        id="save-button">
                        Create New Route</div>
                </section>

            <div className="custom-route-container">
                {allRoutes}
            </div>
            
            </div>
            
        )
    }

}

export default RouteIndex;