import { Music } from "@/models/music"
import ItemCard from "./itemCard/itemCard"
import "./style.css"




type CardListProps = {
  listMusics: Music[]
}


const CardList: React.FC<CardListProps> = ({ listMusics }) => {
  return (
    <div className='card'>
      <div>
        {listMusics.map(item => { return <ItemCard children={item.title} /> })}
      </div>
    </div>
  )
}

export default CardList
