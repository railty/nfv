import { setDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

function pastDay(n){
  let d = new Date();
  d.setDate(d.getDate() - n);
  d = d.toLocaleString("en-ca").slice(0, 10);
  return d;
}

export const dates = [pastDay(0), pastDay(1), pastDay(2), pastDay(3), pastDay(4)];

//export const stores = ['1970', '888', '250', '1080', '1116','1117','3135'];

export const cats = [
  { 
    name: "fruits",
    products: []
  }, 
  {
    name: "vegetables",
    products: []
  }
];

export const initStore = async (date, stores)=>{
  for (let cat of cats){
    cat.products = (await import(`../data/${cat.name}.json`)).default;
  }

  let i = 0;
  let all0 = stores.reduce((last, store)=>{
    last[store.name] = 0;
    return last;
  }, {});

  for (const cat of cats){
    console.log("cat=", cat);
    for (const product of cat.products){
      //console.log(cat.name, date, product.name);
      await setDoc(doc(db, date, cat.name, "products", product.code), {
        code: product.code,
        name: product.name,
        warehouse: {
          inventory: 0.0,
          price: 0.0
        },
        order: 0.0,
        inventory: all0,
        orders: all0
      });
      i++;
    }

    let allWorking = stores.reduce((last, store)=>{
      last[store.name] = "working";
      return last;
    }, {});

    allWorking['warehouse'] = "working";
    allWorking['buyer'] = "working";
    await setDoc(doc(db, date, cat.name), allWorking);
  }
  console.log("success, total:", i);
};

export const updateProduct = async (date, cat, code, field, value)=>{
  console.log(`update ${field} to ${value}`);
  const v = {};
  v[field] = value;
  await updateDoc(doc(db, date, cat, "products", code), v);
}

export const updateState = async (date, cat, store, state)=>{
  const v = {};
  v[store] = state;
  await updateDoc(doc(db, date, cat), v);
}
