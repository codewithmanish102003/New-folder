import {
    ChevronRight,
    CreditCard,
    Edit2,
    LogOut,
    Package,
    Plus,
    Settings,
    ShoppingBasket,
    User
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { logoutThunk, updateUserThunk } from "../../app/features/auth/authThunk";
import { createProductThunk, deleteProductThunk, editProductThunk, fetchOwnerProductsThunk } from '../../app/features/product/productThunk';

const Owner_Profile = () => {
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const id=useSelector((state)=>state.auth.id)
    console.log(id)
    const firstname = useSelector((state) => state.auth.firstname);
    const lastname = useSelector((state) => state.auth.lastname);
    const email = useSelector((state) => state.auth.email);
    const phone = useSelector((state) => state.auth.phone)
    const gstno = useSelector((state) => state.auth.gstno);
    const [activeSection, setActiveSection] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);
    const [err, setErr] = useState(null)
    const [firstnameState, setFirstname] = useState(firstname);
    const [lastnameState, setLastname] = useState(lastname);
    const [emailState, setEmail] = useState(email);
    const [phoneState, setPhone] = useState(phone);
    const { products, status, error } = useSelector((state) => state.products);
    const [editingProduct, setEditingProduct] = useState(null);
    const [updatedData, setUpdatedData] = useState({});
    const dispatch = useDispatch();



    const handleLogout = () => {
        dispatch(logoutThunk());
        toast.success("Successfully logged out!");
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate("/");
    };

    const handleDeleteAccount = async () => {
        try {
           const response= await dispatch(deleteUserThunk(email));
            if (response.success) {
                toast.success("User Account Deleted Successfully")
            }
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch (error) {
            toast.error(error.message);
        }
    };


    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
          if (!firstnameState || !lastnameState || !emailState || !phoneState) {
            throw new Error('Please fill in all fields');
          }
      
          const userData = {
            id: id,
            firstname: firstnameState,
            lastname: lastnameState,
            email: emailState,
            contact: phoneState,
          };
      
          console.log("Sending data to backend:", userData); // Debug log
      
          const response = await dispatch(updateUserThunk(userData)).unwrap();
          
          toast.success(response.message || "Profile Updated Successfully!");
          setIsEditing(false);
        } catch (error) {
          toast.error(error.error || "Profile update failed. Please try again.");
        }
      };
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        discount: '',
        stock: '',
        category: '',
        brand: '',
        description: '',
        image: null,
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleCreation = async (e) => {
        e.preventDefault();

        if (!isLoggedIn) {
            toast.alert("You must be logged in to create a product.");
            navigate("/login");
            return;
        }

        setErr('');
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            const response = await dispatch(createProductThunk(formDataToSend)).unwrap();
            toast.success(response.message ||  "Product Created Successfully")
            console.log("Product Created Successfully:", response.message);
            navigate("/owner");
        } catch (error) {
            setErr(error.message || "Failed. Please try again.");
            console.log("Product creation failed:", error);
        } finally {
            setLoading(false);
            setFormData("")
        }
    };


    useEffect(() => {
        if (activeSection === 'products') {
            dispatch(fetchOwnerProductsThunk());
        }
    }, [activeSection, dispatch]);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setUpdatedData(product);
    };

    const handleSaveEdit = async () => {
        dispatch(editProductThunk({ id: editingProduct._id, updatedData }));
        setEditingProduct(null);
    };

    const handleDelete = async (id) => {
        console.log(id);
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                const response=await dispatch(deleteProductThunk(id)).unwrap();
                setSuccess("Product deleted successfully");
                toast.success(response.message || "Product deleted successfully");

                // Hide the success message after 3 seconds
                setTimeout(() => {
                    setSuccess(null);
                }, 3000);
            } catch (error) {
                console.error("Error deleting product:", error);
                setErr("Failed to delete product. Please try again.");
                toast.error(error || "Failed to delete product. Please try again.")

                // Hide the error message after 3 seconds
                setTimeout(() => {
                    setErr(null);
                }, 3000);
            }
        }
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <div className="max-w-full mx auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                    {/*Side Bar*/}
                    <div className="md:col-span-3">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {/* Profile Header */}
                            <div className="flex items-center space-x-3 mb-8">
                                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                                    <User className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Hello,</p>
                                    <h2 className="font-semibold">{isLoggedIn ? firstname : "Guest"}</h2>
                                </div>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-2">
                                <button
                                    onClick={() => setActiveSection('create')}
                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Plus className="w-5 h-5 text-gray-600" />
                                        <span>CREATE NEW PRODUCT</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>
                                <button
                                    onClick={() => setActiveSection('orders')}
                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Package className="w-5 h-5 text-gray-600" />
                                        <span>MY ORDERS</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>

                                <button
                                    onClick={() => setActiveSection('profile')}
                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Settings className="w-5 h-5 text-gray-600" />
                                        <span>ACCOUNT SETTINGS</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>

                                <button
                                    onClick={() => setActiveSection('payments')}
                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                                >
                                    <div className="flex items-center space-x-3">
                                        <CreditCard className="w-5 h-5 text-gray-600" />
                                        <span>PAYMENTS</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>

                                <button
                                    onClick={() => setActiveSection('products')}
                                    className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-left cursor-pointer"
                                >
                                    <div className="flex items-center space-x-3">
                                        <ShoppingBasket className="w-5 h-5 text-gray-600" />
                                        <span>ALL PRODUCTS</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </button>

                                {/* Logout */}
                                <div className="flex items-center space-x-3">

                                    <button
                                        onClick={handleLogout}
                                        className="text-red-500 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 cursor-pointer w-full"
                                    >
                                        <LogOut className="h-5 w-5" />
                                        Logout
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>
                    {/* Main Content */}
                    <div className="md:col-span-9">
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            {activeSection === 'profile' && (
                                <div>
                                    <div className="flex items-center justify-between mb-6">
                                        <h1 className="text-xl font-semibold">Personal Information</h1>
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="text-purple-600 flex items-center space-x-1 cursor-pointer">
                                            <Edit2 className="w-4 h-4" />
                                            <span>Edit</span>
                                        </button>
                                    </div>

                                    {/* Form */}
                                    {isEditing ? (
                                        <form onSubmit={handleUpdateProfile}>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm text-gray-600 mb-2">First Name</label>
                                                    <input
                                                        type="text"
                                                        value={firstnameState}
                                                        onChange={(e) => setFirstname(e.target.value)}
                                                        className="w-full p-2 border rounded-md"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                                                    <input
                                                        type="text"
                                                        value={lastnameState}
                                                        onChange={(e) => setLastname(e.target.value)}
                                                        className="w-full p-2 border rounded-md"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-gray-600 mb-2">Email Address</label>
                                                    <input
                                                        type="email"
                                                        value={emailState}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="w-full p-2 border rounded-md"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm text-gray-600 mb-2">Mobile Number</label>
                                                    <input
                                                        type="tel"
                                                        value={phoneState}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="w-full p-2 border rounded-md"
                                                    />
                                                </div>
                                            </div>
                                            <div className='flex gap-2'>
                                                <button
                                                    type="submit"
                                                    className="bg-purple-500 text-white py-2 px-4 rounded-md mt-4 cursor-pointer"
                                                >
                                                    Save Changes
                                                </button>
                                                <button
                                                    onClick={() => setIsEditing(null)}
                                                    className="bg-red-500 text-white py-2 px-4 rounded-md mt-4 cursor-pointer"
                                                >
                                                    Cancel
                                                </button>
                                            </div>

                                        </form>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-2">First Name</label>
                                                <input
                                                    type="text"
                                                    value={firstnameState}
                                                    disabled
                                                    className="w-full p-2 border rounded-md bg-gray-50"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm text-gray-600 mb-2">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={lastnameState}
                                                    disabled
                                                    className="w-full p-2 border rounded-md bg-gray-50"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-2">Email Address</label>
                                                <div className="flex items-center justify-between">
                                                    <input
                                                        type="email"
                                                        value={emailState}
                                                        disabled
                                                        className="w-full p-2 border rounded-md bg-gray-50"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm text-gray-600 mb-2">Mobile Number</label>
                                                <div className="flex items-center justify-between">
                                                    <input
                                                        type="tel"
                                                        value={phoneState}
                                                        disabled
                                                        className="w-full p-2 border rounded-md bg-gray-50"
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-2">GST Number</label>
                                                <div className="flex items-center justify-between">
                                                    <input
                                                        type="text"
                                                        value={gstno}
                                                        disabled
                                                        className="w-full p-2 border rounded-md bg-gray-50"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    )}
                                    {/* FAQs Section */}
                                    <div className="mt-12">
                                        <h2 className="text-lg font-semibold mb-6">FAQs</h2>
                                        <div className="space-y-6">
                                            <div>
                                                <h3 className="font-medium mb-2">What happens when I update my email address (or mobile number)?</h3>
                                                <p className="text-gray-600 text-sm">Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).</p>
                                            </div>

                                            <div>
                                                <h3 className="font-medium mb-2">When will my account be updated with the new email address (or mobile number)?</h3>
                                                <p className="text-gray-600 text-sm">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Account Actions */}
                                    <div className="mt-12 pt-6 border-t space-y-4">
                                        <button className="text-purple-600 hover:underline cursor-pointer">Deactivate Account</button>
                                        <button onClick={handleDeleteAccount} className="block text-red-600 hover:underline cursor-pointer">Delete Account</button>
                                    </div>
                                </div>
                            )}

                            {activeSection === 'create' && (
                                <>
                                    <h1 className="text-xl font-semibold mb-4">Create New Product</h1>
                                    {isLoggedIn ? (
                                        <form autoComplete="off" onSubmit={handleCreation} method="post" encType="multipart/form-data">
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                                                <div className="mb-4">
                                                    <label className="block mb-2 font-medium">Product Image</label>
                                                    <button className='bg-gray-200'>
                                                        <input name="image" type="file" className="py-2 px-4 rounded border" onChange={handleChange} required />
                                                    </button>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input name="name" type="text" placeholder="Product Name" className="border p-2 rounded w-full" onChange={handleChange} required />
                                                    <input name="price" type="number" placeholder="Product Price" className="border p-2 rounded w-full" onChange={handleChange} required />
                                                    <input name="discount" type="number" placeholder="Discount Price" className="border p-2 rounded w-full" onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <input name="stock" type="number" placeholder="Your Available Stock" className="border p-2 rounded w-full" onChange={handleChange} required />
                                                    <input name="category" type="text" placeholder="Category of product" className="border p-2 rounded w-full" onChange={handleChange} required />
                                                    <input name="brand" type="text" placeholder="Brand name" className="border p-2 rounded w-full" onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold mb-2">Product Description</h3>
                                                <div className="w-full">
                                                    <textarea name='description' placeholder='Write your product description here' className='border p-2 rounded w-full' onChange={handleChange} required />
                                                </div>
                                            </div>
                                            <input className="px-5 py-2 rounded mt-3 bg-purple-500 text-white" type="submit" value="Create New Product" />
                                        </form>
                                    ) : (
                                        <p>You must be logged in to create a product.</p>
                                    )}
                                    {loading && <p className="text-purple-500 mt-2">Creating product...</p>}
                                    {error && <p className="text-red-500 mt-2">{err}</p>}
                                </>
                            )}

                            {activeSection === 'orders' && (
                                <div>
                                    <h1 className="text-xl font-semibold mb-6">Orders</h1>
                                    <p className="text-gray-600 text-sm">Your orders will appear here.</p>
                                </div>
                            )}

                            {activeSection === 'payments' && (
                                <div>
                                    <h1 className="text-xl font-semibold mb-6">Payments</h1>
                                    <p className="text-gray-600 text-sm">Your payment history will appear here.</p>
                                </div>
                            )}

                            {activeSection === 'products' && (
                                <div>
                                    <h1 className="text-xl font-semibold mb-6">Your Products</h1>
                                    {status === "loading" && <p>Loading...</p>}
                                    {status === "failed" && <p>Error: {error}</p>}
                                    {status === "succeeded" && products.length === 0 && (
                                        <p>No products found.</p>
                                    )}
                                    {status === "succeeded" && products.length > 0 && (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {products.map((product) => (
                                                <div key={product._id} className="p-4 border rounded shadow">
                                                    {editingProduct && editingProduct._id === product._id ? (
                                                        <>
                                                            <input
                                                                type="text"
                                                                value={updatedData.name}
                                                                onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
                                                                className="border p-2 rounded w-full mb-2"
                                                            />
                                                            <input
                                                                type="number"
                                                                value={updatedData.price}
                                                                onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
                                                                className="border p-2 rounded w-full mb-2"
                                                            />
                                                            <textarea
                                                                value={updatedData.description}
                                                                onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
                                                                className="border p-2 rounded w-full mb-2"
                                                            />
                                                            <button
                                                                onClick={handleSaveEdit}
                                                                className="bg-purple-500 text-white py-1 px-3 rounded mr-2"
                                                            >
                                                                Save
                                                            </button>
                                                            <button
                                                                onClick={() => setEditingProduct(null)}
                                                                className="bg-gray-500 text-white py-1 px-3 rounded"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <h2 className="font-bold">{product.name}</h2>
                                                            <p>Price: ₹{product.price}</p>
                                                            <p>{product.description}</p>
                                                            <button
                                                                onClick={() => handleEdit(product)}
                                                                className="bg-purple-500 text-white py-1 px-3 rounded mr-2"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleDelete(product._id)}
                                                                className="bg-red-500 text-white py-1 px-3 rounded"
                                                            >
                                                                Delete
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Owner_Profile
