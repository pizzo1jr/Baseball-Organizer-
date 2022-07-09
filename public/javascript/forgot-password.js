async function forgotPassHandler(event) {
   event.preventDefault();
   const email = document.querySelector('#forgot-pass-email').value.trim();
   
   if (email){
      const response = await fetch(`/api/users/forgot-password`, {
         method:'POST',
         body: JSON.stringify({
            email
         }),
         headers:{'Content-Type':'application/json'}
      });
      
      if (response.ok){
         alert('An email was sent with a secure link to update your password');
         document.location.replace('/user/update-password')
      } else {
         alert(response.statusText);
      }
   };
};

document.querySelector('.forgot-pass-form').addEventListener('submit', forgotPassHandler);