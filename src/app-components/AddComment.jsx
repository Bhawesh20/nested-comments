import React, { useState } from 'react'
import InputBox from '../components/InputBox';
import Button from '../components/Button';

const AddComment = (props) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  function submit(event){
    event.preventDefault();
    setName('');
    setComment('');
    let name = event.target[0].value;
    let comment = event.target[1].value;
    props.addComment(name, comment, props.parentId);
  }
  return (
    <div className='flex bg-gray-100 p-4 w-full'>
        <div className='flex flex-col p-2 gap-2 w-96'>
          <h3> {props.heading?? 'Comment'} </h3>
          <form onSubmit={submit} className='flex flex-col gap-2'>
            <InputBox placeholder="name" isRequired={true}/>
            <InputBox placeholder="comment" isRequired={true}/>
            <div className='text-right'>
              <Button buttonClass='bg-[#0288D1]' buttonText="POST" type="submit"/>
            </div>
          </form>
        </div>
        
    </div>
  )
}

export default AddComment