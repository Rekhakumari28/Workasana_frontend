import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJs , CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js/auto";
import { useEffect } from "react";
import { fetchTasksAsync } from "../../Features/taskSlice";

ChartJs.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const PendingWorkBarChart = () => {
const dispatch = useDispatch()
const {tasks} = useSelector((state)=>state.tasks)

useEffect(()=>{
dispatch(fetchTasksAsync())
},[])


const pendingTasks = tasks && tasks?.length>0 && tasks?.filter(task=>task.status === "To Do" || task.status === "Blocked")

const barData = pendingTasks?.length>0 && pendingTasks?.reduce((acc, curr) => {
    const projectName = curr.project.name;
    acc[projectName] = (acc[projectName] || 0) + 1;
    return acc;
  }, {});

    const barChartData = {
        labels:  Object.keys(barData),
        datasets: [
          {
            label:"Tasks",
            data:  Object.values(barData),
            backgroundColor:"rgb(195, 155, 211 , 0.9)",
            borderColor: "rgb(195, 155, 211 ,0.9)",
            borderWidth: 1,
          }
        ]
      }
const options = {}
    return (
        <div className="container  " style={{ textAlign: "center", width: "600px" }}>
           <h4 className="content-heading text-center" >Total Days of Work Pending:</h4>
          <Bar
            data={barChartData}
            options={options}
          />
        </div>
      );
};