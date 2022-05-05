import CellInput from "./CellInput";

export default function Cell({row, col}) {
  //get the value
  const fd = col.field;
  let value;

  if (typeof fd == "string"){
    const fds = fd.split(".");
    value = row[fds[0]];
    for (let i=1; i<fds.length; i++){
      value = value[fds[i]];
    }
  }
  else if (typeof fd == "function"){
    value = fd(row, col);
  }
  else value = "not implemented";

  if ((typeof value == "number") && isNaN(value)) value = 0;

  //if editable
  //update with id from hardcoded code field
  if (col.update) return <CellInput initValue={value} row={row} col={col}/>
  return value;
}
