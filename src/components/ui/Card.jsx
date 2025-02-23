import { motion } from "framer-motion";

export const Card = ({ title, value }) => {
  return (
    <motion.div
      className="p-6 bg-white shadow-lg rounded-lg flex flex-col items-center text-center"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{value}</p>
    </motion.div>
  );
};
