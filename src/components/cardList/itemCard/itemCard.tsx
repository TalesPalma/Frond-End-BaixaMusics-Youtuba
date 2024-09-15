type itemCardProps = {
  children: React.ReactNode
}

export default function ItemCard({ children }: itemCardProps) {
  return (
    <div className='bg-secondary w-full border-2 border-black rounded text-black shadow-black shadow-lg mt-2'>
      <p className='p-3'>Name:{children} Time:2.30</p>
    </div>
  )
}
