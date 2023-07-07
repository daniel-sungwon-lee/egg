import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <main>
      <div className={styles.title}>
        Egg
      </div>
      <div className={styles.chickenImg}>
        <Image src={'/images/poultry.png'} alt='Chicken' width={512} height={512}
         draggable='false' />
      </div>
    </main>
  )
}
