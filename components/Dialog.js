export default function Dialog({title, children}) {
  return (
    <div className="modal modal-open">
      <div className="modal-box relative">
        <div className="flex flex-col">
          <div className="flex justify-center p-4">
            <div className="text-lg font-bold">{title}</div>
          </div>

          {children}

        </div>
      </div>
    </div>
  )
}
