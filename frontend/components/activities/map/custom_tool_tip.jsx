import React from 'react'

class CustomTooltip extends React.Component {

    componentDidUpdate(prevProps){
        if (prevProps.payload.length !== 0 && this.props.payload.length !== 0){
            
            if(prevProps.payload[0].payload.idx !== this.props.payload[0].payload.idx){
                this.props.receiveCoordinate([this.props.payload[0].payload.idx])
            }
        }

    }

    render() {

        if (this.props.active) {
            return (
                <div className="custom-tooltip">
                    <p id="current-elevation">{`elevation : ${this.props.payload[0].value} ft`}</p>
                    <p className="miles">{`miles : ${this.props.label} mi`}</p>
                </div>
            );
        }

        return null;
    }
};

export default CustomTooltip;