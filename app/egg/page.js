'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Lottie from 'lottie-react'
import chickAnimation from '/public/lottie/chick.json'
import { useState } from 'react'

export default function Egg() {
  const [icon, setIcon] = useState('egg')

  return (
    <main className={styles.eggPage}>
      {
        icon === 'egg' ? <div className={styles.eggImg}>
                           <Image src={'/images/egg.svg'} alt='Egg' width={512}
                            height={512} draggable='false' style={{background: '#D8E9E4',
                            cursor: 'pointer'}}
                            className='image' onClick={() => setIcon('chick')} />
                         </div>
                       : <div className={styles.lottie}>
                           <Lottie animationData={chickAnimation} loop autoplay
                            draggable='false' className='image' style={{margin: '5rem 0',
                            cursor: 'pointer'}}
                            onClick={() => setIcon('egg')} />
                         </div>
      }
      <div className={styles.subtitle}>
        <a href='/' style={{background: '#D8E9E4'}} className='label'>
          Chicken
        </a>
      </div>
    </main>
  )
}
