const formSubmitMessage = document.querySelector('.form-submit-message');

async function createTeamFormHandler(event){
   event.preventDefault()
   const team_name = document.querySelector("#team_name").value.trim();

   if(team_name){
      const response = await fetch('/api/teams', {
         method:'POST',
         body:JSON.stringify({
            team_name
         }),
         headers:{'Content-Type':'application/json'}
      })
      if(response.ok){
         if(document.getElementById('message')){
            document.getElementById('message').remove();
         }
         let message = document.createElement('p');
         message.setAttribute('id','message')  
         message.textContent = `${team_name} was created. Check it out in the Dashboard!`;
         formSubmitMessage.appendChild(message);
      } else {
         alert(response.statusText);
      }
   }
};


document.querySelector('.create-team-form').addEventListener('submit', createTeamFormHandler);

