export const ytUrlParse = (url: string) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    var match = url.match(regExp)
    if (match && match[7].length == 11) return match[7]
    else return false
}

export const cnvrtStrToSecond = (str: string) => {
    const time = str.split(":").map((v) => Number(v))
    if (Number.isNaN(time.find((v) => Number.isNaN(v)))) return null
    if (time.length == 2) {
        return time[0] * 60 + time[1]
    } else if (time.length == 3) {
        return time[0] * 3600 + time[1] * 60 + time[0]
    } else {
        return null
    }
}