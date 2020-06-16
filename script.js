let btn = document.querySelector('.btn'),
    input = document.querySelector('.login'),
    userName = document.querySelector('.user-name'),
    userPhoto = document.querySelector('.user-photo'),
    userPageLink = document.querySelector('.github-page'),
    userBio = document.querySelector('.user-bio'),
    userRegDate = document.querySelector('.registration-date');

function showError() {
  let errorBlock = document.querySelector('.error'),
      userCard = document.querySelector('.user-card');
  
  userCard.style.display = 'none';
  errorBlock.style.display = 'flex';
}

function showUser() {
  let errorBlock = document.querySelector('.error'),
      userCard = document.querySelector('.user-card');
  
  userCard.style.display = 'flex';
  errorBlock.style.display = 'none';
}

function searchUser(){
  let user = input.value;
      reqUrl = `https://api.github.com/users/${user}`;

  fetch(reqUrl)
  .then(response => {
    console.log('попали в первый then')
    // console.log(response)
    if (response.ok) {
      console.log('if внутри первого then')
      return response.json()
    } else {
      console.log('else внутри первого then');
      let error = new Error(response.statusText);
      error.response = response;
      throw error;
    }
  })
  .then(response => {
    console.log('такой пользователь существует');
    // console.log(alredyUsed);
    if (response.name == null) {
      userName.innerHTML = 'Имя не заполнено пользователем';
    } else {
      showUser();
      userName.innerHTML = response.name;
    }

    userPhoto.src = response.avatar_url;
    
    userPageLink.href = response.html_url;
    if (response.bio !== null) {
      userBio.innerHTML = response.bio;
    } else {
      userBio.innerHTML = `${response.name} не заполнил(a) это поле`;
    }
    
    userRegDate.innerHTML = response.created_at;
  })
  .catch(e => {
    console.log('это внутри catch')
    showError();
    errorBlock.innerHTML = `<h1>пользователь не найден из-за ошибки ${e}</h1>`;
  });
}

btn.addEventListener('click', searchUser);

input.addEventListener('keydown', function(event) {
  if(event.keyCode == 13) {
    searchUser();
  }
});