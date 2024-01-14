import React from 'react'

const Button = (props) => {
  return (
        <button className={"bg-[#0288D1] text-white w-[100px] text-sm"} type={props.type} onClick={props.onClick}>
            {props.buttonText}
        </button>
  )
}

export default Button