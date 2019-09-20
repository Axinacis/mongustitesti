const birdForm = document.querySelector('form');
const username = document.querySelector('#username');
const userEmail = document.querySelector('#email');
const userPassword = document.querySelector('#password');
const messageOne = document.querySelector('#message1');
//const messageTwo = document.querySelector('#message2');

birdForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'CREATING USER';
    //messageTwo.textContent = search.value;

    axios.post('/users', {
        name: username.textContent,
        email: userEmail.textContent,
        password: userPassword.textContent
    })

    /*fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location;
                //messageTwo.textContent = data.forecast;
            }
        })
    })*/
});
