const select = () => {
    const selectHeader = document.querySelectorAll('.select__header')

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    })

    function selectToggle() {
        this.parentElement.classList.toggle('is-active')
    }


    const clear = document.querySelector('.select__clear')
    const accept = document.querySelector('.select__accept')

    clear.addEventListener('click', () => {
        const selectBody = document.querySelector('[type = "guest"]').querySelector('.select__body')
        selectBody.dataset.child = 0
        selectBody.dataset.adult = 0
        selectBody.dataset.baby = 0
        render(selectBody)
    })

    accept.addEventListener('click', () => {
        document.querySelector('.select').classList.toggle('is-active')
    })


    doListener('adult')()
    doListener('child')()
    doListener('baby')()

    doListener('room')()
    doListener('bed')()
    doListener('bath')()
}


const doListener = (name) => {
    return () => {
        const selectBody = document.querySelector(`.panel__plus.plus-${name}`).parentNode.parentNode.parentNode
        document.querySelector(`.panel__plus.plus-${name}`).addEventListener('click', () => {
            let newThing = + selectBody.getAttribute(`data-${name}`) + 1
            selectBody.setAttribute(`data-${name}`, newThing)
            document.querySelector(`.panel__minus.minus-${name}`).setAttribute('disabled', 'false')
            render(selectBody)
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
            render(selectBody)
        })


    }
}

const render = (selectBody) => {
    //console.log(selectBody)
    if (selectBody.parentElement.getAttribute('type') === "guest") {
        const guestsCount = +selectBody.getAttribute('data-adult')
            + +selectBody.getAttribute('data-child')
            + +selectBody.getAttribute('data-baby')
        selectBody.parentElement.querySelector('.select__current').innerHTML = `
            ${guestsCount === 0
                ? 'Сколько гостей'
                : `${guestEnd(guestsCount)}`
            } 
        `
        selectBody.querySelector(`.panel__count.count-adult`).innerHTML = selectBody.getAttribute('data-adult') || '0'
        selectBody.querySelector(`.panel__count.count-child`).innerHTML = selectBody.getAttribute('data-child') || '0'
        selectBody.querySelector(`.panel__count.count-baby`).innerHTML = selectBody.getAttribute('data-baby') || '0'
        if (guestsCount === 0) {
            selectBody.querySelector('.select__clear').setAttribute('disabled', '')
            selectBody.querySelectorAll('.panel__minus').forEach(elem => elem.setAttribute('disabled', 'true'))
        }
        else selectBody.querySelector('.select__clear').removeAttribute('disabled')
    } else {
        const a = roomsStr(selectBody.getAttribute('data-room') || 0)
        const b = bedStr(selectBody.getAttribute('data-bed') || 0)
        const c = bathStr(selectBody.getAttribute('data-bath') || 0)
        a + b + c == ""
            ? selectBody.parentElement.querySelector('.select__current').innerHTML = 'Спальни, кровати...'
            : selectBody.parentElement.querySelector('.select__current').innerHTML
            = myCutter(`${a ? `${a}, ` : ''}`
                + `${b ? `${b}, ` : ''}`
                + c)

        selectBody.querySelector(`.panel__count.count-room`).innerHTML = selectBody.getAttribute('data-room') || '0'
        selectBody.querySelector(`.panel__count.count-bed`).innerHTML = selectBody.getAttribute('data-bed') || '0'
        selectBody.querySelector(`.panel__count.count-bath`).innerHTML = selectBody.getAttribute('data-bath') || '0'

    }
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

const roomsStr = (num = 0) => {
    if (num == 0) return ''
    if (num > 4 && num < 21) return `${num} спален`
    switch (num % 10) {
        case 1:
            return `${num} спальня`
        case 2:
        case 3:
        case 4:
            return `${num} спальни`
        default:
            return `${num} спален`
    }
}

const bedStr = (num = 0) => {
    if (num == 0) return ''
    if (num > 4 && num < 21) return `${num} кроватей`
    switch (num % 10) {
        case 1:
            return `${num} кровать`
        case 2:
        case 3:
        case 4:
            return `${num} кровати`
        default:
            return `${num} кроватей`
    }
}

const bathStr = (num = 0) => {
    if (num == 0) return ''
    if (num > 4 && num < 21) return `${num} ванных комнат`
    switch (num % 10) {
        case 1:
            return `${num} ванная комната`
        case 2:
        case 3:
        case 4:
            return `${num} ванные комнаты`
        default:
            return `${num} ванных комнат`
    }
}

const myCutter = (str) => {
    return str.slice(0, 20) + '...'
}
document.addEventListener("DOMContentLoaded", select);