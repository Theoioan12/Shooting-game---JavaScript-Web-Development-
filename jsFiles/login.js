
//XMLHttpRequest v2


function dologin(){
    var http_request = new XMLHttpRequest(),     
        url = "http://wd.etsisi.upm.es:10000/users/login";
      let theuser = document.getElementById('username').value;
      let thepwd = document.getElementById('password').value;
      url += '?username=' + theuser + '&password=' + thepwd;
      http_request.open('GET', url, true);
      http_request.responseType = 'json';
      http_request.onload = function() { 
          responseProcess(http_request);
          }
      http_request.send();
  
  }  
  
  
  function responseProcess(http_request) {
      if (http_request.status == 200) {
          let information = http_request.response;
          console.log(information);
          let jwtToken = http_request.getResponseHeader('Authorization');
        //We don't need the response
        document.getElementById('result').innerHTML = jwtToken;
        }             
      else
        alert("There was an ERROR with the URL");
  } 
  
  
  // fetch version
  /*
  function dologin(){ 
    let url = "http://wd.etsisi.upm.es:10000/users/login";   
    let options = {
       method: 'GET'  
      };
    fetch(url, options)
      .then(()=>{})
      .then (() => {})
  }
  */
  
  window.onload = function(){
    document.getElementById('login').onclick = dologin;
  }
  
  
  