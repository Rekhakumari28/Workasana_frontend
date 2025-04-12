import React from 'react'
import { PendingWorkBarChart } from './TotalDaysOfWorkPending'
import { WorkDoneBarChart } from './TotalWorkDoneLastWeek'
import { TaskClosedBy } from './TasksClosedBy'

function Reports() {
  return (
   <>

   <section className="pb-3 px-2">
<span className='heading-color fw-bold fs-2 '>Reports</span>
   </section>


   <section className="p-3 shadow mb-4 ">
    
<WorkDoneBarChart/>
   </section>
   <section className="p-3 shadow mb-4 ">  
   <PendingWorkBarChart/>
   </section>
   <section className="p-3 shadow  mb-4">
   <TaskClosedBy />
  </section>
  
   
   </>
  )
}

export default Reports
