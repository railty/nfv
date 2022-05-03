import {useState} from "react";

export default function CellInput({initValue, row, col}) {
  const [value, setValue] = useState(initValue);
  const onChange=(e)=>{
    setValue(e.target.value);
  }

  const onKeyDown=(e)=>{
    if (e.keyCode == 13) {
      var currInput = document.activeElement;
      if (currInput.tagName.toLowerCase() == "input") {
        var inputs = document.getElementsByTagName("input");
        var currInput = document.activeElement;
        for (var i = 0; i < inputs.length; i++) {
          if (inputs[i] == currInput) {
            var next = inputs[i + 1];
            if (next && next.focus) {
              next.focus();
              next.select();
            }
            break;
          }
        }
      }
    };
  }

  const onBlur=(e)=>{
    col.update(row['code'], e.target.value);
  }

  //if editable
  //update with id from hardcoded code field
  return (<input className="small-input w-full" type="number" value={value} onChange={onChange} onBlur={onBlur} onKeyDown={onKeyDown} min="0"/>);
}
