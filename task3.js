const csvtojson = require('csvtojson');
let fs = require('fs');

csvtojson()
  .fromFile('./csv/file.csv')
  .then((json) => {
    fs.openSync('file.txt', 'w+');
    json.forEach((line) => {
      fs.appendFileSync('file.txt', `${JSON.stringify(line)}\n`);
    })
  })
  .catch((error) => console.log(error));
