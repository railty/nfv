import Cell from "./Cell";

export default function Table({ rows, cols }) {
  if (rows && rows.length>0) return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-0">
        <table className="border">
          <thead>
            <tr className=''>
              {cols.map((col, i)=>(
                <th key={i} className={col.klass}>{col.label}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      <div className="flex-1 overflow-auto ">
        <table className="border">
          <thead>
            <tr className=''>
                {cols.map((col, i)=>(
                  <th key={i} className={col.klass}></th>
                ))}
              </tr>
          </thead>

          <tbody className=''>
            {rows.map((row, i)=>{
              return (
                <tr key={i} className=''>
                  {cols.map((col, k)=>(
                    <td key={k} className="tbl-cell">
                      <Cell row={row} col={col}/>  
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>      
  )
  else return null;
}
