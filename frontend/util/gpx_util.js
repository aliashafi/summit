
export const calculateElevationGain = (ele) =>{
    let gain = 0;
    for (let i = 1; i < ele.length - 1; i++) {
        if (ele[i] < ele[i + 1]){
            gain += (ele[i + 1] - ele[i])
        }
    }
    gain = gain * 3.281


    return gain

}


