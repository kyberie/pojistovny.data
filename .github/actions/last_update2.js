var fs = require('fs');
var date = new Date();

fs.writeFile('main/update2.json', '{"update":"' + date.toISOString() + '"}', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});