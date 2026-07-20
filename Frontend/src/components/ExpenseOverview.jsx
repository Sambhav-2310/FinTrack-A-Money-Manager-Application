import { useEffect, useState } from "react";
import prepareExpenseLineChartData from "../util/util.js";
import CustomLineChart from "./CustomLineChart.jsx";
import { Plus } from "lucide-react";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div>
                    <h5 className="text-lg">
                        Expense Overview
                    </h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        Track your spending over time and analyze your expense trends.
                    </p>
                </div>

                <button
                    onClick={onAddExpense}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-red-700 font-medium hover:bg-red-100 hover:border-red-300 hover:text-red-800 shadow-sm hover:shadow-md transition-all duration-200"
                >
                    <Plus size={15} className="text-lg" />
                    Add Expense
                </button>
            </div>

            <div className="mt-10">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
};

export default ExpenseOverview;