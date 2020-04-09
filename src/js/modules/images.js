/*ПОКАЗ ИЗОБРАЖЕНИЙ*/
const images = () => {
    /*получаем блок с изображениями, создаем блок с модальным окном и блок с картинкой,
    которую поместим в модальное окно*/
    const imgPopup = document.createElement('div')
    const workSection = document.querySelector('.works')
    const bigImage = document.createElement('img')
    /*настраиваем класс для модального окна, вставляем его в блок с изображениями
    и выравниваем его детей по центру*/
    imgPopup.classList.add('popup')
    workSection.appendChild(imgPopup)
    imgPopup.style.justifyContent = 'center'
    imgPopup.style.alignItems = 'center'
    imgPopup.style.display = 'none'
    /*вставляем в блок само изображение*/
    imgPopup.appendChild(bigImage)
    /*обрабатываем клик на блок с изображениями*/
    workSection.addEventListener('click', (e) => {
        /*отменяем стандартное поведение перехода по ссылке*/
        e.preventDefault()
        let target = e.target
        /*если кликнули и при том кликнули на картинку с классом preview, то модальное окно показали
        и присвоили картинке src того элемента, на который кликнули*/
        if (target && target.classList.contains('preview')) {
            imgPopup.style.display = 'flex'
            const path = target.parentNode.getAttribute('href')
            bigImage.setAttribute('src', path)
            document.body.classList.add('modal-open')
        }
        /*при клике на подложку скрыли модальное окно*/
        if (target && target.matches('div.popup')) {
            imgPopup.style.display = 'none'
            document.body.classList.remove('modal-open')
        }
    })
}
export default images