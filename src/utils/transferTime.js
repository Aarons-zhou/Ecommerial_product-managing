/*
    接收Date实例,或时间戳,返回标准（自定义）的时间表示
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

export default function transferTime(time) {
    //接收Date实例
    if (time instanceof Date) {
        return getTime(time)
    }
    //接收时间戳
    else if (/\d{13}/.test(time)) {
        return getTime(new Date(time))
    }
}