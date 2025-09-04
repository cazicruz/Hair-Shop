import React,{useState} from 'react'
import { Button, Checkbox, Form, Input, Flex,Modal } from 'antd';


function LoginForm({openModal,setOpenModal}) {
    const [isLoading,setIsLoading] = useState(false);

    const onFinish = values => {
        console.log('Received values of form: ', values);
    };
  return (
    <Modal
    title={'Login'}
    open={openModal}
    confirmLoading={isLoading}
    onCancel={() => setOpenModal(false)}
    // closable={{ 'aria-label': 'Custom Close Button' }}
    onOk={()=>setOpenModal(false)}

    >


        footer{
          <Button type="primary" onClick={()=>{
            setOpenModal(false)
            setIsLoading(true)
            }}>
            Reload
          </Button>
        }
    </Modal>
  )
}

export default LoginForm