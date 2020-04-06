/*ТАБЫ*/
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    /*получаем блок с табами, сами табы отдельно и их контент*/
    const header = document.querySelector(headerSelector)
    const tab = document.querySelectorAll(tabSelector)
    const content = document.querySelectorAll(contentSelector)
    /*ф-я скрытия табов*/
    function hideTabContent() {
        content.forEach(item => {
            item.style.display = 'none'
        })
        tab.forEach(item => {
            item.classList.remove(activeClass)
        })
    }
    /*ф-я показа табов по умолчанию показываем первый таб*/
    function showTabContent(i = 0) {
        content[i].style.display = 'block'
        tab[i].classList.add(activeClass)
    }
    /*первая отрисовка табов*/
    hideTabContent()
    showTabContent()
    /*обработка клика на блок с табами*/
    header.addEventListener('click', (e) => {
        const target = e.target
        /*если у элемента куда мы кликнули есть св-во target, и этот элемент, либо его родитель
        содержит класс tabSelector(с помощью replace  и регулярных выражений убрали точку из
        пришедшего в качестве аргумента класса)*/
        if ( target && (target.classList.contains(tabSelector.replace(/\./,''))
        || target.parentNode.classList.contains(tabSelector.replace(/\./,'')))) {
            /*перебираем все табы из блока табов*/
            tab.forEach((item, i) => {
                /*сравнение того таба, на который кликнули и конкретного таба из блока табов.
                при совпадении все табы прячем, а этот таб показываем*/
                if (target === item || target.parentNode === item) {
                    hideTabContent()
                    showTabContent(i)
                }
            })
        }
    })
}
export default tabs
