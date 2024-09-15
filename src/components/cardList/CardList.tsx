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
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]
  return (
    <div className='card'>
      <h1>CardList</h1>
      <div>
        {listaDonwload.map(item => { return <ItemCard children={item} /> })}
      </div>
    </div>
  )
}

export default CardList
