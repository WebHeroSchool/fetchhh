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

let createUrl = () =>  {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has('username') == true) {
    user = urlParams.get('username');
  } else {
    user = 'norvaishas';
  }
  let reqUrl = `https://api.github.com/users/${user}`;
  return reqUrl;
};

const getDate = new Promise((resolve, reject) => {  
  setTimeout(() => {
    const now = new Date();
    resolve(now);
  }, 3000);
});

const getUser = new Promise((resolve, reject) => {
  fetch(createUrl())
  .then(response => {
    if (response.status != 404) {
      resolve(response.json());
    } else {
      reject(response.status + ' ' + response.statusText);
    }
  });
});

// Promise.all([])

getDate.then(rightNow => console.log(rightNow));
getUser.then(res => {
  if (res.name == null) {
    userName.innerHTML = 'Имя не заполнено пользователем';
  } else {
    userName.innerHTML = res.name;
  }
  userPhoto.src = res.avatar_url;
  userPageLink.href = res.html_url;
  if (res.bio !== null) {
    userBio.innerHTML = res.bio;
  } else {
    userBio.innerHTML =  'Пользователь не заполнил это поле';
  }  
  userRegDate.innerHTML = `Дата регистрации: <br>${res.created_at}`;
})
.catch(valueFromReject => {
  showError();
  errorBlock.innerHTML = `<h1>Пользователь не найден из-за ошибки <span class="red">${valueFromReject}</span></h1>`;
});