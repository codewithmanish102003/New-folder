import { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Shop from '../Shop/Shop';
import Banner from '../Shop/Banner';
import { motion } from 'framer-motion';

const Home = () => {
    const location = useLocation();
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (location.state?.success) {
            setSuccess(location.state.success);

            const timer = setTimeout(() => {
                setSuccess("");
            }, 5000); // Clear success message after 5 seconds

            return () => clearTimeout(timer); // Cleanup timer on unmount
        }
    }, [location.state?.success]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="home-container min-h-screen flex flex-col"
        >
            {success && (
                <div
                    className="bg-purple-100 border border-purple-400 text-purple-700 px-4 py-3 rounded relative mb-4 shadow-md mx-4 sm:mx-auto sm:max-w-lg"
                    role="alert"
                >
                    <span className="block sm:inline">{success}</span>
                </div>
            )}
            <div className="flex-grow">
                <Banner />
                <div className="container mx-auto px-4">
                    <Shop />
                </div>
            </div>
        </motion.div>
    );
};

export default Home;