/*МОДАЛЬНЫЕ ОКНА*/
const modals = () => {
    function bindModal(triggerSelector, modalSelector, closeSelector) {
        /*получаем элементы по пришедшим в функцию селекторам*/
        const trigger = document.querySelectorAll(triggerSelector)
        const modal = document.querySelector(modalSelector)
        const close = document.querySelector(closeSelector)
        /*показ модального окна реализовали через forEach так как в 1 из модальных окон есть 2 кнопки для его показа*/
        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                /*отмена перезагрузки страницы по умолчанию при клике на ссылку*/
                if (e.target) {
                    e.preventDefault()
                }
                modal.style.display = 'block'
                /*класс modal-open из библиотеки bootstrap.css вместо document.body.overflow="hidden"*/
                document.body.classList.add('modal-open')
            })
        })
        /*скрытие модального окна на клик кнопки*/
        close.addEventListener('click', () => {
            modal.style.display = 'none'
            document.body.classList.remove('modal-open')
        })
        /*скрытие модального окна на клик вне области модального окна*/
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none'
                document.body.classList.remove('modal-open')
            }
        })
    }
    /*ф-я показа модального окна спустя время после загрузки страницы*/
    function showModalByTime(selector, time) {
        setTimeout(function () {
            document.querySelector(selector).style.display = 'block'
            document.body.classList.remove('modal-open')
        }, time)
    }
    /*вызов метода для показа модального окна "вызвать мастера". в него передаем не элементы, которые соответствуют
    определенному селектору, а сами селекторы, а уже внутри функции мы по этим селекторам получим соответствующие им
    элементы. Это сделано для универсальности функции и исключения дублирования кода*/
    bindModal('.popup_engineer_btn', '.popup_engineer', '.popup_engineer .popup_close')
    /*селектору phone_link соответствуют 2 точки открытия модального окна, для этого внутри bindModal применен метод forEach*/
    bindModal('.phone_link', '.popup', '.popup .popup_close')
    /*показ модального окна с селектором popup спустя минуту после загрузки страницы*/
    showModalByTime('.popup', 60000)
}
export default modals