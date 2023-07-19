'use client'

import Image from 'next/image'
import styles from './page.module.css'
import localFont from 'next/font/local'
import { Avatar, Button, Card, Collapse, Input, List, Modal, message } from 'antd/es'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

const Magda = localFont({ src: '../public/fonts/Magda.otf' })

const { TextArea } = Input

export default function Home() {
  const [data, setData] = useState([])

  const [open, setOpen] = useState(false)

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if(localStorage.getItem('chickenHeadcount')) {
      setData(JSON.parse(localStorage.getItem('chickenHeadcount')))
    }
  },[])

  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = () => {
    messageApi.open({
      type: 'success',
      content: 'Chicken added',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const idGenerator = () => {
      const S4 = () => {
        return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
      }
      return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    const data = {
      id: idGenerator(),
      name,
      age,
      description
    }

    if(localStorage.getItem('chickenHeadcount')) {
      const existingData = JSON.parse(localStorage.getItem('chickenHeadcount'))
      const updatedData = [...existingData, data]
      localStorage.setItem('chickenHeadcount', JSON.stringify(updatedData))

      setName('')
      setAge('')
      setDescription('')

      setData(updatedData)

      successMessage()

    } else {
      localStorage.setItem('chickenHeadcount', JSON.stringify([data]))

      setName('')
      setAge('')
      setDescription('')

      setData([data])

      successMessage()
    }
  }

  const items = [
    {
      key: '1',
      label: 'Add your chicken here',
      children: <Card bordered={false} className={Magda.className}
                 style={{width: '300px'}}>
                  <form onSubmit={handleSubmit}>
                    <p>Name:</p>
                    <Input placeholder='Snowflake' value={name}
                     onChange={(e) => setName(e.target.value)} required
                     className={Magda.className} style={{marginBottom: '1rem'}} />

                    <p>Age:</p>
                    <Input placeholder='3 years old' value={age}
                     onChange={(e) => setAge(e.target.value)} required
                     className={Magda.className} style={{marginBottom: '1rem'}} />

                    <p>Descripton:</p>
                    <TextArea placeholder='Brown with white spots on head'
                     value={description} className={Magda.className}
                     onChange={(e) => setDescription(e.target.value)}
                     style={{marginBottom: '1rem'}} required />

                    <div style={{display: 'flex', justifyContent: 'center'}}>
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

      {
        data.length > 0
          ? <div className={styles.listArea}>
              <List dataSource={data} renderItem={(item) => (
                <List.Item key={item.id} className={Magda.className}>
                  <List.Item.Meta avatar={<Avatar src='/images/chickenHead.svg' />}
                   title={`${item.name}, ${item.age}`} description={item.description} />
                </List.Item>
               )} />
            </div>
          : <></>
      }

      {contextHolder}
      <div className={styles.collapseArea}>
        <Collapse items={items} ghost size='large' className={Magda.className}
         expandIcon={({ isActive }) => <PlusOutlined rotate={isActive ? 135 : 0} />}
         onChange={() => {
          setName('')
          setAge('')
          setDescription('')
         }} />
      </div>

      <Modal centered open={open} className={Magda.className}
       onCancel={() => setOpen(false)} footer={null} wrapClassName='chickenModal'>
        <div style={{padding: '1rem'}}>
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
