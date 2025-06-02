import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from '../../app/features/product/productThunk';

const ProductCard = React.lazy(() => import('../Products/ProductCard'));

const Shop = () => {
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const featuredProducts = products.slice(0, 4);

    return (
        <div className="p-6 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-purple-600">Featured Products</h2>
            {status === "loading" ? (
                <div>Loading...</div>
            ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 gap-6 w-full max-w-8xl">
                    {featuredProducts.map(product => (
                        <React.Suspense fallback={<div>Loading...</div>} key={product._id}>
                            <div className="w-full flex">
                                <ProductCard product={product} />
                            </div>
                        </React.Suspense>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Shop;
