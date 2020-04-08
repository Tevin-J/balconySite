/*ФОРМЫ*/
import checkNumInputs from "./checkNumInputs";
/*для того чтоб отправить на сервер помимо данных формы, но и данные из калькулятора,
мы передали эти данные в качестве аргумента сюда*/
const forms = (state) => {
    /*получаем форму, инпуты*/
    const form = document.querySelectorAll('form')
    const inputs = document.querySelectorAll('input')
    /*отправляем инпуты в которых необходима проверка на наличие только цифр в спец функцию*/
    checkNumInputs('input[name="user_phone"]')
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
    /*ф-я очистки стейта после отправки формы на сервер*/
    const clearState = () => {
        for (const prop of Object.keys(state)) {
            delete state[prop]
        }
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
            /*если форма которую мы заполнили соответствует форме калькулятора, то мы пробегаемся по
            пришедшему стейту и каждое его свойство добавляем в formData*/
            if (item.getAttribute('data-calc') === "end") {
                for (let key in state) {
                    formData.append(key, state[key])
                }
            }
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
                    /*закрытие формы калькулятора после отправки ее на сервер*/
                    if (item.getAttribute('data-calc') === "end") {
                        setTimeout(() => {
                            item.closest('.popup_calc_end').style.display = 'none'
                            document.body.classList.remove('modal-open')
                        }, 6000)
                    }
                    clearState()
                })
        })
    })
}
export default forms
