import ItemCard from "./itemCard/itemCard"
import "./style.css"




type CardListProps = {
  listMusics: string[]
}


const CardList: React.FC<CardListProps> = ({ listMusics }) => {
  return (
    <div className='card'>
      <div>
        {listMusics.map(item => { return <ItemCard children={item} /> })}
      </div>
    </div>
  )
}

export default CardList
