import { useEffect, useState } from "react";
import { api } from "../../services/api";
import Chart from "../Chart";
import Dropdown from "../Dropdown";

type GraphCardProps = {
    title: string;
    subtitle: string;
    type: any;
};
export default function GraphCard({ title, subtitle, type }: GraphCardProps) {
    const [data, setData] = useState({
        labels: [""],
        datasets: [
            {
                data: [],
                backgroundColor: [""],
            },
        ],
    });
    const [isLoading, setIsLoading] = useState(false);
    async function loadData() {
        setIsLoading(true);
        try {
            const response = await api.get(`vulnerabilities/${type}`);

            setData({
                labels: ["Baixo", "Médio", "Alto", "Crítico"],
                datasets: [
                    {
                        data: response.data.map((value: number) => value),
                        backgroundColor: [
                            "rgba(75, 192, 192, 0.562)",
                            "rgba(54, 163, 235, 0.644)",
                            "rgba(255, 207, 86, 0.541)",
                            "rgba(255, 99, 133, 0.671)",
                        ],
                    },
                ],
            });
        } catch (error) {
            console.log(error);
        }
        setIsLoading(false);
    }
    const [graphMode, setGraphMode] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="w-auto h-56 rounded-md shadow-md shadow-gray-300 bg-white">
            <div className="flex flex-col relative">
                <div className="text-center">
                    <h1 className="text-xl text-h1">{title}</h1>
                    <p className="text-lg text-h1">{subtitle}</p>
                </div>
                <Dropdown setGraphMode={setGraphMode} />
            </div>

            <div className="flex items-center justify-center">
                <Chart chartData={data} isLoading={isLoading} />
            </div>
        </div>
    );
}
