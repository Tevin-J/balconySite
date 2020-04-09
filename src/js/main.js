import './slider'
import modals from './modules/modals'
import tabs from './modules/tabs'
import forms from "./modules/forms";
import changeModalState from "./modules/changeModalState";
import timer from "./modules/timer";

/*когда загрузится DOM дерево, вызываем модули*/
window.addEventListener('DOMContentLoaded', () => {
    'use strict'
    /*создаем стейт для калькулятора и отправляем его в ф-ю по обработке инпутов калькулятора, а потом уже
    в модуль обработки формы, чтоб при запросе на сервер, ушли данные не только формы, но и всех данных
    которые мы ввели в калькулятор*/
    let modalState = {}
    /*создаем переменную deadline, которую будем помещать в модуль timer для расчета окончания акции*/
    let deadline = '2020-08-31'
    /*вызываем все наши модули*/
    changeModalState(modalState)
    modals()
    tabs('.glazing_slider', '.glazing_block', '.glazing_content', 'active')
    tabs('.decoration_slider', '.no_click', '.decoration_content > div > div', 'after_click')
    tabs('.balcon_icons', '.balcon_icons_img', '.big_img > img', 'do_image_more', 'inline-block')
    forms(modalState)
    timer('.container1', deadline)
})
