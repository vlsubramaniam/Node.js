const fs = require('fs');

const fileData = JSON.parse(fs.readFileSync('1-json.json').toString());
fileData.name = 'Rajan';
fileData.age = 34;
console.log(fileData.age);

const userData = fs.writeFileSync('1-json.json', JSON.stringify(fileData));
