function firstName(full_name){
   return full_name.split(' ')[0];
};

function lastName(full_name){
   return full_name.split(' ')[1];
};

function batting_average(hits, at_bats){
   return (hits/at_bats).toFixed(2);
}

module.exports = {
   firstName,
   lastName,
   batting_average
};

