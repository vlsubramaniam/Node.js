const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormButton = $messageForm.querySelector('button');
const $messageFormInput = $messageForm.querySelector('input');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Template
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationMessageTemplate = document.querySelector(
  '#location-message-template'
).innerHTML;

socket.on('message', msg => {
  console.log(msg);
  const html = Mustache.render(messageTemplate, {
    message: msg.text,
    createdAt: moment(msg.createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', message => {
  console.log(message);
  const html = Mustache.render(locationMessageTemplate, {
    url: message.url,
    createdAt: moment(message.createdAt).format('h:mm a')
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', e => {
  e.preventDefault();
  $messageFormButton.setAttribute('disabled', 'disabled');
  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, error => {
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log('The message was delivered');
  });
});

$sendLocationButton.addEventListener('click', () => {
  if (!navigator.geolocation) {
    return alert('Geolocatio is not supported by your browser');
  }
  $sendLocationButton.setAttribute('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition(position => {
    socket.emit(
      'sendLocation',
      {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      },
      () => {
        console.log('Location shared');
        $sendLocationButton.removeAttribute('disabled');
      }
    );
  });
});
