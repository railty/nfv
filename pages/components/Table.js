export default function Table({ body, head }) {
  console.log("body=", body);

  if (body && body.length>0) return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-0">
        <table className="border">
          <thead>
            <tr className=''>
              {head.map((h, i)=>(
                <th key={i} className={h.klass}>{h.label}</th>
              ))}
            </tr>
          </thead>
        </table>
      </div>

      <div className="flex-1 overflow-auto ">
        <table className="border">
          <thead>
            <tr className=''>
                {head.map((h, i)=>(
                  <th key={i} className={h.klass}></th>
                ))}
              </tr>
          </thead>

          <tbody className=''>
            {body.map((d)=>{
              return (
                <tr className=''>
                  {head.map((h)=>{
                    return (
                      <td className="tbl-cell">
                        {d[h.field]}
                      </td>
                    )
                  })}
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
