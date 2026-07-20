import {ArrowRight} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";

const Transaction = ({transactions, onMore, type, title}) => {

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{title}</h5>
                <button
                    onClick={onMore}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-xl hover:bg-gray-200 hover:text-gray-900 hover:border-gray-300 transition-all duration-200"
                >
                    More
                    <ArrowRight size={16} />
                </button>
            </div>
            <div className="mt-6">
                {transactions?.slice(0,5)?.map((item) => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format('Do MMM YYYY')}
                        amount={item.amount}
                        type={type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default Transaction;