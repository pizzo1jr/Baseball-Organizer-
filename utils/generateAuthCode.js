function generateAuthCode(){
   let auth_code = '';
   for(let i=0;i<4;i++){
      auth_code += Math.floor(Math.random()*9);
   }
   return auth_code;
};

module.exports = generateAuthCode;