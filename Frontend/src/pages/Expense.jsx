import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddExpenseForm from "../components/AddExpenseForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import ExpenseList from "../components/ExpenseList.jsx";
import ExpenseOverview from "../components/ExpenseOverview.jsx";
import {API_ENDPOINTS} from "../util/ApiEndpoint.js";
import axiosConfig from "../util/AxiosConfig.jsx";

const Expense = () => {
    useUser();
    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: "",
    });

    //Fetch the expense details
    const fetchExpenseDetails = async () => {
        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_EXPENSE);
            if (response.status === 200) {
                setExpenseData(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error("Fail to fetch expense details", error);
            toast.error(error.response?.data?.message || "Failed to fetch expense details");
        } finally {
            setLoading(false);
        }
    };

    //Fetch category by type for expense
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("expense"));
            if (response.status === 200) {
                console.log("Expense Categories", response.data);
                setCategories(response.data);
            }
        } catch (error) {
            console.log("Fail to fetch expense categories", error);
            toast.error(error.response?.data?.message || "Failed to fetch expense categories");
        }
    };

    //Save the expense details
    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;

        //validation
        if (!name.trim()) {
            toast.error("Please enter a valid name");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Please enter a valid amount");
            return;
        }

        if (!date) {
            toast.error("Please enter a valid date");
            return;
        }

        const today = new Date().toISOString().split("T")[0];

        if (date > today) {
            toast.error("Date cannot be in future");
            return;
        }

        if (!categoryId) {
            toast.error("Please select a valid category");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_EXPENSE, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId,
            });

            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Expense Added");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error) {
            console.log("Error adding expense details", error);
            toast.error(error.response?.data?.message || "Failed to add expense details");
        }
    };

    //delete expense details
    const deleteExpense = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: "" });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.log("Fail to delete expense details", error);
            toast.error(error.response?.data?.message || "Failed to delete expense details");
        }
    };

    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(API_ENDPOINTS.EXPENSE_EXCEL_DOWNLOAD, {
                responseType: "blob",
            });

            let filename = "expense_details.xlsx";

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", filename);

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);

            window.URL.revokeObjectURL(url);

            toast.success("Download expense details successfully");
        } catch (error) {
            console.log("Fail to download expense details", error);
            toast.error(error.response?.data?.message || "Failed to download expense details");
        }
    };

    const handleEmailExpenseDetails = async () => {
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.EMAIL_EXPENSE);

            if (response.status === 200) {
                toast.success("Expense details emailed successfully");
            }
        } catch (error) {
            console.error("Fail to email expense details", error);
            toast.error(error.response?.data?.message || "Failed to email expense details");
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/*Overview of expense with live chart*/}
                        <ExpenseOverview
                            transactions={expenseData}
                            onAddExpense={() => setOpenAddExpenseModal(true)}
                        />
                    </div>

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) =>
                            setOpenDeleteAlert({ show: true, data: id })
                        }
                        onDownload={handleDownloadExpenseDetails}
                        onEmail={handleEmailExpenseDetails}
                    />

                    {/*Add Expense Modal*/}
                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) => handleAddExpense(expense)}
                            categories={categories}
                        />
                    </Modal>

                    {/*Delete Expense Modal*/}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() =>
                            setOpenDeleteAlert({ show: false, data: null })
                        }
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this Expense?"
                            onDelete={() => deleteExpense(openDeleteAlert.data)}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    )
}

export default Expense;