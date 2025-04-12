import React, { useState } from 'react'
import ProjectsList from '../../Components/ProjectsList.jsx'
import TasksList from '../../Components/TasksList.jsx'


function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  return (
    <>
     <section className='pb-3 px-2'>
      <input type="text"  className='form-control' placeholder='Search' onChange={(e)=>setSearchQuery(e.target.value)}/>
     </section>
     <section className='py-3 px-2 '>
      <ProjectsList searchQuery= {searchQuery}/>
     </section>
     <section className='py-3 px-2'>
      <TasksList searchQuery={searchQuery}/>
     </section>
    
    </>
  )
}

export default Home
