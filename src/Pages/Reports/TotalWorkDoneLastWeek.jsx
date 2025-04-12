import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js/auto";
import { useEffect } from "react";
import { fetchTasksAsync } from "../../Features/taskSlice";
import moment from "moment";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function WorkDoneBarChart() {
  const dispatch = useDispatch();
  const { tasks, status } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasksAsync());
  }, []);

  

  const workDone =
    tasks &&
    tasks?.length > 0 &&
    tasks?.filter(
      (task) =>
        task.status === "Completed" ||
        moment(task.updatedAt).isAfter(moment().subtract(7, "days"))
    );


  const barData =
    workDone?.length > 0 &&
    workDone?.reduce((acc, curr) => {
      const projectName = curr.project.name;
      acc[projectName] = (acc[projectName] || 0) + 1;
      return acc;
    }, {});

  const barChartData = {
    labels:Object.keys(barData),
    datasets: [
      {
        label: "Tasks",
        data: Object.values(barData),
        backgroundColor: "rgb(255,204,153,0.9)",
        borderColor: "rgb(255,204,153,0.9)",
        borderWidth: 1,
      },
    ],
  };
  const options = {};
  return (
    <div
      className="container  "
      style={{ textAlign: "center", width: "600px" }}
    >
      <h4 className="content-heading text-center">Total Work Done Last Week:</h4>
      <Bar data={barChartData} options={options} />
    </div>
  );
}
