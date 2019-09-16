import React from 'react'
import {withRouter} from 'react-router-dom';


class RouteForm extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: "",
            description: "",
            routeType: "Ride"
        }
        this.handleSubmit = this.handleSubmit.bind(this)
            
    }

    handleChange(filter) {
            return (e) => this.setState({ [filter]: e.target.value })
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.createRoute(this.props.currentUser.id,{ 
            title: this.state.title, 
            description: this.state.description,
            route_type: this.state.routeType,
            user_id: this.props.currentUser.id,
            coordinates: this.props.coordinates
        }).then(() => this.props.history.push("/feed"))
    }

    render(){
        return(

                <div className="create-route-form-container">
                    <h1>Save</h1>
                    <p>Enter a name and description for your route below.</p>
                    <form className="create-route-form" onSubmit={this.handleSubmit}>

                        <label>Type
                            <select onChange={this.handleChange("routeType")}>
                                <option value="Ride">Ride</option>
                                <option value="Run">Run</option>
                            </select>
                        </label>

                        <label>Route Name (required)
                        <input 
                            type="text" 
                            value={this.state.title} 
                            onChange={this.handleChange("title")}
                            />
                        </label>

                        

                        <label>Description
                        <textarea 
                            value={this.state.description}
                            onChange={this.handleChange("description")}
                            />
                        </label>

                        <input
                            type="submit"
                            id="save-route"
                            value="Save">
                        </input>
                    </form>
                </div>
        )
    }


}

export default withRouter(RouteForm);


