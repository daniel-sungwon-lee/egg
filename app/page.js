'use client'

import Image from 'next/image'
import styles from './page.module.css'
import localFont from 'next/font/local'
import { Card, Collapse, Modal } from 'antd/es'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

const Magda = localFont({ src: '../public/fonts/Magda.otf' })

const items = [
  {
    key: '1',
    label: 'Add your chicken here',
    children: <Card bordered={false} bodyStyle={{background: 'white'}}
               className={Magda.className}>
                Hello
              </Card>
  }
]

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

      <div className={styles.collapseArea}>
        <Collapse items={items} ghost size='large' className={Magda.className}
         expandIcon={({ isActive }) => <PlusOutlined rotate={isActive ? 135 : 0} />} />
      </div>

      <Modal centered open={open} style={{background: 'none'}}
       onCancel={() => setOpen(false)} footer={null} wrapClassName='chickenModal'
       closeIcon={false} className={Magda.className}>
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
