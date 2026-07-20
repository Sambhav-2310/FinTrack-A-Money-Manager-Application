import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {useEffect, useState} from "react";
import {API_ENDPOINTS} from "../util/ApiEndpoint.js";
import toast from "react-hot-toast";
import axiosConfig from "../util/AxiosConfig.jsx";
import IncomeList from "../components/IncomeList.jsx";
import Modal from "../components/Modal.jsx";
import {Plus} from "lucide-react";
import AddIncomeForm from "../components/AddIncomeForm.jsx";
import DeleteAlert from "../components/DeleteAlert.jsx";
import IncomeOverview from "../components/IncomeOverview.jsx";


const Income = () => {
    useUser();
    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: "",
    });

    //Fetch the income details
    const fetchIncomeDetails = async () => {
        if(loading){
            return;
        }

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_INCOMES);
            if(response.status === 200){
                setIncomeData(response.data);
                console.log(response.data);
            }
        }catch(error){
            console.error("Fail to fetch income details", error);
            toast.error(error.response?.data?.message || "Failed to fetch income details");
        }finally {
            setLoading(false);
        }
    }

    //Fetch category by type for income
    const fetchIncomeCategories = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.CATEGORY_BY_TYPE("income"))
            if(response.status === 200){
                console.log('Income Categories', response.data);
                setCategories(response.data);
            }
        }catch(error){
            console.log("Fail to fetch income categories", error);
            toast.error(error.response?.data?.message || "Failed to fetch income categories");
        }
    }
    //Save the income details
    const handleAddIncome = async (income) => {
        const {name, amount, date, icon, categoryId} = income;

        //validation
        if(!name.trim()){
            toast.error("Please enter a valid name");
            return;
        }

        if(!amount || isNaN(amount) || Number(amount) <= 0){
            toast.error("Please enter a valid amount");
            return;
        }

        if(!date){
            toast.error("Please enter a valid date");
            return;
        }

        const today = new Date().toISOString().split("T")[0]

        if(date > today){
            toast.error("Date cannot be in future")
            return;
        }

        if(!categoryId){
            toast.error("Please select a valid category");
            return;
        }

        try {
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_INCOME, {
                name,
                amount: Number(amount),
                date,
                icon,
                categoryId
            })

            if(response.status === 201){
                setOpenAddIncomeModal(false);
                toast.success("Income Added");
                fetchIncomeDetails();
                fetchIncomeCategories();
            }
        }catch(error){
            console.log("Error adding income details", error);
            toast.error(error.response?.data?.message || "Failed to add income details");
        }
    }

    //delete income details
    const deleteIncome = async (id) => {
        try {
            await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
            setOpenDeleteAlert({show: false, data: ""});
            toast.success("Income deleted successfully");
            fetchIncomeDetails();
        }catch(error){
            console.log("Fail to delete income details", error);
            toast.error(error.response?.data?.message || "Failed to delete income details");
        }
    }

    const handleDownloadIncomeDetails = async () => {
        try{
            const response = await axiosConfig.get(API_ENDPOINTS.INCOME_EXCEL_DOWNLOAD, {responseType: "blob"});
            let filename = "income_details.xlsx";
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", filename);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
            toast.success("Download income details successfully");
        }catch(error){
            console.log("Fail to download income details", error);
            toast.error(error.response?.data?.message || "Failed to download income details");
        }
    }

    const handleEmailIncomeDetails = async () => {
        try {
            const response = await axiosConfig.post(API_ENDPOINTS.EMAIL_INCOME)
            if(response.status === 200){
                toast.success("Email income details emailed successfully");
            }
        }catch(error){
            console.error("Fail to email income details", error);
            toast.error(error.response?.data?.message || "Failed to email income details");
        }
    }

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    },[])

    return (
        <Dashboard activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        {/*Overview of income with live chart*/}
                        <IncomeOverview transactions={incomeData} onAddIncome={() => setOpenAddIncomeModal(true)} />
                    </div>
                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) => setOpenDeleteAlert({show:true, data:id})}
                        onDownload={handleDownloadIncomeDetails}
                        onEmail={handleEmailIncomeDetails}
                    />

                    {/*Add Income Modal*/}
                    <Modal
                        isOpen={openAddIncomeModal}
                        onClose={() => setOpenAddIncomeModal(false)}
                        title="Add Income"
                    >
                        <AddIncomeForm
                            onAddIncome={(income) => handleAddIncome(income)}
                            categories={categories}
                        />
                    </Modal>

                    {/*Delete Income Modal*/}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({show: false, data: null})}
                        title="Delete Income"
                    >
                        <DeleteAlert
                            content="Are you sure you want to delete this Income?"
                            onDelete={() => deleteIncome(openDeleteAlert.data)}
                        />
                    </Modal>
                </div>
            </div>
        </Dashboard>
    )
}

export default Income;