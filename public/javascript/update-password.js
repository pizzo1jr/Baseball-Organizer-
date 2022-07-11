async function updatePassFormHandler(event){
   event.preventDefault();

   const auth_code = document.querySelector('#auth_code').value.trim();
   const password = document.querySelector('#password').value.trim();

   if (auth_code && password){
      const response = await fetch('/api/users/update-password', {
         method:'POST',
         body: JSON.stringify({
            auth_code,
            password
         }),
         headers:{'Content-Type':'application/json'}
      })
      
      if(response.ok){
         document.location.replace('/user/login');
      } else {
         alert(response.statusText);
      }
   }

}

document.querySelector('.update-pass-form').addEventListener('submit', updatePassFormHandler);