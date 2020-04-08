import checkNumInputs from "./checkNumInputs";

const changeModalState = (state) => {
    /*получаем элементы которые задействованы в калькуляторе*/
    const windowForm = document.querySelectorAll('.balcon_icons_img')
    const windowWidth = document.querySelectorAll('#width')
    const windowHeight = document.querySelectorAll('#height')
    const windowType = document.querySelectorAll('#view_type')
    const windowProfile = document.querySelectorAll('.checkbox')
    /*проверка инпутов на ввод цифр*/
    checkNumInputs('#width')
    checkNumInputs('#height')
    /*универсальный обработчик работы с элементами калькулятора*/
    function bindActionToElems(event, elem, prop) {
        elem.forEach((item, i) => {
            item.addEventListener(event, () => {
                /*рассматриваем как будут заноситься данные в стейт в зависимости от типа инпута*/
                switch (item.nodeName) {
                    case 'SPAN':
                        state[prop] = i
                        break
                    case'INPUT':
                        if (item.getAttribute('type') === 'checkbox') {
                            i === 0 ? state[prop] = 'Холодное' : state[prop] = 'Теплое'
                            /*реализация чтоб можно было заполнить только один из чекбоксов*/
                            elem.forEach((box, j) => {
                                box.checked = false
                                if (i === j) {
                                    box.checked = true
                                }
                            })
                        } else {
                            state[prop] = item.value
                        }
                        break
                    case 'SELECT':
                        state[prop] = item.value
                        break
                }
                console.log(state)
            })
        })
    }
    bindActionToElems('click', windowForm, 'form')
    bindActionToElems('input', windowHeight, 'height')
    bindActionToElems('input', windowWidth, 'width')
    bindActionToElems('change', windowType, 'type')
    bindActionToElems('change', windowProfile, 'profile')
}
export default changeModalState