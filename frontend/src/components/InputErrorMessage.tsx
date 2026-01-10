
export default function ErrorMessage({message}:{message:string}) {
  return (
    <div className="text-red-500 p-2 text-sm">{message}</div>
  )
}
