import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ paymentData }) => {
    const data = {
        datasets: [
            {
                label: 'Payment Methods',
                data: paymentData, 
                backgroundColor: ['#1437AD', '#35C0CD', '#7F44D6']
            }
        ],
        labels: ['Click', 'Payme', 'Uzum']
    };
    
    return <Doughnut 
        data={data}
        options={{
            cutout: '60%',
            plugins: {
                legend: {
                    display: false,
                },
                tooltip: {
                    enabled: true, 
                }
            }
        }}
    />;
};

export default DoughnutChart;
