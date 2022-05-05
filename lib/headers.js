import { updateProduct } from "./utils";

export function getHeaders(profile, date, cat, stores, jobStates){
  const funUpdate = async function(id, v){    //arrow function won't work as no this exist
    await updateProduct(date, cat, id, this.field, parseFloat(v));
  }

  let headers = [
    {
      label: '#',
      field: 'code',
      klass: 'tbl-cell w-8'
    },
    {
      label: 'Name',
      field: 'name',
      klass: 'tbl-cell w-32'
    },
    {
      label: 'WH#',
      field: 'warehouse.inventory',
      klass: 'tbl-cell w-12',
      bg: (jobStates && jobStates['warehouse']=='completed' ? ' bg-blue-200' : ' bg-pink-200'),
    },
    {
      label: 'WH$',
      field: 'warehouse.price',
      klass: 'tbl-cell w-12',
      bg: (jobStates && jobStates['warehouse']=='completed' ? ' bg-blue-200' : ' bg-pink-200'),
    },
  ];

  const order = {
    label: 'Order',
    field: 'order',
    klass: 'tbl-cell w-12',
    bg: (jobStates && jobStates['buyer']=='completed' ? ' bg-blue-200' : ' bg-pink-200'),
  };

  const sum = {
    label: 'Sum',
    field: (row, col)=>{
      let s = 0;
      for (let store of Object.keys(row.orders)){
        s = s + row.orders[store];
      }
      return s;
    },
    klass: 'tbl-cell w-12',
  };

  //console.log("stores=", stores);
  if (profile.role == "warehouse"){
    headers[2].update = funUpdate;
    headers[3].update = funUpdate;

    headers.push(order);
    headers.push(sum);
  }

  if (profile.role == "buyer"){
    headers.push(order);
    headers.push(sum);
    headers[4].update = funUpdate;
  }

  for (let store of stores){
    if (store.show){      
      let n;
      n = headers.push({
        label: `${store.name}#`,
        field: `inventory.${store.name}`,
        klass: 'tbl-cell w-16',
        bg: (jobStates && jobStates[store.name]=='completed' ? ' bg-blue-200' : ' bg-pink-200'),
      });
      if (profile.role=='store-buyer') headers[n-1].update = funUpdate;

      n = headers.push({
        label: `${store.name}$`,
        field: `orders.${store.name}`,
        klass: 'tbl-cell w-16',
        bg: (jobStates && jobStates[store.name]=='completed' ? ' bg-blue-200' : ' bg-pink-200'),
      })
      if (profile.role=='store-buyer' || profile.role=='buyer') headers[n-1].update = funUpdate;
    }
  }


  return headers;
}