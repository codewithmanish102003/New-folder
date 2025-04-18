import Shop from '../Shop/Shop';
import Banner from '../Shop/Banner';
import { motion } from 'framer-motion';

const Home = () => {
   
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="home-container min-h-screen flex flex-col"
        >
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