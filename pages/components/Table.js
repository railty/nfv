export default function Table({ products }) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-0">
        <table className="border">
          <thead>
            <tr className=''>
              <th className="tbl-cell w-64">Name</th>
              <th className="tbl-cell w-64">Value</th>
            </tr>
          </thead>
        </table>
      </div>

      <div className="flex-1 overflow-auto ">
        <table className="border">
          <thead>
            <tr className=''>
              <th className="tbl-cell w-64"></th>
              <th className="tbl-cell w-64"></th>
            </tr>
          </thead>
          <tbody className=''>
            {products.map((d)=>(
              <tr>
                <td className="tbl-cell">{d.name}</td>
                <td className="tbl-cell">{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>      
  )
}
