const select = () => {
    const selectHeader = document.querySelectorAll('.select__header')

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    })

    function selectToggle() {
        this.parentElement.classList.toggle('is-active')
    }


    doListener('adult')()
    doListener('child')()
    doListener('baby')()


    const clear = document.querySelector('.select__clear')
    const accept = document.querySelector('.select__accept')

    clear.addEventListener('click', () => {
        const selectBody = document.querySelector('.select__body')
        selectBody.dataset.child = 0
        selectBody.dataset.adult = 0
        selectBody.dataset.baby = 0
        render()
    })

    accept.addEventListener('click', () => {
        document.querySelector('.select').classList.toggle('is-active')
    })

}


const doListener = (name) => {
    return () => {
        const selectBody = document.querySelector('.select__body')
        document.querySelector(`.panel__plus.plus-${name}`).addEventListener('click', () => {
            let newThing = + selectBody.getAttribute(`data-${name}`) + 1
            selectBody.setAttribute(`data-${name}`, newThing)
            document.querySelector(`.panel__minus.minus-${name}`).setAttribute('disabled', 'false')
            render()
        })
        document.querySelector(`.panel__minus.minus-${name}`).addEventListener('click', () => {
            let newThing = + selectBody.getAttribute(`data-${name}`)
            if (newThing > 1) {
                newThing -= 1
            } else {
                newThing = 0
                document.querySelector(`.panel__minus.minus-${name}`).setAttribute('disabled', 'true')
            }
            selectBody.setAttribute(`data-${name}`, newThing)
            document.querySelector(`.panel__count.count-${name}`).innerHTML = newThing
            render()
        })


    }
}

const render = () => {
    //console.log(document.querySelector('.select__body').attributes)
    const selectBody = document.querySelector('.select__body')
    const guestsCount = +selectBody.getAttribute('data-adult')
        + +selectBody.getAttribute('data-child')
        + +selectBody.getAttribute('data-baby')
    document.querySelector('.select__current').innerHTML = `
        ${guestsCount === 0
            ? 'Сколько гостей'
            : `${guestEnd(guestsCount)}`
        } 
    `
    document.querySelector(`.panel__count.count-adult`).innerHTML = selectBody.getAttribute('data-adult')
    document.querySelector(`.panel__count.count-child`).innerHTML = selectBody.getAttribute('data-child')
    document.querySelector(`.panel__count.count-baby`).innerHTML = selectBody.getAttribute('data-baby')
    if (guestsCount === 0) {
        document.querySelector('.select__clear').setAttribute('disabled', '')
        document.querySelectorAll('.panel__minus').forEach(elem => elem.setAttribute('disabled', 'true'))
    }
    else document.querySelector('.select__clear').removeAttribute('disabled')


}



const guestEnd = (num) => {
    if (num > 4 && num < 21) return `${num} гостей`
    switch (num % 10) {
        case 1:
            return `${num} гость`
        case 2:
        case 3:
        case 4:
            return `${num} гостя`
        default:
            return `${num} гостей`
    }
}


document.addEventListener("DOMContentLoaded", select);