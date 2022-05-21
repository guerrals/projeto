import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { api } from "../../services/api";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type ChartProps = {
    isLoading: boolean;
    chartData: any;
};

type ResponseDataType = {
    key: string;
    value: number;
};
export default function Chart({ isLoading, chartData }: ChartProps) {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 0,
                    },
                },
            },
        },
    };

    return (
        <div>
            {isLoading ? (
                <div className="mt-14 p-2 animate-spin h-6 w-6 rounded-full border-l-blue-500 border-4 ease-linear"></div>
            ) : (
                <Bar
                    options={options}
                    data={chartData}
                    width={700}
                    height={165}
                />
            )}
        </div>
    );
}
