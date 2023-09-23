const fs = require('fs')
const Converter = require('csvtojson').Converter;

const converter = new Converter();

const readStream = fs.createReadStream('./csv/file.csv');
const writeStream = fs.createWriteStream('./file.txt');

readStream.pipe(converter).pipe(writeStream);

readStream.on('error', function(error) {
  console.log(error);
});

writeStream.on('error', function(error) {
  console.log(error);
});
