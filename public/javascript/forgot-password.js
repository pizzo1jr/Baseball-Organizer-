async function forgotPassHandler(event) {
   event.preventDefault();
   const mail = document.querySelector('#forgot-pass-email').value.trim();

   const response = await fetch('/api/users/forgot-password', {
      method:'POST',
      body:JSON.stringify({
         mail
      }),
      headers:{'Content-Type':'application/json'}
   })
   
   if (response.ok){
      alert('An email was sent with a secure link to update your password')
   } else {
      alert(response.statusText);
   }
}

document.querySelector('.forgot-pass-form').addEventListener('submit', forgotPassHandler);