import { Divider } from "antd";
import PredictFilter from "../PredictFilter";
import PredictPlot from "../PredictPlot";

const PredictBlock = () => {
  return (
    <div className="border w-4/5 border-black p-4">
      <PredictFilter></PredictFilter>
      <Divider/>
      <PredictPlot></PredictPlot>
    </div>
  )
}

export default PredictBlock;