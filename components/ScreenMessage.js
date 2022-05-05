export default function ScreenMessage({ msg }) {
return (
    <div className="h-screen flex justify-center items-center">
      <h1>{msg}</h1>
    </div>
  ) 
}