'use client'

import Image from 'next/image'
import styles from './page.module.css'
import localFont from 'next/font/local'
import { Button, Card, Collapse, Input, Modal } from 'antd/es'
import { PlusOutlined } from '@ant-design/icons'
import { useState } from 'react'

const Magda = localFont({ src: '../public/fonts/Magda.otf' })

const { TextArea } = Input

export default function Home() {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const items = [
    {
      key: '1',
      label: 'Add your chicken here',
      children: <Card bordered={false} bodyStyle={{ background: 'white' }}
                 className={Magda.className} style={{width: '300px'}}>
                  <form onSubmit={handleSubmit} style={{background: 'white'}}>
                    <p style={{background: 'white'}}>Name:</p>
                    <Input placeholder='Snowflake' value={name}
                     onChange={(e) => setName(e.target.value)} required
                     className={Magda.className} style={{marginBottom: '1rem'}} />

                    <p style={{background: 'white'}}>Age:</p>
                    <Input placeholder='3 years' value={age}
                     onChange={(e) => setAge(e.target.value)} required
                     className={Magda.className} style={{marginBottom: '1rem'}} />

                    <p style={{background: 'white'}}>Descripton:</p>
                    <TextArea placeholder='Brown with white spots on head'
                     value={description} className={Magda.className}
                     onChange={(e) => setDescription(e.target.value)}
                     style={{marginBottom: '1rem'}} required />

                    <div style={{display: 'flex', justifyContent: 'center', background: 'white'}}>
                      <Button htmlType='submit' shape='round' className={Magda.className}
                       style={{background: '#FCE0B0'}} type='text'>
                        Submit
                      </Button>
                    </div>
                  </form>
                </Card>
    }
  ]

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
