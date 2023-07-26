'use client'

import Image from 'next/image'
import styles from './page.module.css'
import localFont from 'next/font/local'
import { Avatar, Button, Card, Collapse, Input, List, Modal, Popconfirm,
         message } from 'antd/es'
import { DeleteFilled, PlusOutlined, UploadOutlined, WarningFilled } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { Uploader } from 'uploader'

const uploader = Uploader({apiKey: 'free'})

const Magda = localFont({ src: '../public/fonts/Magda.otf' })

const { TextArea } = Input

export default function Home() {
  const [loaded, setLoaded] = useState(false)
  const [data, setData] = useState([])

  const [open, setOpen] = useState(false)
  const [collapseActive, setCollapseActive] = useState(false)

  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [description, setDescription] = useState('')
  const [imageURL, setImageURL] = useState('')

  useEffect(() => {
    if(localStorage.getItem('chickenHeadcount')) {
      setData(JSON.parse(localStorage.getItem('chickenHeadcount')))
      setLoaded(true)

    } else {
      setLoaded(true)
    }
  },[])

  const [messageApi, contextHolder] = message.useMessage();
  const successMessage = () => {
    messageApi.open({
      type: 'success',
      content: 'Chicken added',
      className: Magda.className
    });
  };
  const errorMessage = () => {
    messageApi.open({
      type: 'error',
      content: 'Chicken deleted',
      className: Magda.className
    });
  };
  const uploadMessage = (message, type) => {
    messageApi.open({
      type: type,
      content: message,
      className: Magda.className
    })
  }

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
      description,
      imageURL
    }

    if(localStorage.getItem('chickenHeadcount')) {
      const existingData = JSON.parse(localStorage.getItem('chickenHeadcount'))
      const updatedData = [...existingData, data]
      localStorage.setItem('chickenHeadcount', JSON.stringify(updatedData))

      setName('')
      setAge('')
      setDescription('')
      setImageURL('')

      setData(updatedData)

      successMessage()

    } else {
      localStorage.setItem('chickenHeadcount', JSON.stringify([data]))

      setName('')
      setAge('')
      setDescription('')
      setImageURL('')

      setData([data])

      successMessage()
    }
  }

  const handleDelete = (id) => {
    const data = JSON.parse(localStorage.getItem('chickenHeadcount'))

    const updated = data.filter(chicken => chicken.id !== id)
    localStorage.setItem('chickenHeadcount', JSON.stringify(updated))
    setData(updated)

    errorMessage()
  }

  const handleUpload = () => {
    uploader.open({maxFileCount: 1, styles: {fontFamilies: {base: Magda}}})
      .then(files => {
        if(files.length === 0) {
          uploadMessage('No image selected', 'error')

        } else {
          uploadMessage('Image uploaded', 'success')
          setImageURL(files[0].fileUrl)
        }
      })
      .catch(error => uploadMessage(error, 'error'))
  }

  const items = [
    {
      key: '1',
      label: collapseActive ? 'Close' : 'Add your chicken here',
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

                    <p>Photo: (optional)</p>
                    {
                      imageURL !== ''
                        ? <div style={{display: 'flex', justifyContent: 'center',
                           margin: '0.5rem 0'}}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={imageURL} alt='Uploaded photo' width={100}
                             draggable='false' />
                          </div>
                        : <></>
                    }
                    <Button onClick={handleUpload} type='dashed' block
                     style={{marginBottom: '1rem'}} icon={<UploadOutlined />}
                     className={Magda.className}>
                      Upload
                    </Button>

                    <div style={{display: 'flex', justifyContent: 'center',
                     margin: '1rem 0'}}>
                      <Button htmlType='submit' shape='round' className={Magda.className}
                       style={{background: '#FCE0B0', color: 'black'}} type='primary'>
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
        loaded
          ? <>
              {
                data.length > 0
                  ? <div className={styles.listArea}>
                      <List dataSource={data} renderItem={(item) => (
                        <List.Item key={item.id} className={Magda.className}>
                          <List.Item.Meta avatar={<Avatar src={item.imageURL === ''
                            ? '/images/chickenHead.svg' : item.imageURL} />}
                           title={`${item.name}, ${item.age}`}
                           description={item.description} />

                          <Popconfirm title={
                            <span className={Magda.className}>Delete chicken?</span>
                           }
                           okType='text' okText='yes' cancelText='no'
                           cancelButtonProps={{type: 'text', className: Magda.className}}
                           okButtonProps={{danger: true, className: Magda.className}}
                           icon={<WarningFilled style={{color: '#ff4d4f'}} />}
                           onConfirm={() => handleDelete(item.id)}>
                            <Button type='text' shape='circle' danger
                             icon={<DeleteFilled />} />
                          </Popconfirm>
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
                   if(document.querySelector('.ant-collapse-item-active')) {
                    setCollapseActive(true)
                   } else {
                    setCollapseActive(false)
                   }
                   setName('')
                   setAge('')
                   setDescription('')
                   setImageURL('')
                 }} />
              </div>
            </>
          : <></>
      }

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
