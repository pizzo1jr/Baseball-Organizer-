async function editTeamFormHandler(event){
   event.preventDefault();
   const player_arr = [];
   const checkedArr = document.querySelectorAll('#select-players');

   const team_id = document.location.toString().split('/')[document.location.toString().split('/').length -1 ];

   for(let i=0; i<checkedArr.length; i++){
      if(checkedArr[i].checked){
         player_arr.push(checkedArr[i].value);
      }
   }

   if(player_arr.length){
      for (let i=0; i<player_arr.length; i++){
         const response = await fetch(`/api/players/${player_arr[i]}`, {
            method:'PUT',
            body: JSON.stringify({
               team_id
            }),
            headers:{'Content-Type':'application/json'}
         });
         if (response.ok){
            console.log(response);
         } else {
            alert(response.statusText);
         }
      };
      alert('All plyers are added to the team')
   };
};

document.querySelector('.edit-team-players').addEventListener('submit', editTeamFormHandler);