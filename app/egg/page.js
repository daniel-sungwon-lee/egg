'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Lottie from 'lottie-react'
import chickAnimation from '/public/lottie/chick.json'
import { gsap } from 'gsap'
import { useState } from 'react'

export default function Egg() {
  const [icon, setIcon] = useState('egg')

  return (
    <main className={styles.eggPage}>
      {
        icon === 'egg' ? <div className={`${styles.eggImg} egg`}>
                           <Image src={'/images/egg.svg'} alt='Egg' width={512}
                            height={512} draggable='false' style={{background: '#D8E9E4',
                            cursor: 'pointer'}}
                            className='image' onClick={() => {
                              const tl = gsap.timeline()
                              tl.to('.egg', {transform: 'rotate(15deg)'})
                                .to('.egg', {transform: 'rotate(-30deg)'})
                                .to('.egg', {transform: 'rotate(15deg)'})
                                .to('.egg', {transform: 'rotate(0deg)'})
                                .to('.egg', {transform: 'rotate(15deg)', duration:0.25}, '<0.5')
                                .to('.egg', {transform: 'rotate(-30deg)', duration:0.25})
                                .to('.egg', {transform: 'rotate(15deg)', duration:0.25})
                                .to('.egg', {transform: 'rotate(0deg)', duration:0.25})
                                .to('.egg', {opacity: 0, duration: 1, ease: 'power3.inOut',
                                    onComplete: () => setIcon('chick')}, '<1')
                            }} />
                         </div>
                       : <div className={`${styles.lottie} chick`} style={{opacity: 1}}>
                           <Lottie animationData={chickAnimation} loop autoplay
                            draggable='false' className='image' style={{margin: '4rem 0',
                            background: '#D8E9E4', width: '460px'}} />
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
