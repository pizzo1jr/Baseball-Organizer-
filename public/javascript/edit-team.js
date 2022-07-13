 const formSubmitMessage = document.querySelector(".form-submit-message");

async function editTeamPlayerFormHandler(event){
   event.preventDefault();
   const player_arr = [];
   const checkedArr = document.querySelectorAll('#select-players');
   const team_id = null;

   for(let i=0; i<checkedArr.length; i++){
      if(checkedArr[i].checked){
         player_arr.push(checkedArr[i].value);
      }
   }

   if(player_arr.length){
      for(let i=0; i<checkedArr.length;i++){
         const response = await fetch(`/api/players/${player_arr[i]}`, {
            method: 'PUT',
            body: JSON.stringify({
               team_id
            }),
            headers:{'Content-Type':'application/json'}
         })
      }
      // alert('Players removed');
      if(document.getElementById('message')){
         document.getElementById('message').remove();
      }
      let message = document.createElement('p');
      message.setAttribute('id','message')  
      message.textContent = `All selected players were removed from current team`;
      formSubmitMessage.appendChild(message);
      document.location.reload();
   }
};

document.querySelector('.edit-team-players').addEventListener('submit', editTeamPlayerFormHandler);