import {Download, LoaderCircle, Mail} from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import {useState} from "react";

const IncomeList = ({transactions, onDelete, onDownload, onEmail}) => {
    const [loading, setLoading] = useState(false);
    const handleEmail = async () => {
        setLoading(true);
        try {
            await onEmail();
        }finally {
            setLoading(false);
        }
    }
    const handleDownload = async () => {
        setLoading(true);
        try {
            await onDownload();
        }finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-7 py-6">
            <div className="flex items-center justify-between w-full">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Income Sources
                </h2>

                <div className="flex items-center gap-3">
                    <button
                        disabled={loading}
                        onClick={handleEmail}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium shadow-sm hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="w-3 h-3 animate-spin"/>
                                Emailing...
                            </>
                        ) : (
                            <>
                                <Mail size={18} />
                                Email
                            </>
                        )}
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium shadow-sm hover:bg-purple-50 hover:border-purple-200 hover:text-purple-700 transition-all duration-200"
                    >
                        {loading ? (
                            <>
                                <LoaderCircle className="w-3 h-3 animate-spin"/>
                                Downloading...
                            </>
                        ) : (
                            <>
                                <Download size={18} />
                                Download
                            </>
                        )}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2">
                {/*Display the incomes*/}
                {transactions?.map((income) => (
                    <TransactionInfoCard
                        key={income.id}
                        title={income.name}
                        icon={income.icon}
                        date={moment(income.date).format('Do MMM YYYY')}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income.id)}
                    />
                ))}
            </div>
        </div>
    )
}

export default IncomeList