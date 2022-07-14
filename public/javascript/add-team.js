let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
let modalMessage = document.getElementById('modal-message');

async function editTeamFormHandler(event){
   event.preventDefault();
   const player_arr = [];
   const player_name_arr = [];
   const checkedArr = document.querySelectorAll('#select-players');

   const team_id = document.location.toString().split('/')[document.location.toString().split('/').length-1 ];

   for(let i=0; i<checkedArr.length; i++){
      if(checkedArr[i].checked){
         player_name_arr.push(checkedArr[i].getAttribute('data-name'));
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
         if (!response.ok){
            alert(reponse.statusText)
         }
      };
      for(let i=0; i<player_name_arr.length;i++){
         const listItem = document.createElement('li')
         listItem.textContent = player_name_arr[i];
         modalMessage.appendChild(listItem);
      }
      modal.style.display = 'block'
   };
};

document.querySelector('.edit-team-players').addEventListener('submit', editTeamFormHandler);
span.addEventListener('click', function(){
   document.location.reload();
})
window.addEventListener('click', function(event){
   if (event.target == modal){
      document.location.reload();
   }
});