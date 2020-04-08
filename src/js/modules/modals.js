/*МОДАЛЬНЫЕ ОКНА*/
const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
        /*получаем элементы по пришедшим в функцию селекторам*/
        const trigger = document.querySelectorAll(triggerSelector)
        const modal = document.querySelector(modalSelector)
        const close = document.querySelector(closeSelector)
        /*поиск элементов модальных окон по дата-атрибуту data-modal. Он указан в index.html*/
        const windows = document.querySelectorAll('[data-modal]')
        /*показ модального окна реализовали через forEach так как в 1 из модальных окон есть 2 кнопки для его показа*/
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                /*отмена перезагрузки страницы по умолчанию при клике на ссылку*/
                if (e.target) {
                    e.preventDefault()
                }
                /*закрытие всех модальных окон*/
                windows.forEach(item => {
                    item.style.display = 'none'
                })
                modal.style.display = 'block'
                /*класс modal-open из библиотеки bootstrap.css вместо document.body.overflow="hidden"*/
                document.body.classList.add('modal-open')
            })
        })
        /*скрытие модального окна на клик кнопки*/
        close.addEventListener('click', () => {
            /*закрытие всех модальных окон*/
            windows.forEach(item => {
                item.style.display = 'none'
            })
            modal.style.display = 'none'
            document.body.classList.remove('modal-open')
        })
        /*скрытие модального окна на клик на подложку при условии что для данного окна разрешено
        закрытие при клике на подложку*/
        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay) {
                /*закрытие всех модальных окон*/
                windows.forEach(item => {
                    item.style.display = 'none'
                })
                modal.style.display = 'none'
                document.body.classList.remove('modal-open')
            }
        })
    }
    /*ф-я показа модального окна спустя время после загрузки страницы*/
    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block'
            document.body.classList.add('modal-open')
        }, time)
    }
    /*вызов метода для показа модального окна "вызвать мастера". в него передаем не элементы, которые соответствуют
    определенному селектору, а сами селекторы, а уже внутри функции мы по этим селекторам получим соответствующие им
    элементы. Это сделано для универсальности функции и исключения дублирования кода*/
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close')
    /*селектору phone_link соответствуют 2 точки открытия модального окна, для этого внутри bindModal применен метод forEach*/
    bindModal('.phone_link', '.popup', '.popup .popup_close')
    bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close')
    /*2 модальных окна которые появляются по очереди для рассчета стоимости, они не должны закрываться при клике на подложку*/
    bindModal('.popup_calc_button', '.popup_calc_profile', '.popup_calc_profile_close', false)
    bindModal('.popup_calc_profile_button', '.popup_calc_end', '.popup_calc_end_close', false)
    /*показ модального окна с селектором popup спустя минуту после загрузки страницы*/
    /*showModalByTime('.popup', 60000)*/

}
export default modals
