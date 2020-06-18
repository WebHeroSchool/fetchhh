let errorBlock = document.querySelector('.error');
let userCard = document.querySelector('.user-card');
let userName = document.querySelector('.user-name');
let userPhoto = document.querySelector('.user-photo');
let userPageLink = document.querySelector('.github-page');
let userBio = document.querySelector('.user-bio');
let userRegDate = document.querySelector('.registration-date');
let user;

function showError() {
  userCard.style.display = 'none';
  errorBlock.style.display = 'flex';
}

function searchUser(login = 'norvaishas'){
  let reqUrl = `https://api.github.com/users/${login}`;

  fetch(reqUrl)
  .then(response => {
    if (response.status != 404) {
      return response.json()
    } else {
      let error = new Error(response.statusText + ' ' + response.status);
      error.response = response;
      throw error;
    }
  })
  .then(response => {
    if (response.name == null) {
      userName.innerHTML = 'Имя не заполнено пользователем';
    } else {
      userName.innerHTML = response.name;
    }

    userPhoto.src = response.avatar_url;
    userPageLink.href = response.html_url;

    if (response.bio !== null) {
      userBio.innerHTML = response.bio;
    } else {
      userBio.innerHTML =  'Пользователь не заполнил это поле';
    }
    
    userRegDate.innerHTML = `Дата регистрации: <br>${response.created_at}`;
  })
  .catch(e => {
    showError();
    errorBlock.innerHTML = `<h1>Пользователь не найден из-за ошибки <span class="red">${e}</span></h1>`;
  });
}

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('username') == true) {
  user = urlParams.get('username');
} else {
  user = undefined;
}

searchUser(user);