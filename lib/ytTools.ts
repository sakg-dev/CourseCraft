export const ytUrlParse = (url: string) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
    var match = url.match(regExp)
    if (match && match[7].length == 11) return match[7]
    else return false
}

export const cnvrtStrToSecond = (str: string) => {
    const [hr, min, sec] = str.split(":").map((v) => Number(v))
    return hr * 3600 + min * 60 + sec
}