async function updateStats(event){
   const clickedEl = event.target.getAttribute('data-action');
   if (clickedEl === 'count-up' || clickedEl === 'count-down' ){
      //player id
      const id = document.location.toString().split('/')[document.location.toString().split('/').length - 1];
      // the query parameter for fetch request
      const data_query = event.target.closest('li').getAttribute('data-query');

      // decide to increment or decrement
      if(clickedEl === 'count-up'){
         var data_count = parseInt(event.target.closest('li').getAttribute('data-count')) + 1;
      } 
      if(clickedEl === 'count-down') {
         var data_count = parseInt(event.target.closest('li').getAttribute('data-count')) - 1;
      }
      // make the request
      const url = `/api/players/live_edit/${id}?${data_query}=${data_count}`;
      const response = await fetch(url, {
         method:'PUT',
         headers:{'Content-Type':'application/json'}
      });
      if (response.ok){
         document.location.reload();
      } else {
         alert(response.statusText);
      }
   }

} 

document.querySelector('#live-editable-stats').addEventListener('click', updateStats);