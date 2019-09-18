
export const getElevationPerMile = (elevation_coords, total_distance) => {
    let elevationArr = JSON.parse(elevation_coords)
    let elevationArrLen = elevationArr.length
    let distByEle = total_distance/elevationArrLen
    let int = 0;

    const data = []
    for (let i = 0; i < elevationArr.length; i = i+100) {
        if (Math.floor(i * distByEle) === 1) int = i;
        data.push({
            ele: (Math.round(elevationArr[i] * 3.281 *100) / 100), 
            dist: Math.round((distByEle * i) * 100) / 100,
            idx: i
        })
    }

    return [data, 10]

    
}