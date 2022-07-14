async function editFormHandler(event){
   event.preventDefault();
   const id = document.location.toString().split('/')[document.location.toString().split('/').length - 1];
   // get all the inputs
   const first_name = document.querySelector('#first_name').value.trim();
   const last_name = document.querySelector('#last_name').value.trim();
   const player_name = first_name + " " + last_name
   
   const position = document.querySelector('#position').value.trim();
   
   // get bats
   const bats_list = document.querySelectorAll("input[name='bats']");
   let bats;
   for(let i=0;i<bats_list.length;i++){
      if (bats_list[i].checked){
         bats = bats_list[i].value.trim();
      }
   }

   // get throws
   const throws_list = document.querySelectorAll("input[name='throws']");
   let throws;
   for(let i=0;i<throws_list.length;i++){
      if (throws_list[i].checked){
         throws = throws_list[i].value.trim();
      }
   }

   // pitcing stats
   const strike_outs = document.querySelector('#strike_outs').value.trim();
   const batters_walked = document.querySelector('#batters_walked').value.trim();
   const innings_pitched = document.querySelector('#innings_pitched').value.trim();
   const earned_run_average = document.querySelector('#earned_run_average').value.trim();

   // batting stats
   const at_bats = document.querySelector('#at_bats').value.trim();
   const hits = document.querySelector('#hits').value.trim();
   const runs_batted_in = document.querySelector('#runs_batted_in').value.trim();
   const batting_average = document.querySelector('#batting_average').value.trim();

   const response = await fetch(`/api/players/${id}`, {
      method:'PUT',
      body:JSON.stringify({
         player_name,
         position,
         bats,
         throws,
         strike_outs,
         batters_walked,
         innings_pitched,
         earned_run_average,
         at_bats,
         hits,
         runs_batted_in,
         batting_average
      }),
      headers:{'Content-Type':'application/json'}
   })
   
   if(response.ok){
      document.location.reload();

   } else {
      alert(response.statusText);
   }
}

document.querySelector('.edit-player-form').addEventListener('submit', editFormHandler);