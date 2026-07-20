import Dashboard from "../components/Dashboard.jsx";
import {useUser} from "../hooks/useUser.jsx";
import {Plus} from "lucide-react";
import CategoryList from "../components/CategoryList.jsx";
import {useEffect, useState} from "react";
import axiosConfig from "../util/AxiosConfig.jsx";
import {API_ENDPOINTS} from "../util/ApiEndpoint.js";
import toast from "react-hot-toast";
import Modal from "../components/Modal.jsx";
import AddCategoryForm from "../components/AddCategoryForm.jsx";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModel, setOpenAddCategoryModel] = useState(false);
    const [openEditCategoryModel, setOpenEditCategoryModel] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);

            if (response.status === 200) {
                console.log("Categories", response.data);
                setCategoryData(response.data);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        const { name, type, icon } = category;

        if (!name.trim()) {
            toast.error("Category Name is required");
            return;
        }

        //check if the category already exists
        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        })

        if (isDuplicate) {
            toast.error("Category Name already exists");
            return;
        }

        try {
            const response = await axiosConfig.post(
                API_ENDPOINTS.ADD_CATEGORY,
                { name, type, icon }
            );

            if (response.status === 200 || response.status === 201) {
                toast.success("Category Added");
                setOpenAddCategoryModel(false);
                fetchCategoryDetails();
            }
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Failed to add Category"
            );
        }
    };

    const handleEditCategory =  (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModel(true);
    }

    const handleUpdateCategory = async (updatedCategory) => {
        const {id, name, type, icon} = updatedCategory;
        if(!name.trim()){
            toast.error("Category Name is required");
            return;
        }

        if(!id){
            toast.error("Category Id is missing");
            return;
        }

        try{
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            setOpenEditCategoryModel(false);
            setSelectedCategory(null);
            toast.success("Category Updated Successfully");
            fetchCategoryDetails();
        }catch (error) {
            console.log("Error updating category",error.response?.data?.message || error.message);
            toast.error(error.response?.data?.message || "Failed to update category");
        }
    }

    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                {/*Add button to add category*/}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">
                        All Categories
                    </h2>
                    <button
                        onClick={() => setOpenAddCategoryModel(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 border border-green-200 text-green-700 font-medium hover:bg-green-100 hover:border-green-300 hover:text-green-800 shadow-sm hover:shadow-md transition-all duration-200"
                    >
                        <Plus size={16} strokeWidth={2.5} />
                        Add Category
                    </button>
                </div>
                {/*Category List*/}
                <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

                {/*Adding category modal*/}
                <Modal
                    title="Add Category"
                    isOpen={openAddCategoryModel}
                    onClose={() => setOpenAddCategoryModel(false)}
                >
                    <AddCategoryForm onAddCategory={handleAddCategory}/>
                </Modal>

                {/*Updating category modal*/}
                <Modal
                    isOpen={openEditCategoryModel}
                    onClose={() => {setOpenEditCategoryModel(false);
                                    setSelectedCategory(null);
                            }}
                    title="Update Category"
                >
                    <AddCategoryForm
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                    />
                </Modal>
            </div>
        </Dashboard>
    )
}

export default Category;