function generateAuthCode(){
   let auth_code = '';
   for(let i=0;i<4;i++){
      auth_code += Math.floor(Math.random()*9);
   }
   return auth_code;
};

async function forgotPassHandler(event) {
   event.preventDefault();
   const mail = document.querySelector('#forgot-pass-email').value.trim();
   const auth_code = generateAuthCode();
   if (mail){
      const response = await fetch('/api/users/forgot-password', {
         method:'POST',
         body:JSON.stringify({
            mail,
            auth_code
         }),
         headers:{'Content-Type':'application/json'}
      });
      
      if (response.ok){
         alert('An email was sent with a secure link to update your password')
      } else {
         alert(response.statusText);
      }
   };
};

document.querySelector('.forgot-pass-form').addEventListener('submit', forgotPassHandler);