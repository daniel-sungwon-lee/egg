import Image from 'next/image'
import styles from './page.module.css'

export default function Egg() {
  return (
    <main className={styles.eggPage}>
      <div className={styles.eggImg}>
        <Image src={'/images/egg.svg'} alt='Egg' width={512} height={512}
         draggable='false' style={{background: '#D8E9E4'}} className='image' />
      </div>

      <div className={styles.subtitle}>
        <a href='/' style={{background: '#D8E9E4'}} className='label'>
          Chicken
        </a>
      </div>
    </main>
  )
}
