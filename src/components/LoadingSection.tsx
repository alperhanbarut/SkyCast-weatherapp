import { motion } from "framer-motion";

function LoadingSection() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        <div className="space-y-2">
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            🌤️ Hava durumu bilgileri yükleniyor...
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            En güncel verileri getiriyoruz
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default LoadingSection;
