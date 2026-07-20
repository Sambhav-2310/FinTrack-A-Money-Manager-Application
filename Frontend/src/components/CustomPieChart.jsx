import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
} from "recharts";

const CustomPieChart = ({
                            data,
                            colors,
                            label,
                            totalAmount,
                            showTextAnchor = true,
                        }) => {
    return (
        <div className="relative w-full h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart margin={{ top: 20, right: 20, left: 20, bottom: 40 }}>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="45%"
                        innerRadius={75}
                        outerRadius={110}
                        stroke="#fff"
                        strokeWidth={2}
                        isAnimationActive={false}
                    >
                        {data.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={colors[index]}
                            />
                        ))}
                    </Pie>

                    <Tooltip
                        formatter={(value) => `₹${Number(value).toLocaleString("en-IN")}`}
                    />

                    <Legend
                        verticalAlign="bottom"
                        align="center"
                        iconType="circle"
                    />
                </PieChart>
            </ResponsiveContainer>

            {showTextAnchor && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className="text-gray-500 text-base font-medium">
                            {label}
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-gray-900">
                            {totalAmount}
                        </h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomPieChart;