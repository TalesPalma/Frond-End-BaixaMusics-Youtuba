type itemCardProps = {
  children: React.ReactNode
}

export default function ItemCard({ children }: itemCardProps) {
  return (
    <div className='itemCard'>
      {children}
    </div>
  )
}
