'use client'

import Image from 'next/image'
import styles from './page.module.css'
import Lottie from 'lottie-react'
import chickAnimation from '/public/lottie/chick.json'
import { gsap } from 'gsap'
import { useEffect, useState } from 'react'
import { Avatar, Badge, Button, Calendar, Card, Collapse, DatePicker, InputNumber,
         List, Popconfirm, Space, Tooltip, message } from 'antd/es'
import localFont from 'next/font/local'
import { DeleteFilled, PlusOutlined, WarningFilled } from '@ant-design/icons'
import dayjs from 'dayjs'

const Magda = localFont({ src: '../../public/fonts/Magda.otf' })

export default function Egg() {
  const [screenWidth, setScreenWidth] = useState(screen.availWidth)

  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState([])

  const [icon, setIcon] = useState('egg')

  const [calendarMode, setCalendarMode] = useState('month')

  const [active, setActive] = useState(false)

  const [date, setDate] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    if(localStorage.getItem('eggCount')) {
      setData(JSON.parse(localStorage.getItem('eggCount')))
      setLoaded(true)

    } else {
      setLoaded(true)
    }

    window.addEventListener('resize', (e) => {
      setScreenWidth(screen.availWidth)
    })
  },[])

  const [messageApi, contextHolder] = message.useMessage();
  const toastMessage = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
      className: Magda.className
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    const idGenerator = () => {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }
      return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }
    const data = {
      id: idGenerator(),
      date: dayjs(date).format('dddd, MMMM D, YYYY'),
      amount,
    }

    if(localStorage.getItem('eggCount')) {
      const existingData = JSON.parse(localStorage.getItem('eggCount'))
      const updatedData = [...existingData, data]
      localStorage.setItem('eggCount', JSON.stringify(updatedData.sort((a,b) =>
        new Date(b.date) - new Date(a.date))))

      setDate('')
      setAmount('')

      setData(updatedData.sort((a,b) => new Date(b.date) - new Date(a.date)))

      toastMessage('success', 'Egg(s) added')

    } else {
      localStorage.setItem('eggCount', JSON.stringify([data]))

      setDate('')
      setAmount('')

      setData([data])

      toastMessage('success', 'Egg(s) added')
    }
  }

  const handleDelete = (id) => {
    const data = JSON.parse(localStorage.getItem('eggCount'))

    const updated = data.filter(egg => egg.id !== id)
    localStorage.setItem('eggCount', JSON.stringify(updated))
    setData(updated)

    toastMessage('error', 'Deleted')
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
                     className={Magda.className} disabledDate={(currentDate) =>
                      dayjs().isBefore(currentDate)} required />

                    <p>Amount:</p>
                    <InputNumber value={amount} onChange={(value)=>setAmount(value)}
                     style={{marginBottom: '1rem'}} min={0} className={Magda.className}
                     placeholder='3' required />

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

  const cellRender = (currentDate, info) => {
    if(info.type === 'month') {
      const eggEntries = []

      for (let i = 0; i < data.length; i++) {
        if (dayjs(data[i].date).month() === dayjs(currentDate).month() &&
            dayjs(data[i].date).year() === dayjs(currentDate).year()) {
          eggEntries.push(data[i])
        }
      }

      return (
        <div style={{marginTop: '0.75rem'}}>
          {
            eggEntries.map(entry => (
              <Tooltip title={`${entry.amount} ${entry.amount === 1 ? 'egg' : 'eggs'}`}
               key={entry.id}>
                <Badge count={entry.amount} showZero title={false}
                 className={Magda.className}>
                  <Tooltip title={`${entry.amount} ${entry.amount === 1 ? 'egg' : 'eggs'}`}>
                    <Avatar src='/images/egg-alt.svg' />
                  </Tooltip>
                </Badge>
              </Tooltip>
            ))
          }
        </div>
      )

    } else {
      const eggEntries = []

      for(let i=0; i<data.length; i++) {
        if (data[i].date === dayjs(currentDate).format('dddd, MMMM D, YYYY')) {
          eggEntries.push(data[i])
        }
      }

      return (
        <div style={{marginTop: '0.75rem'}}>
          {
            eggEntries.map(entry => (
              <Space key={entry.id}>
                {
                  screenWidth < 767
                    ? <Tooltip title={`${entry.amount} ${entry.amount === 1 ? 'egg' : 'eggs'}`}>
                        <Badge count={entry.amount} showZero title={false}
                         className={Magda.className} />
                      </Tooltip>
                    : <Tooltip title={`${entry.amount} ${entry.amount === 1 ? 'egg' : 'eggs'}`}>
                        <Badge count={entry.amount} showZero title={false}
                         className={Magda.className}>
                          <Tooltip title={`${entry.amount} ${entry.amount === 1 ? 'egg' : 'eggs'}`}>
                            <Avatar src='/images/egg-alt.svg' />
                          </Tooltip>
                        </Badge>
                      </Tooltip>
                }
              </Space>
            ))
          }
        </div>
      )
    }
  }

  const handleSelect = (date, info) => {
    if(info.source === 'date') {
      if(!active) {
        document.querySelector('.ant-collapse-header').click()
        setTimeout(() => {
          window.scrollTo({top: document.querySelector('.ant-collapse-item').offsetTop, behavior: 'smooth' });
          setDate(date)
        }, 300)

      } else {
        window.scrollTo({top: document.querySelector('.ant-collapse-item').offsetTop, behavior: 'smooth' });
        setDate(date)
      }

    } else if(info.source === 'month' && calendarMode === 'year') {
      setCalendarMode('month')
    }
  }

  const panelChange = (date, mode) => {
    if(mode === 'month') {
      setCalendarMode(mode)

    } else {
      setCalendarMode(mode)
    }
  }

  return (
    <main className={styles.eggPage}>
      {
        icon === 'egg' ? <div className={`${styles.eggImg} egg`}>
                           <Image src={'/images/egg.svg'} alt='Egg' width={512}
                            height={512} draggable='false' style={{cursor: 'pointer'}}
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
                            width: '460px'}} />
                         </div>
      }
      <div className={styles.subtitle}>
        <a href='/' className='label'>
          Chicken
        </a>
      </div>
      {
        loaded
          ? <>
              <div className={`${styles.calendar} calendar`}>
                <Calendar className={Magda.className} style={{padding: '1rem',
                  borderRadius: '1.5rem'}} cellRender={cellRender}
                 onSelect={handleSelect} mode={calendarMode} onPanelChange={panelChange} />
              </div>

              {
                data.length > 0
                  ? <div className={styles.list}>
                      <List dataSource={data} renderItem={(item) => (
                        <List.Item key={item.id} className={Magda.className}>
                          <List.Item.Meta avatar={<Avatar src='/images/egg-alt.svg' />}
                           title={`${item.amount} ${item.amount === 1 ? 'egg' : 'eggs'}`}
                           description={item.date} />

                          <Popconfirm title={<span className={Magda.className}>Delete?</span>}
                           okType='text' okText='yes' cancelText='no'
                           cancelButtonProps={{type: 'text', className: Magda.className}}
                           okButtonProps={{danger: true, className: Magda.className}}
                           icon={<WarningFilled style={{color: '#ff4d4f'}} />}
                           onConfirm={() => handleDelete(item.id)}>
                            <Button type='text' shape='circle' danger icon={
                              <DeleteFilled />
                             } />
                          </Popconfirm>
                        </List.Item>
                       )} />
                    </div>
                  : <></>
              }

              {contextHolder}
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
            </>
          : <></>
      }
    </main>
  )
}
