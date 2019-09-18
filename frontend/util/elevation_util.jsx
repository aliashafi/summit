
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