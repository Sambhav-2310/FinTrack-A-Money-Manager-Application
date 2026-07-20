import Dashboard from "../components/Dashboard.jsx";
import { useUser } from "../hooks/useUser.jsx";
import { Search } from "lucide-react";
import { useState } from "react";
import axiosConfig from "../util/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../util/ApiEndpoint.js";
import toast from "react-hot-toast";
import TransactionInfoCard from "../components/TransactionInfoCard.jsx";
import moment from "moment";

const Filter = () => {
    useUser();

    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.APPLY_FILTERS, {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder,
            });
            console.log("Transactions: ", response.data);
            setTransaction(response.data);
        }catch (error) {
            console.error("Failed to fetch transactions ", error);
            toast.error(error.message || "Failed to fetch transactions. Please try again.");
        }finally {
            setLoading(false);
        }
    };

    return (
        <Dashboard activeMenu="Filters">
            <div className="my-5 mx-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">
                        Filter Transactions
                    </h2>
                </div>

                <div className="card p-6">
                    <h5 className="text-lg font-semibold mb-6">
                        Select the Filters
                    </h5>

                    <form
                        onSubmit={handleSearch}
                        className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-7 gap-5 items-end"
                    >
                        {/* Type */}
                        <div>
                            <label
                                htmlFor="type"
                                className="block text-sm font-medium mb-2"
                            >
                                Type
                            </label>

                            <select
                                id="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="w-full border rounded-lg px-3 py-3"
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        {/* Start Date */}
                        <div>
                            <label
                                htmlFor="startDate"
                                className="block text-sm font-medium mb-2"
                            >
                                Start Date
                            </label>

                            <input
                                id="startDate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border rounded-lg px-3 py-3"
                            />
                        </div>

                        {/* End Date */}
                        <div>
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium mb-2"
                            >
                                End Date
                            </label>

                            <input
                                id="endDate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border rounded-lg px-3 py-3"
                            />
                        </div>

                        {/* Sort Field */}
                        <div>
                            <label
                                htmlFor="sortField"
                                className="block text-sm font-medium mb-2"
                            >
                                Sort Field
                            </label>

                            <select
                                id="sortField"
                                value={sortField}
                                onChange={(e) => setSortField(e.target.value)}
                                className="w-full border rounded-lg px-3 py-3"
                            >
                                <option value="date">Date</option>
                                <option value="amount">Amount</option>
                                <option value="category">Category</option>
                            </select>
                        </div>

                        {/* Sort Order */}
                        <div>
                            <label
                                htmlFor="sortOrder"
                                className="block text-sm font-medium mb-2"
                            >
                                Sort Order
                            </label>

                            <select
                                id="sortOrder"
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="w-full border rounded-lg px-3 py-3"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>

                        {/* Search */}
                        <div className="xl:col-span-2">
                            <label
                                htmlFor="keyword"
                                className="block text-sm font-medium mb-2"
                            >
                                Search
                            </label>

                            <div className="flex items-center gap-2">
                                <input
                                    id="keyword"
                                    type="text"
                                    value={keyword}
                                    onChange={(e) =>
                                        setKeyword(e.target.value)
                                    }
                                    placeholder="Search..."
                                    className="flex-1 border rounded-lg px-3 py-3"
                                />

                                <button
                                    type="submit"
                                    className="h-12 w-12 flex-shrink-0 rounded-lg bg-violet-700 hover:bg-violet-800 text-white flex items-center justify-center transition-colors"
                                >
                                    <Search size={20} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="card p-4">
                    <h5 className="text-lg font-semibold mb-6">
                        Transactions
                    </h5>
                    {transaction.length === 0 && !loading? (
                        <p className="text-gray-500">Select the filters and click apply to filter the transactions</p>
                    ) : ""}
                    {loading? (
                        <p className="text-gray-500">Loading Transactions</p>
                    ) : ""}
                    {transaction.map((transaction) => (
                        <TransactionInfoCard
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon}
                            date={moment(transaction.date).format("Do MMM YYYY")}
                            amount={transaction.amount}
                            type={type}
                            hideDeleteBtn
                        />
                    ))}
                </div>
            </div>
        </Dashboard>
    );
};

export default Filter;