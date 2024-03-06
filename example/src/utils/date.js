export function getDateTime(currentDate){

    if(!currentDate) return "Invalid Date"

    currentDate = new Date(currentDate)

    const date = currentDate.getDate()
    const mon = currentDate.getMonth()
    const year = currentDate.getFullYear()

    const ss = currentDate.getSeconds()
    const mm = currentDate.getMinutes()
    let hh = currentDate.getHours()
    let merdian = "AM"
    if(hh > 13){
        merdian = "PM"
        hh = hh - 12
    }

    return  `${padTwo(date)}-${padTwo(mon)}-${padTwo(year)} ${padTwo(hh)}:${padTwo(mm)}:${padTwo(ss)} ${merdian}`
}

export function padTwo(num){
    return String(num).padStart(2, "00")
}