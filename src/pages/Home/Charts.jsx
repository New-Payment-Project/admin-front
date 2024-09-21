import CountUp from 'react-countup';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const data = {
    datasets: [
      {
        data: [40, 30, 30], 
        backgroundColor: ['#3B82F6', '#BFDBFE'], 
        borderWidth: 0.8,
      },
    ],
  };

  const options = {
    cutout: '80%', 
    rotation: 360,
    circumference: 360, 
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-8">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">2 Bank Accounts</h2>
        </div>
        <div className="flex items-center">
          <div className="w-32 h-32 ">
            <Doughnut data={data} options={options} />
          </div>
          <div className="ml-6">
            <p className="text-sm text-gray-500">Total Current Balance</p>
            <p className="text-4xl font-bold">
              <CountUp start={0} end={2698.12} duration={2.75} prefix="$" decimals={2} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
