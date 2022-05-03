import { stores, updateProduct } from "../utils";

export function getHeaders(profile, date, cat){
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
    },
    {
      label: 'WH$',
      field: 'warehouse.price',
      klass: 'tbl-cell w-12',
    },
  ];

  const order = {
    label: 'Order',
    field: 'order',
    klass: 'tbl-cell w-12',
    update: funUpdate
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

  if (profile.role == "warehouse"){
    headers.push(order);
    headers.push(sum);

    for (let store of stores){
      headers.push({
        label: `${store.toUpperCase()}#`,
        field: `inventory.${store}`,
        klass: 'tbl-cell w-16',
      })
      headers.push({
        label: `${store.toUpperCase()}$`,
        field: `orders.${store}`,
        klass: 'tbl-cell w-16',
      })
    }    
    for (let i of [2, 3, 7, 9, 11, 13, 15, 17, 19]){
      headers[i].update = funUpdate;
    }
  }

  if (profile.role == "buyer"){
    headers.push(order);
    headers.push(sum);

    for (let store of stores){
      headers.push({
        label: `${store.toUpperCase()}#`,
        field: `inventory.${store}`,
        klass: 'tbl-cell w-16',
      })
      headers.push({
        label: `${store.toUpperCase()}$`,
        field: `orders.${store}`,
        klass: 'tbl-cell w-16',
      })
    }
  
    for (let i of [4, 7, 9, 11, 13, 15, 17, 19]){
      headers[i].update = funUpdate;
    }
  }

  if (profile.role == "store-buyer"){
    const store = profile.stores[0];

    headers.push({
      label: `${store.toUpperCase()}#`,
      field: `inventory.${store}`,
      klass: 'tbl-cell w-16',
      update: funUpdate
    })
    headers.push({
      label: `${store.toUpperCase()}$`,
      field: `orders.${store}`,
      klass: 'tbl-cell w-16',
      update: funUpdate
    });
  }

  return headers;
}