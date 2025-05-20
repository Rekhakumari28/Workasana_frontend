import React from 'react'
import { PendingWorkBarChart } from './TotalDaysOfWorkPending'
import { WorkDoneBarChart } from './TotalWorkDoneLastWeek'
import { TaskClosedBy } from './TasksClosedBy'
import Sidenav from '../../Components/Sidenav'

function Reports() {
  return (
 <div className="container-fluid">
     <div className="row">
           <div
               className="offcanvas offcanvas-start"
               tabIndex="-1"
               id="mobileSidebar"
               aria-labelledby="mobileSidebarLabel"
               style={{ width: "250px" }}
             >
               <div className="offcanvas-header">
                 <button
                   type="button"
                   className="btn-close text-reset"
                   data-bs-dismiss="offcanvas"
                   aria-label="Close"
                 ></button>
               </div>
               <div className="offcanvas-body p-0">
                 <Sidenav />
               </div>
             </div>
             
    <div
            className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              overflowY: "auto",
            }}
          >
            <Sidenav />
          </div>
  
               <div className="col-12 col-md-9 col-lg-10 p-4">
                  <button
            className="btn btn-outline-primary d-md-none mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
           <i className="bi bi-list"></i>
          </button>
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
  
   
   </div>
   </div>
   </div>
  )
}

export default Reports
