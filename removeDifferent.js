const fs = require('fs');

const x =  fs.readFileSync('./iFollow.js', 'utf8')
const follows = (x.split("\n"));
const y = fs.readFileSync('./followsMe.js', 'utf8');
const followedBy = x.split("\n");

// for(let i = 0; i < followedBy.length; i++) {
//     for(let j = 0; j < follows.length; j++) {

//         if(followedBy[i] === follows[j]) {
//             console.log(follows[j]);
//             break;
//         }
//     }
// }
