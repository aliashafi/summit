export const formatDate = date => {
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    };
    const daysOfWeek = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
    };


    let dateString = ""
    const newDate = date.split("T");
    const ymd = newDate[0].split("-");
    const year = ymd[0];
    const month = parseInt(ymd[1]);
    const day = parseInt(ymd[2]);
    const time = newDate[1].split(':')
    console.log(day)
    let firstTime = parseInt(time[0])
    let secTime = parseInt(time[1])

    if (firstTime > 24){
        firstTime = firstTime - 12
    }


    
    return `${daysOfWeek[day]} ${months[month]} ${day} ${year} ${firstTime - 12}:${secTime}` 


}