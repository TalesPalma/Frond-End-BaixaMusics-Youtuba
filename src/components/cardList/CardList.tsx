import ItemCard from "./itemCard/itemCard"
import "./style.css"

type CardListProps = {

}

const CardList: React.FC<CardListProps> = () => {
  const listaDonwload = [
    "1",
    "2",
    "3",
    "4",
    "7",
    "8",
  ]
  return (
    <div className='card'>
      <div>
        {listaDonwload.map(item => { return <ItemCard children={item} /> })}
      </div>
    </div>
  )
}

export default CardList
