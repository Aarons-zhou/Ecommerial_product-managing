/*
    时间转换
*/
const transfer = number => {
    return number < 10 ? '0' + number : '' + number
}

const getTime = dateInstance => {
    const year = dateInstance.getFullYear()
    const month = dateInstance.getMonth() + 1
    const date = dateInstance.getDate()
    const hour = dateInstance.getHours()
    const minute = dateInstance.getMinutes()
    const second = dateInstance.getSeconds()
    return [year,month,date].map(transfer).join('-') + ' ' + [hour,minute,second].map(transfer).join(':')
}

//接收Date实例,或时间戳,返回标准（自定义）的时间表示
export const transferTime = time => {
    //接收Date实例
    if (time instanceof Date) {
        return getTime(time)
    }
    //接收时间戳
    else if (/\d{13}/.test(time)) {
        return getTime(new Date(time))
    }
}

//修正服务器时间
export const putServerTime = time => {
    if(time){
        const errTime = new Date(time).getTime()
        const correctTime = errTime + 46800000
        return getTime(new Date(correctTime))
    }else return ''
}
