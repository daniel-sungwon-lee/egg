'use client'

import Image from 'next/image'
import styles from './page.module.css'
import { Modal } from 'antd'
import { useState } from 'react'

export default function Home() {
  const [open, setOpen] = useState(false)

  return (
    <main>
      <div className={styles.title}>
        <a href='/egg' className='label'>
          Egg
        </a>
      </div>
      <div className={styles.chickenImg}>
        <Image src={'/images/poultry.svg'} alt='Chicken' width={512} height={512}
         draggable='false' className='image' onClick={() => setOpen(true)}
         style={{cursor: 'pointer'}} />
      </div>

      <Modal centered open={open} style={{background: 'none'}}
       onCancel={() => setOpen(false)} footer={null} wrapClassName='chickenModal'
       closeIcon={false}>
        <div style={{background: 'white', padding: '1rem'}}>
          This project was inspired by my aunt&apos;s chicken farm that I had to take
          care of during the spring. I remember having to headcount all of the 10
          chickens by the end of the day (to make sure all of them returned to the coop),
          and had to harvest the eggs every other day. Doing that for 3 weeks gave
          me the idea of building an app that helps you keep track of that work,
          as well as the aesthetics/design of this app you see. So this app is
          dedicated to all the chicken farmers out there!
        </div>
      </Modal>
    </main>
  )
}
