function firstName(full_name){
   return full_name.split(' ')[0];
};

function lastName(full_name){
   return full_name.split(' ')[1];
};

module.exports = {
   firstName,
   lastName
};

