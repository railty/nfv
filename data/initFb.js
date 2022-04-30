const fs = require('fs');

function init(cat){
  let products = [];
  const data = fs.readFileSync(__dirname + `/${cat}.txt`, 'utf8');
  let ls = data.split("\n");
  for (const l of ls){
    let [name, code] = l.split("\t");
    code = parseInt(code);
    products.push({
      name, 
      code: code.toString()
    });
  }
  fs.writeFileSync(__dirname + `/${cat}.json`, JSON.stringify(products, null, 2), 'utf8');  
  //console.log(products);
}

init('fruits');
init('vegetables');


