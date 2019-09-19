
export const getElevationPerMile = (elevation_coords, total_distance) => {
    let elevationArr = JSON.parse(elevation_coords)
    let elevationArrLen = elevationArr.length
    let distByEle = total_distance/elevationArrLen
    let int = 0;

    let num = Math.floor((Math.round(elevationArr.length)) / 100)
    let inetervalDeterminer = 5
    
    if (distByEle * elevationArr.length > 40) {
        inetervalDeterminer = 10;
    }
    
    if (distByEle * elevationArr.length < 20){
        inetervalDeterminer = 1;
    }
    const data = []
    for (let i = 0; i < elevationArr.length; i = i+50) {
        if (Math.floor(i * distByEle) === inetervalDeterminer) int = i;
        data.push({
            ele: (Math.round(elevationArr[i] * 3.281 *100) / 100), 
            dist: Math.round((distByEle * i) * 100) / 100,
            idx: i
        })
    }

    return [data, (int / 100)]

    
}


export const getSplits = (time, totalDis, elevation) => {
    let elevationArr = JSON.parse(elevation)
    let timeStamps = JSON.parse(time)
    let timeStampsLength = timeStamps.length
    let distanceByTimestamps = totalDis / timeStampsLength

    var interval = Math.floor(1 / distanceByTimestamps)
    var splits= {}
    var lastTime = new Date(timeStamps[0])
    var lastEle = elevationArr[0]
    var mileCount = 1

    for (let i = interval; i < timeStamps.length; i = i + interval){
        let start = lastTime
        let end = new Date(timeStamps[i])
        
        let diffMs = (end - start);

        let splitMin = ( (diffMs % 86400000) % 3600000) / 60000
        
        let splitSec = (splitMin - Math.floor(splitMin)) * 60
    
        let eleDiff = Math.floor(elevationArr[i] - lastEle) * 100 / 100

        splitSec = Math.round(splitSec * 100) / 100
        splits[mileCount] = {split: `${Math.floor(splitMin)}:${splitSec}`, elevation: eleDiff, interval: [(i - interval), i]}
        
        lastTime = end
        lastEle = elevationArr[i]
        mileCount += 1
    }
    return splits
}
