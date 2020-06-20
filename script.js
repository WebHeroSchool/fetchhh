let errorBlock = document.querySelector('.error');
let userCard = document.querySelector('.user-card');
let userName = document.querySelector('.user-name');
let userPhoto = document.querySelector('.user-photo');
let userPageLink = document.querySelector('.github-page');
let userBio = document.querySelector('.user-bio');
let userRegDate = document.querySelector('.registration-date');
let user;
let loader = document.querySelector('.preloader');

function showError() {
  errorBlock.classList.toggle('hide');
}

function switchPreloader() {
  loader.classList.toggle('hide');
  userCard.classList.toggle('hide');
}
switchPreloader();

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

let dataRequest = fetch(createUrl());

const getDate = new Promise((resolve, reject) => {  
  setTimeout(() => {
    const currentDate = new Date();
    resolve(currentDate);
  }, 3000);
});

let now;

Promise.all([getDate, dataRequest])
.then(([getDateValue, response]) => {
  now = getDateValue;
  return response;
})
.then(resp => {
  if (resp.status != 404) {
    return(resp.json());
  } else {
    throw(resp.status + ' ' + resp.statusText);
  }
})
.then((res) => {
  switchPreloader();
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
  userRegDate.innerHTML = now;
})
.catch(valueFromReject => {
  switchPreloader();
  showError();
  errorBlock.innerHTML = `<h1>Пользователь не найден из-за ошибки: <br><span class="red">${valueFromReject}</span></h1>`;
});