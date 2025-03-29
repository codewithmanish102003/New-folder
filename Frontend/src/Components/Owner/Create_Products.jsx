import React, { useState } from 'react';
import { createProductThunk } from '../../app/features/product/productThunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Create_Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        discount: '',
        bgcolor: '',
        panelcolor: '',
        textcolor: '',
        description: '',
        image: null,
    });
    const [error, setError] = useState('');
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
        setError('');
        setLoading(true);
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }

            const response = await dispatch(createProductThunk(formDataToSend)).unwrap();
            console.log("Product Created Successfully:", response.message);
            navigate("/owner", { state: { success: response.message } });
        } catch (error) {
            setError(error.message || "Failed. Please try again.");
            console.log("Product creation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center mt-0'>
            <div className="h-[100vh] flex flex-col">
                <main className="w-[95vw] bg-white p-8 shadow m-5 mt-0">
                    <h2 className="text-xl font-bold mb-4">Create New Product</h2>
                    <form autoComplete="off" onSubmit={handleCreation} method="post" encType="multipart/form-data">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Product Details</h3>
                            <div className="mb-4">
                                <label className="block mb-2 font-medium">Product Image</label>
                                <input name="image" type="file"  className="py-2 px-4 rounded border" onChange={handleChange} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="name" type="text" placeholder="Product Name" className="border p-2 rounded w-full" onChange={handleChange} />
                                <input name="price" type="number" placeholder="Product Price" className="border p-2 rounded w-full" onChange={handleChange} />
                                <input name="discount" type="number" placeholder="Discount Price" className="border p-2 rounded w-full" onChange={handleChange} />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Panel Details</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input name="bgcolor" type="text" placeholder="Background Color" className="border p-2 rounded w-full" onChange={handleChange} />
                                <input name="panelcolor" type="text" placeholder="Panel Color" className="border p-2 rounded w-full" onChange={handleChange} />
                                <input name="textcolor" type="text" placeholder="Text Color" className="border p-2 rounded w-full" onChange={handleChange} />
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Product Description</h3>
                            <div className="w-full">
                                <textarea name='description' placeholder='Write your product description here' className='border p-2 rounded w-full' onChange={handleChange} />
                            </div>
                        </div>
                        <input className="px-5 py-2 rounded mt-3 bg-blue-500 text-white" type="submit" value="Create New Product" />
                    </form>
                    {loading && <p className="text-blue-500 mt-2">Creating product...</p>}
                    {error && <p className="text-red-500 mt-2">{error}</p>}
                </main>
            </div>
        </div>
    );
};

export default Create_Products;