async function signUpFormHandler(event){
   event.preventDefault();

   // get the values from input
   const first_name = document.querySelector('#first-name').value.trim();
   const last_name = document.querySelector('#last-name').value.trim();
   const username = document.querySelector('#username').value.trim();
   const email = document.querySelector('#email').value.trim();
   const password = document.querySelector('#password').value.trim();

   // check if all the inputs are ok and do a fetch POST request 
   if(first_name && last_name && username && email && password) {
      const response = await fetch('/api/users', {
         method:'POST',
         body: JSON.stringify({
            first_name,
            last_name,
            username,
            email,
            password
         }),
         headers: {'Content-Type':'application/json'}
      })
      
      if(response.ok){
         document.location.replace('/dashboard');
      } else {
         alert(response.statusText);
      }
   }
};

document.querySelector('.signup-form').addEventListener('submit', signUpFormHandler);