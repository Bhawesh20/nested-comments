import React, { useState } from 'react'

const InputBox = (props) => {
  let [value, setValue] = useState(props.value);
  function updateText(e){
    setValue(e.target.value);
    if(props.updateText){
      props.updateText(e.target.value);
    }
  }
  return (
    <>
      <input className='p-2 border-solid border-2 rounded' onChange={updateText} value={value} placeholder={props.placeholder} required={props.isRequired}/>
    </>
  )
}

export default InputBox;