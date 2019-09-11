import React from 'react';

class Headers extends React.Component {
    render() {
        const selected = this.props.selectedPane;

        const headers = Object.keys(this.props.panes).map((pane, index) => {
            let path = "";
            if (pane === "Bike") path = window.images.biking_icon;
            if (pane === "Swim") path = window.images.swimming_icon;
            if (pane === "Run") path = window.images.running_icon;
            const klass = pane === selected ? 'active-tab' : '';

            return (
                
                <p
                    key={index}
                    id={klass}
                    onClick={() => this.props.onTabChosen(pane)}
                ><img src={path} /></p>
            );
        });

        return (
            <ul className='tabs'>
                {headers}
            </ul>

        );
    }
}

export default class UserFeedRecentActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPane: "Bike"
        };
        this.selectTab = this.selectTab.bind(this);
    }



    selectTab(num) {
        this.setState({ selectedPane: num });
    }

    makePanes(){
        let panes = {"Bike": 0, "Run":0, "Swim":0}
        this.props.activity.forEach(act => {
            switch (act.activity_type) {
                case "Bike":
                    panes["Bike"] += act.distance
                    break
                case "Run":
                    panes["Run"] += act.distance
                    break
                case "Swim":
                    panes["Swim"] += act.distance
                    break
            };
        })

        return panes
    }

    render(){
        const panes = this.makePanes()
        const pane = panes[this.state.selectedPane];

        return (
            <div className="recent-activity-tab">

                <div className="week-stats">
                        <Headers
                            selectedPane={this.state.selectedPane}
                            onTabChosen={this.selectTab}
                            panes={panes}>
                        </Headers>

                        <div className='tab-content'>
                            <h1>THIS WEEK</h1>
                            
                            <article>
                            {Math.floor(panes[this.state.selectedPane])} {this.state.selectedPane === "Swim" ? "yd" : "mi"}
                            </article>
                        </div>
                   

                </div>
            
            </div>
        )

    }
};

