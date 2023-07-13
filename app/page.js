import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
      <div className={styles.title}>
        <a href='/egg' className='label'>
          Egg
        </a>
      </div>
      <div className={styles.chickenImg}>
        <Image src={'/images/poultry.svg'} alt='Chicken' width={512} height={512}
         draggable='false' className='image' />
      </div>
    </main>
  )
}
