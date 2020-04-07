/*ФОРМЫ*/
const forms = () => {
    /*получаем форму, инпуты, и инпуты в коротых необходима проверка на наличие только цифр*/
    const form = document.querySelectorAll('form')
    const inputs = document.querySelectorAll('input')
    const phoneInputs = document.querySelectorAll('input[name="user_phone"]')
    /*для всех инпутов в которых должны быть только цифры, с помощью regex и флажка \D запрещаем ввод не цифр*/
    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '')
        })
    })
    /*создаем объект с сообщениями о статусе запроса на сервер*/
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с Вами свяжемся.',
        failure: 'Что-то пошло не так...'
    }
    /*функция запроса на сервер*/
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading
        let res = await fetch(url, {
            method: 'POST',
            body: data
        })
        return await res.text()
    }
    /*ф-я зачистки инпута*/
    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = ''
        })
    }
    /*пробегаемся по всем формам*/
    form.forEach(item => {
        /*обрабатываем сабмит конкретной формы*/
        item.addEventListener('submit', (e) => {
            /*отменяем ее стандартное поведение*/
            e.preventDefault()
            /*создаем элемент с сообщением о статусе запроса*/
            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            item.appendChild(statusMessage)
            /*для получения данных формы используем FormData*/
            const formData = new FormData(item)
            /*делаем запрос на сервер и отправляем на него данные из формы*/
            postData('assets/server.php', formData)
                /*обрабатываем ответ от сервера и выводим соответствующее сообщение*/
                .then(res => {
                    console.log(res)
                    statusMessage.textContent = message.success
                })
                .catch(() => {
                    statusMessage.textContent = message.failure
                })
                .finally(() => {
                    clearInputs()
                    setTimeout(() => {
                        statusMessage.remove()
                    }, 5000)
                })
        })
    })
}
export default forms