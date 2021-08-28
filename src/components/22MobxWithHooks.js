// 如果在Hooks用mobx，需要安装mobx，mobx-react-lite两个库
import { useLocalStore, useObserver } from 'mobx-react-lite'
import React, { Component } from 'react'
import {nanoid} from 'nanoid'

function createNotesStore () {
  return {
    notes: [],
    addNote(text){
      this.notes.push({ text, id: nanoid() })
    },
    removeNote(id){
      this.notes = this.notes.filter(note => note.id !== id)
    }
  }
}

// context， Provider
const NotesContext = React.createContext(null)
const NotesProvider = ({ children }) => {
  const notesStore = useLocalStore(createNotesStore)
  return <NotesContext.Provider value={notesStore}>
    {children}
  </NotesContext.Provider>
}
const useNotesStore = () => React.useContext(NotesContext)


const MobxUse = () => {
  const notesStore = useNotesStore()
  return useObserver(() => (<> 
      <ul>
        {notesStore.notes.map( note => <li key={note.id} 
          onClick={()=> notesStore.removeNote(note.id)}
        >{note.text}</li>)}
      </ul>
      <NewNoteForm/>
    </>))
    
}

const NewNoteForm = () => {
  const [noteText, setNoteText] = React.useState('')
  const notesStore = useNotesStore()
  return <>
    <input value={noteText} type="text" onChange={e => setNoteText(e.target.value)} />
    <button onClick={()=> notesStore.addNote(noteText)}>
      Add Note
    </button>
  </>
}

// 用 Provider包裹整个核心应用MobxUse：
export const MbxUseWrap = () => {
  return <NotesProvider>
    <MobxUse />
  </NotesProvider>
}