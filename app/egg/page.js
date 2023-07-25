'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Lottie from 'lottie-react'
import chickAnimation from '/public/lottie/chick.json'
import { gsap } from 'gsap'
import { useState } from 'react'
import { Button, Card, Collapse, DatePicker, InputNumber } from 'antd/es'
import localFont from 'next/font/local'
import { PlusOutlined } from '@ant-design/icons'

const Magda = localFont({ src: '../../public/fonts/Magda.otf' })

export default function Egg() {
  const [icon, setIcon] = useState('egg')

  const [active, setActive] = useState(false)

  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const items = [
    {
      key: '1',
      label: active ? 'Close' : 'Add egg(s)',
      children: <Card bordered={false} className={Magda.className}
                 style={{width: '300px'}}>
                  <form onSubmit={handleSubmit}>
                    <p>Date:</p>
                    <DatePicker value={date} onChange={(value) => setDate(value)}
                     style={{marginBottom: '1rem'}} format={'MM/DD/YYYY'}
                     className={Magda.className} />

                    <p>Amount:</p>
                    <InputNumber value={amount} onChange={(value)=>setAmount(value)}
                     style={{marginBottom: '1rem'}} min={0} className={Magda.className}
                     placeholder='3' />

                    <div style={{display: 'flex', justifyContent: 'center'}}>
                      <Button htmlType='submit' shape='round' className={Magda.className}
                      style={{background: '#D8E9E4', color: 'black'}} type='primary'>
                        Add
                      </Button>
                    </div>
                  </form>
                </Card>
    }
  ]

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
                            draggable='false' className='image' style={{margin: '4rem 2rem',
                            background: '#D8E9E4', width: '460px'}} />
                         </div>
      }
      <div className={styles.subtitle}>
        <a href='/' style={{background: '#D8E9E4'}} className='label'>
          Chicken
        </a>
      </div>

      <div className={styles.collapse}>
        <Collapse items={items} ghost size='large' className={Magda.className}
         expandIcon={({isActive}) => <PlusOutlined rotate={isActive ? 135 : 0} />}
         onChange={() => {
          if(document.querySelector('.ant-collapse-item-active')) {
            setActive(true)
          } else {
            setActive(false)
          }
          setDate('')
          setAmount('')
         }} />
      </div>
    </main>
  )
}
