const playerListGroup = document.querySelector('.list-group');

async function battingRosterFormHandler(event){

   event.preventDefault();
   let queryParam;
   const radioInputArr = document.querySelectorAll('input');

   for (let i=0;i<radioInputArr.length;i++){
      if (radioInputArr[i].checked){
         queryParam  = radioInputArr[i].value;
      }
   }
   const url = `/api/players/batting-roster/?queryParam=${queryParam}`;

   const response = await fetch(url, {
      method:'POST',
      headers:{'Content-Type':'application/json'}
   });

   const playerData = await response.json();
   // create list elements and append them accordingly
   for (let i=0;i<playerData.length-1;i++){
      const playerListEle = document.createElement('li');
      playerListEle.classList.add('list-group-item');
      playerListEle.textContent = `${playerData[i].player_name}: AB: ${playerData[i].at_bats} | H: ${playerData[i].hits} | BA: ${playerData[i].batting_average}`;
      playerListGroup.appendChild(playerListEle);
   }
}

document.querySelector('.batting-roster-form').addEventListener('submit', battingRosterFormHandler)