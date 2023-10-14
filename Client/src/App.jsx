import './App.css'
import { Routes, Route } from 'react-router-dom'
import Tasks from './Pages/Tasks/Tasks'
import AddTask from './Pages/Add/AddTask'
import Task from './Pages/Task/Task'
import Edit from './Pages/Edit/Edit'

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Tasks />} />
        <Route path='/add' element={<AddTask />} />
        <Route path='/task' element={<Task />} />
        <Route path='/edit' element={<Edit />} />
      </Routes>
    </>
  )
}

export default App
