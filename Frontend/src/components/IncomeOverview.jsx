import {useEffect, useState} from "react";
import prepareIncomeLineChartData from "../util/util.js";
import CustomLineChart from "./CustomLineChart.jsx";
import {Plus} from "lucide-react";

const IncomeOverview = ({transactions, onAddIncome}) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Income Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your earning over time and analyze your income trends.
                    </p>
                </div>
                <button
                    onClick={onAddIncome}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 font-medium hover:bg-green-100 hover:border-green-300 hover:text-green-800 shadow-sm hover:shadow-md transition-all duration-200"
                >
                    <Plus size={15}  className="text-lg"/>  Add Income
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default IncomeOverview