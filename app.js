const googleMapsClient = require('@google/maps').createClient({
  key: ' ', // Coloca sua Chave aqui que pra funcionar
  Promise: Promise
});

//var endereco ='40720635'
const readline = require('readline');

const endereco = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function calculaTudo (address){
//aqui esse metodo recebe uma string com o endereço e converte ele em um objeto
//que contem Lat-Long do endereço passado
  const ende = await googleMapsClient.geocode({address})
  .asPromise()
  //return response.json.results[0].geometry.location;
 // console.log(response.json.rows[0].elements[0]);

// aqui nos transformamos o endereço em Lat-Long e depois formatamos em uma string que pode ser recebida
// pelo metodo de calcular a distancia
  var latc = ende.json.results[0].geometry.location.lat
  var longc = ende.json.results[0].geometry.location.lng
  var localizacao = latc+','+longc
 
//esse metodo calcula a distancia entre dois arrays um de origem e um de destino no nosso caso so temos
//uma origem que esta na variavel $endereço ela recebe uma string que pode ser um Cep, uma lat-Long, ou endereço q converte
// em objetos que tem os valores da distancia em Km ou M, e o tempo de duração para aquelas distancias.

 const dist = await googleMapsClient.distanceMatrix({
    origins: [localizacao],
   //unidades Labchecap em Lat-Long
    destinations:['-12.998959, -38.460811',
    '-12.989714, -38.460826',
    '-12.938284, -38.402349',
    '-13.004894, -38.517459 ',
    '-13.003465, -38.529726',
    '-12.982687, -38.497635',
    '-12.991018, -38.484615',
    '-12.959629, -38.467735',
    '-12.899382, -38.408695',
    '-12.928907, -38.503599',
    '-12.992381, -38.521532',
    '-12.992341, -38.447760',
    '-13.003955, -38.502415',
    '-12.998249, -38.524628',
    '-12.987644, -38.450724',
    '-12.968705, -38.429463',
    '-12.939551, -38.362759',
    '-12.950346, -38.497866',
    '-12.973372, -38.493158',
    '-12.967047, -38.437126',
    '-12.840638, -38.470283',
    '-12.960673, -38.406535',
    '-12.921412, -38.441696',
    '-12.866906, -38.476835',
    '-13.003709, -38.458156',
    '-13.012416, -38.489554',
    '-12.960016, -38.450090',
    '-12.978491, -38.455081',
    '-12.932695, -38.479771',
    '-12.935530, -38.424715',
    '-12.935911, -38.395029',
    '-12.935291, -38.344042',
    '-12.939640, -38.432344',
    ]
  })
  .asPromise()
  
  var mDist = dist.json.rows[0].elements[0].distance.value
  var mEnd = dist.json.rows[0].elements[0]
  var distancias = dist.json
  var mDistText = dist.json.rows[0].elements[0].distance.text
  var count = 0

  distancias.rows[0].elements.forEach(element => {
    if (element.distance.value <= mDist) {
      mDist = element.distance.value
      mDistText = element.distance.text
      mEnd = distancias.destination_addresses[count]
      //console.log(count);  
    }
    count = count + 1;
  });

  //console.log(ende.json.results[0].geometry.location);
  //console.log(dist.json.destination_addresses);
  //console.log(localizacao);
  console.log('A menor distancia é de '+mDistText+' que fica em '+mEnd);
  
  return dist.json.rows[0].elements[0]
}

endereco.question('--> Digite o CEP ou Endereço: ', (answer) => {
  // TODO: Log the answer in a database
 // console.log(`Thank you for your valuable feedback: ${answer}`);
  //console.log(typeof answer);
  calculaTudo(answer.toString());
  endereco.close();
});

