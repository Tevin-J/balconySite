const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector)
    /*для всех инпутов в которых должны быть только цифры, с помощью regex и флажка \D запрещаем ввод не цифр*/
    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '')
        })
    })
}
export default checkNumInputs