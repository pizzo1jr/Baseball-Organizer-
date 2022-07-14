async function updateStats(event){
   const clickedEl = event.target.getAttribute('data-action');
   if (clickedEl === 'count-up' || clickedEl === 'count-down' ){
      const id = document.location.toString().split('/')[document.location.toString().split('/').length - 1];
      const data_count = event.target.closest('li').getAttribute('data-count') + 1;
      const data_query = event.target.closest('li').getAttribute('data-query');
      console.log(id, data_count, data_query);
   }
   

   // const response = await fetch(`/api/players/live-update/${id}?`)
} 

document.querySelector('#live-editable-stats').addEventListener('click', updateStats);