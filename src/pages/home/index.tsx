import { Button } from "antd";
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const handleEnterPredict = () => {
    navigate('/predict')
  }

  return (
    <div className="bg-slate-800 w-full h-screen flex flex-col justify-center items-center text-white">
      <div className=" font-bold text-5xl mb-8">
        Predict System
      </div>
      <div>
        <Button shape="round" className=" mr-4">
          Show Data
        </Button>
        <Button type="primary" shape="round" onClick={handleEnterPredict}>
          Enter Predict
        </Button>
      </div>
    </div>
  );
};

export default Home;
