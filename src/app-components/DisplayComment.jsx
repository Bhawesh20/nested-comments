import React, { useState } from 'react'
import AddComment from './AddComment';
import Button from '../components/Button';
import InputBox from '../components/InputBox';
import { saveToLocalStorage } from '../utils';
import deleteIcon from '../assets/delete.png';

const DisplayComment = (props) => {
    let comment = props.comment || {};
    let [showAddComment, setShowAddComment] = useState(false);
    let [isInEditMode, setIsInEditMode] = useState(false);
    let [editedComment, setEditedComment] = useState('')
    function addComment(name, comment, parentId) {
        setShowAddComment(false);
        return props.addComment(name, comment, parentId);
    }

    function deleteComment(){
        let arrIds = [];
        function getCommentIds(comment){
            arrIds.push(comment.id);
            for(let i in comment.children){
                getCommentIds(comment.children[i]);
            }
        }
        getCommentIds(comment);
        let filteredComments = props.commentList.filter((elem) => {
            return (!arrIds.includes(elem.id))
        });
        props.setCommentList(filteredComments);
        saveToLocalStorage("comments", filteredComments);
    }
    function updateComment(){
        let edited = editedComment?editedComment: props.comment.comment
        let updatedComments = props.commentList.map((elem) => {
            if(elem.id == comment.id){
                elem.comment = edited;
            }
            return elem;
        });
        props.setCommentList(updatedComments);
        saveToLocalStorage("comments", updatedComments);
        setIsInEditMode(false);
        setEditedComment('');
    }
    return (
        <div className='pl-6 gap-2 pt-4'>
            <div className='bg-gray-100 p-4 relative'>
                <div className='flex '>
                    <div className='font-bold whitespace-nowrap'>
                        {comment.name}
                    </div>
                    <div className='flex w-full flex-row-reverse pr-4'>
                        {comment.time}
                    </div>
                </div>
                {isInEditMode?
                    <div className='flex flex-col gap-2'>
                        <InputBox value={comment.comment} updateText={setEditedComment}/>
                        <Button onClick={updateComment} buttonText={"Save"}/>
                    </div>:
                    <>
                        <div>{comment.comment}</div>
                        <div className='flex gap-4 py-2 '>
                            <Button onClick={()=>{setShowAddComment(!showAddComment)}} buttonText={"Reply"}/>
                            <Button onClick={()=>{setIsInEditMode(true)}} buttonText={"Edit"}/>
                        </div>
                        <div className='absolute -right-3 top-12 cursor-pointer'>
                            <img src={deleteIcon} alt="delete" height="30px" width="30px" onClick={deleteComment}/>
                        </div>
                    </>
                }
                
                
            </div>
            <div className='pt-4 pl-6'>
                {showAddComment?<AddComment heading={"Reply"}  addComment={addComment} parentId={comment.id}/>: <></>}
            </div>
            <div className='children'>
            {props.comment.children.map(element => {
               return <DisplayComment comment={element} addComment={props.addComment} commentList={props.commentList} setCommentList={props.setCommentList}/> 
            })
            }
            </div>
            
            </div>
    )
}

export default DisplayComment