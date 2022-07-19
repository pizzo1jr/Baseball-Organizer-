const playerList = document.querySelector('.listing-players');
const playerOrder = document.querySelector('.player-order');

function addingPlayerToRoster(event){
   const selectedPlayer = event.target;
   playerOrder.appendChild(selectedPlayer);
   
}

playerList.addEventListener('click', addingPlayerToRoster);