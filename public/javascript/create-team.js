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
         alert(`${team_name} Created`);
      } else {
         alert(response.statusText);
      }
   }
};


document.querySelector('.create-team-form').addEventListener('submit', createTeamFormHandler);

