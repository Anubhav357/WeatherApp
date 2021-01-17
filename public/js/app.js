console.log('Hi fom javascript');

// fetch('http://localhost:3000/weather?address=%27Boston%27').then((response) => {
//     response.json().then((data) => {
//         if (data.error)
//             console.log(data.error);
//         else {
//             console.log(data);
//         }
//     });
// });

const form = document.querySelector('form');
const address = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = address.value;
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    const url = 'http://localhost:3000/weather?address=' + encodeURIComponent(location);
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});