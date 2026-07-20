import {addThousandsSeparator} from "../util/util.js";
import CustomPieChart from "./CustomPieChart.jsx";

const FinanceOverview = ({totalBalance, totalIncome, totalExpense,}) => {
    const COLORS = ["#59168B", "#016630", "#a0090e"];

    const balanceData = [
        { name: "Total Balance", value: totalBalance },
        { name: "Total Income", value: totalIncome },
        { name: "Total Expense", value: totalExpense },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`₹${addThousandsSeparator(totalBalance)}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    );
};

export default FinanceOverview;