import Link from 'next/link'
import './styles.css'
type MenuProps = {

}


const Menu: React.FC<MenuProps> = () => {
  return (
    <div className='menu'>
      <Link href={"/"} className='menu-item'>Home</Link>
      <Link href={`/download?link=`} className='menu-item'>Download</Link>
      <Link href={"/upload"} className='menu-item'>Upload</Link>
    </div>
  )
}


export default Menu
