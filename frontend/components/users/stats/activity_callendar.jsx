import React from 'react';
import LastFourWeeksBar from './last_four_weeks_bar'

class ActivityCallendar extends React.Component {

    getDay(dateTime) {
        let date = new Date(dateTime)
        return date.getDay()
    }

    addDays(time, d) {
        let test = time;
        test.setTime(test.getTime() + (d * 24 * 60 * 60 * 1000));
        return test;
    }

    subtractDays(time, d) {
        let test = time;
        test.setTime(test.getTime() - (d * 24 * 60 * 60 * 1000));
        return test;
    }

    between(dates, currentDate) {
        let current = new Date(currentDate)
        if ((current >= dates[0]) && (current <= dates[1])) {
            return true;
        } else {
            return false;
        }
    }

    getWeekBounds(day) {
        let start = day;
        let copy = `${start}`
        let end = this.addDays(start, 7)
        let newEnd = new Date(copy)
        return [newEnd, end]
    }


    weekOneBounds(){
        let currentDate = this.props.bounds[0];
        let currentStartDateCopy = `${currentDate}`

        let currentEndDateCopy = new Date(currentStartDateCopy)


        let weekDay = currentDate.getDay()
        let daysLeft = (8 - weekDay)
        
        let start = this.subtractDays(currentDate, weekDay)
        let end = this.addDays(currentEndDateCopy,daysLeft)

        return [start, end]
    }

    getWeekIntensities(bounds){        
        let activities = this.props.activities.filter(activity => (
            this.between(bounds, activity.time)
        ))

        let intensities = { 0: [0,0], 1: [0,0] , 2: [0,0], 3: [0,0], 4: [0,0], 5: [0,0], 6: [0,0], 7: [0,0] }
        activities.forEach(act => {
            let date = new Date(act.time).getDate()
            let day = this.getDay(act.time)
            intensities[day][0] += act.elapse_time
            intensities[day][1] = date
        })


        return intensities
        
    }


    getAllIntensities(){
        let intensityMap = {}
        let week = 0
        let bounds = []
        while (week < 4){
            if (week === 0){
                bounds = this.weekOneBounds()
                intensityMap[week] = this.getWeekIntensities(bounds)
            }else{
                bounds = this.getWeekBounds(bounds[1])
                intensityMap[week] = this.getWeekIntensities(bounds)
            }
            
            week += 1
        }
        
        return intensityMap;
    }
    

    normalize(max, min, num){
        let step1 = (num - min)/ (max - min);
        let step2 = (30 - 5);
        return ((step1 * step2) + 5)
    }

    normalizeMap(mapI){
        let ans = []
        mapI.map(week => {
            ans =  ans.concat(Object.values(week))
        })
        ans = ans.map(el => el[0])
        let max = Math.max(...ans) 
        let min = Math.min(...ans) 

        let normalizedIntensities = []
        mapI.forEach(week => {
            let weekNorm = {}
            Object.values(week).forEach((count, day) => {
                let norm = this.normalize(max, min, count[0])
                norm = Math.floor(norm)
                weekNorm[day] = [norm, count[1]]
            })
            normalizedIntensities.push(weekNorm)
        })
        return normalizedIntensities
    }
    

    

    



    render(){
        let intensities = []
        let hourIntensities = []
        let modified = []
        if (this.props.bounds.length > 0){
            hourIntensities = Object.values(this.getAllIntensities())
            intensities = this.normalizeMap(hourIntensities)

            modified = []
            hourIntensities.forEach(obj => {
                let subObj = {}
                Object.keys(obj).forEach(key => {
                    subObj[key] = obj[key][0]
                })
                modified.push(subObj);
            })
            
        }
    return(
        <div className="activity-call-container">
            
            <table className="month-table">
                <thead>
                    <tr>
                        <th scope="col">
                            <div className="weekday">M</div>
                        </th>
                        <th scope="col">
                            <div className="weekday">T</div>
                        </th>
                        <th scope="col">
                            <div className="weekday">W</div>
                        </th>
                        <th scope="col">
                            <div className="weekday">T</div>
                        </th>
                        <th scope="col">
                            <div className="weekday">F</div>
                        </th>
                        <th scope="col">
                            <div className="weekday">S</div>
                        </th>
                        <th scope="col">
                            <div className="weekday">S</div>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {intensities.map( week => {
                        return(
                            <tr key={Math.random(4)} id="bubbles">
                                {Object.keys(week).map( day => (
                                    <td key={Math.random(5)}>
                                        <div id="bubble-container">
                                            <div id="intensity-bubble" style={{ width: week[day][0], height: week[day][0] }}>
                                                <p id="hidden-date">{week[day][1]}</p>
                                            </div>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        )
                    }
                    )}
            
                </tbody>
            </table>

            <LastFourWeeksBar data={modified} activities={this.props.activities}/>
        </div>
    )
    }
}

export default ActivityCallendar;