import React, { useState } from 'react'
import AddComment from './AddComment';

const Comment = (props) => {
  let [showAddComment, setShowAddComment] = useState(false);
  return (
    <div>
        <div className='flex '>
                <div className='font-bold'>
                    {props.comment.name}
                </div>
                <div className='flex w-full flex-row-reverse'>
                    {props.comment.time}
                </div>
            </div>
            <div>{props.comment.comment}</div>
            <button onClick={()=>{setShowAddComment(!showAddComment)}}>
                Reply
            </button>
            {showAddComment?<AddComment  addComment={props.addComment} parentId={props.comment.id}/>: <></>}
    </div>
  )
}

export default Comment