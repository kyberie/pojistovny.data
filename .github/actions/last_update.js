var fs = require('fs');
var date = new Date();
const archiver = require('archiver');


fs.readFile('main/data.json', (err, data) => {
  let pojistovny = JSON.parse(data);
  let zip_name_all = pojistovny.logos_zip_file_all;
  let zip_name_automobil = pojistovny.logos_zip_file_automobil;
  let zip_name_domov = pojistovny.logos_zip_file_domov;

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
  
  var outputDomov = fs.createWriteStream('main/' + zip_name_domov);
  var archiveDomov = archiver('zip', {
    zlib: { level: 9 } 
  });
  archiveDomov.pipe(outputDomov);

  var logos = [];
  var logosAuto = [];
  var logosDomov = [];
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
	
	if (pojistovna.app_domov.use_in_app) {
      if (logosDomov[pojistovna.logo] != 1) {
        archiveDomov.file('main/logo/' + pojistovna.logo, { name: pojistovna.logo });
        logosDomov[pojistovna.logo] = 1;
      }
    }

  //  console.log(pojistovna.logo);
  }

  archiveAll.finalize();
  archiveAuto.finalize();
  archiveDomov.finalize();
});

fs.readFile('main/data_v2.json', (err, data) => {
  let pojistovny = JSON.parse(data);
  let zip_name_all = pojistovny.logos_zip_file_all;
  let zip_name_automobil = pojistovny.logos_zip_file_automobil;
  let zip_name_domov = pojistovny.logos_zip_file_domov;

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
  
  var outputDomov = fs.createWriteStream('main/' + zip_name_domov);
  var archiveDomov = archiver('zip', {
    zlib: { level: 9 } 
  });
  archiveDomov.pipe(outputDomov);

  var logos = [];
  var logosAuto = [];
  var logosDomov = [];
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
	
	if (pojistovna.app_domov.use_in_app) {
      if (logosDomov[pojistovna.logo] != 1) {
        archiveDomov.file('main/logo/' + pojistovna.logo, { name: pojistovna.logo });
        logosDomov[pojistovna.logo] = 1;
      }
    }

  //  console.log(pojistovna.logo);
  }

  archiveAll.finalize();
  archiveAuto.finalize();
  archiveDomov.finalize();
});

fs.writeFile('main/update.json', '{"update":"' + date.toISOString() + '"}', function (err) {
  if (err) throw err;
  console.log('Replaced!');
});