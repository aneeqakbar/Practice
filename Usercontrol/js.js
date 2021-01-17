var fs = require('fs');
let numbers = 123450987654321;
let n = Math.floor(numbers); 
seperatenums();

function seperatenums() {
    while(n != 0){
        n / 100;
        digit = n % 10;
        console.log(digit);
    }
}

// let userarray = []

// let user = {'name':'anwqwn','email':'aneeqakbqr@gmail.com'}

// userarray.push(user);

// console.log(userarray)
// console.log(userarray[0].name,userarray[0].email);

// fs.writeFile('users.json',JSON.stringify(userarray),(err,result)=>{
//     if (err){
//         console.log(err);
//     }
// });
