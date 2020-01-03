const formElement = document.querySelector('form')
const inputElement = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')
message1.textContent = ''

formElement.addEventListener('submit', e => {
  e.preventDefault()
  const address = inputElement.value
  message1.textContent = 'Loading...'
  fetch('/weather?address=' + address).then(data => {
    data.json().then(res => {
      if (res.error) {
        message1.textContent = res.error
      } else {
        message1.textContent = res.location
        message2.textContent = res.forecast
      }
    })
  })
})
