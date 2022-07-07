async function loginFormHandler(event){
   event.preventDefault();
   
   // get the value from input fields
   const email = document.querySelector('#email').value.trim();
   const password = document.querySelector('#password').value.trim();

   // check if the input fields are good
   if(email && password){
      const response = await fetch('/api/users/login', {
         method: 'POST',
         body:JSON.stringify({
            email,
            password
         }),
         headers:{'Content-Type':'application/json'}
      });
      
      if(response.ok){
         document.location.replace('/');
      } else {
         alert(response.statusText);
      }
   }

};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
