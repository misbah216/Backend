import { useEffect, useState } from 'react'
import axios from "axios"

function App() {
  const [notes, setNotes] = useState([])

  function fetchnotes(){
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data)
      })

  }

  function handleSubmit(e){
    e.preventDefault()

  const {title,description} = e.target.elements

  console.log(title.value,description.value)
  axios.post("http://localhost:3000/api/notes",{
    title:title.value,
    description:description.value
  })
  .then(res=>{
    console.log(res.data)
    fetchnotes(); // Refresh the notes list
  })
  }

  useEffect(() => {
    fetchnotes();
  }, [])

  function HandleDeleteNote(noteId){
    axios.delete("http://localhost:3000/api/notes/"+noteId)
    .then(res=>{
      fetchnotes(); // Refresh the notes list after deletion
    })
  }
  return (
    <>
    <form className='note-create-form' onSubmit={handleSubmit}>
      <input name='title' type='text' placeholder=' Enter title'/>
      <input name='description' type='text' placeholder="Enter description"/>
      <button name="submit ">Create Note</button>
    </form>
     <div className="notes">
      {
        notes.map((note) => (
          <div className="note" key={note._id || note.title}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>
            <button name="delete" onClick={()=> HandleDeleteNote(note._id)}>Delete</button>
          </div>
        ))
      }
     </div>
    </>
  )
}

export default App
