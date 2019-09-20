const userForm = document.querySelector('Form');

userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('nameField').value;
    const email = document.getElementById('emailField').value;
    const password = document.getElementById('passwordField').value;

    try {
        const res = await axios.post('/users', {
            name, email, password
        });
        response.textContent = "Tietokantaan lisätty" + res.data.user.name
    } catch (e) {
        response.textContent = e
    }
});