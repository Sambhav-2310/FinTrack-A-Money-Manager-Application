import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 min-w-[180px]">
            <p className="font-semibold text-gray-800 mb-2">
                {label}
            </p>

            <p className="text-gray-700">
                <span className="font-medium">Total:</span>{" "}
                <span className="font-bold text-violet-600">
                    ₹{data.totalAmount.toLocaleString()}
                </span>
            </p>

            <div className="mt-3">
                <p className="font-semibold text-gray-800 mb-1">
                    Details:
                </p>

                {data.items.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-between text-sm text-gray-600"
                    >
                        <span>{item.name}</span>
                        <span>₹{Number(item.amount).toLocaleString()}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CustomLineChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={320}>
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 20,
                    left: 10,
                    bottom: 0,
                }}
            >
                <defs>
                    <linearGradient
                        id="incomeGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="5%"
                            stopColor="#7C3AED"
                            stopOpacity={0.35}
                        />
                        <stop
                            offset="95%"
                            stopColor="#7C3AED"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#ECECEC"
                />

                <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                />

                <YAxis
                    tickLine={false}
                    axisLine={false}
                />

                <Tooltip
                    cursor={{
                        stroke: "#7C3AED",
                        strokeDasharray: "4 4",
                    }}
                    content={<CustomTooltip />}
                />

                <Area
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#6D28D9"
                    strokeWidth={3}
                    fill="url(#incomeGradient)"
                    dot={{
                        r: 4,
                        fill: "#6D28D9",
                        stroke: "#6D28D9",
                    }}
                    activeDot={{
                        r: 6,
                        fill: "#6D28D9",
                    }}
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default CustomLineChart;