var fs = require('fs');
var date = new Date();
const archiver = require('archiver');


fs.readFile('main/data.json', (err, data) => {
  let pojistovny = JSON.parse(data);
  let zip_name_all = pojistovny.logos_zip_file_all;
  let zip_name_automobil = pojistovny.logos_zip_file_automobil;

  var outputAll = fs.createWriteStream('main/' + zip_name_all);
  var archiveAll = archiver('zip', {
    zlib: { level: 9 } 
  });
  archiveAll.pipe(outputAll);

  var outputAuto = fs.createWriteStream('main/' + zip_name_automobil);
  var archiveAuto = archiver('zip', {
    zlib: { level: 9 } 
  });
  archiveAuto.pipe(outputAuto);

  var logos = [];
  var logosAuto = [];
  for (index in pojistovny.insurers) {
    var pojistovna = pojistovny.insurers[index];
    if (logos[pojistovna.logo] != 1) {
      archiveAll.file('main/logo/' + pojistovna.logo, { name: pojistovna.logo });
      logos[pojistovna.logo] = 1;
    }

    if (pojistovna.app_automobil.use_in_app) {
      if (logosAuto[pojistovna.logo] != 1) {
        archiveAuto.file('main/logo/' + pojistovna.logo, { name: pojistovna.logo });
        logosAuto[pojistovna.logo] = 1;
      }
    }

  //  console.log(pojistovna.logo);
  }

  archiveAll.finalize();
  archiveAuto.finalize();
});

fs.writeFile('main/update.json', '{"update":"' + date.toISOString() + '"}', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});