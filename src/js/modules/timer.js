/*ТАЙМЕР*/
const timer = (id, deadline) => {
    /*ф-я вычисления оставшегося времени для таймера*/
    const getTimeRemaining = (endtime) => {
        const time = Date.parse(endtime) - Date.parse(new Date())
        const seconds = Math.floor((time / 1000) % 60)
        const minutes = Math.floor((time / 1000 / 60) % 60)
        const hours = Math.floor((time / (1000 * 60 * 60)) % 24)
        const days = Math.floor(time / (1000 * 60 * 60 * 24))
        /*эта ф-я возвращает {} со всеми необходимыми данными*/
        return {
            'total': time,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        }
    }
    /*ф-я по добавлению перед числом 0, если число меньше 10*/
    const addZero = (num) => {
        if (num <= 9) {
            return '0' + num
        } else {
            return num
        }
    }
    /*ф-я установки таймера*/
    const setClock = (selector, endtime) => {
        /*получаем таймер по селектору*/
        const timer = document.querySelector(selector)
        /*из этого таймера вычленяем его части по id*/
        const days = timer.querySelector('#days')
        const hours = timer.querySelector('#hours')
        const minutes = timer.querySelector('#minutes')
        const seconds = timer.querySelector('#seconds')
        /*через каждую секунду запускаем ф-ю updateClock*/
        const timeInterval = setInterval(updateClock, 1000)
        /*обновляем часы сразу при отрисовке страницы, чтоб на мгновение не показывались захардкоженные значения*/
        updateClock()
        /*ф-я по побновлению таймера*/
        function updateClock() {
            /*получаем высчитанный в данный момент времени объект time из ф-и getTimeRemaining*/
            const time = getTimeRemaining(endtime)
            /*из этого {} time берем его свойства и вставляем эти значения на страницу,
            предварительно добавив перед числом 0, если число меньше 10*/
            days.textContent = addZero(time.days)
            hours.textContent = addZero(time.hours)
            minutes.textContent = addZero(time.minutes)
            seconds.textContent = addZero(time.seconds)
            /*если время в таймере истекло, то устанавливаем таймер в ноль*/
            if (time.total <= 0) {
                days.textContent = '00'
                hours.textContent = '00'
                minutes.textContent = '00'
                seconds.textContent = '00'
                /*сбрасываем счетчик чтоб не запускать ф-ю updateClock каждую секунду*/
                clearInterval(timeInterval)
            }
        }
    }
    /*вызываем ф-ю установки таймера сразу после вызова модуля timer*/
    setClock(id, deadline)
}
export default timer