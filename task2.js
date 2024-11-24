// На сторінці index.html знаходяться поля зазначені коментарем Task2
// При введені імені користувача в поле #userNameInput та натиску на кнопку
// #getUserButton потрібно зробити запит Fetch за посиланням - https://jsonplaceholder.typicode.com/users
// Віднайти користувача із введеним ім'ям, отримати місто його проживанння та
// відобразити у тезі #userCity
// Запустити програму потрібно за допомогою Live Server
// Перевірити правильність програми - команда node tests/task2.test.js

const userNameInput = document.querySelector('#userNameInput');
const getUserButton = document.querySelector('#getUserButton');
const userCitySpan = document.querySelector('#userCity');


async function fetchUsers() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    return response.ok ? response.json() : null;
}

function findUserByName(users, name) {
    return users.find(user => user.name.toLowerCase() === name.toLowerCase());
}

async function getUserByName() {
    const userName = userNameInput.value.trim();
    if (!userName) {
        userCitySpan.textContent = 'Please enter a user name';
        return;
    }
    const users = await fetchUsers();
    if (!users) {
        userCitySpan.textContent = 'Failed to fetch user data';
        return;
    }

    const user = findUserByName(users, userName);
    userCitySpan.textContent = user ? ` ${user.address.city}` : 'User not found';
}

getUserButton.addEventListener('click', getUserByName);
