export default function Cell({value, onChange}) {
  if (onChange) return (
    <td className="tbl-cell">
      <input className="small-input w-full" type="number" value={value} onChange={(e)=>onChange(e.target.value)} min="0"/>
    </td>
  )
  else return (
    <td className="tbl-cell">
      {value}
    </td>
  );
}
