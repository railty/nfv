function pastDay(n){
  let d = new Date();
  d.setDate(d.getDate() - n);
  d = d.toLocaleString("en-ca").slice(0, 10);
  return d;
}

export const dates = [pastDay(0), pastDay(1), pastDay(2), pastDay(3), pastDay(4)];

export const stores = ['ALP', 'OFC', 'OFMM', 'WM1080', 'WM1116','WM1117','WM3135'];

