import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Comments from './app-components/AddComment'
import DisplayComment from './app-components/DisplayComment'
import { getFromLocalStorage, makeTree, saveToLocalStorage } from './utils'

function App() {
  const [commentList, setCommentList] = useState(getFromLocalStorage("comments") || []);
  const [counter, setCounter] = useState(getFromLocalStorage("counter") || 1);
  const [sortAsc, setSortAsc] = useState(false);
  function addComment(name, comment, parentId){
    let commentObj = {
      id: counter,
      name: name,
      comment: comment,
      'time': (new Date()).toISOString(),
      parentId: parentId
    }
    let updatedCounter = counter + 1;
    let updatedCommentList = [...commentList, commentObj];
    saveToLocalStorage("comments", updatedCommentList);
    setCommentList([...commentList, commentObj]);
    saveToLocalStorage("counter", updatedCounter);
    setCounter(updatedCounter);
  }

  return (
    <div>
      <Comments addComment={addComment} parentId={null}/>
      <div className='p-2 pr-6 text-right'>
        SortBy <button onClick={() => setSortAsc(!sortAsc)}> {sortAsc? "Ascending" : "Descending"} </button>
      </div>
      {makeTree(commentList.sort((a,b)=>{
          if(sortAsc){
            return (new Date(a.time) - new Date(b.time));
          } else {
            return (new Date(b.time) - new Date(a.time));
          }
      })).map(comment =>{
        return (
          <div className='px-6 w-screen'>
            <DisplayComment comment={comment} addComment={addComment} commentList={commentList} setCommentList={setCommentList}/>
          </div>
        );
      })}
    </div>

  )
}

export default App
