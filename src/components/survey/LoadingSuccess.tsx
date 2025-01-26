import { motion } from "framer-motion";

interface LoadingSuccessProps {
  state: "loading" | "success";
}

export const LoadingSuccess = ({ state }: LoadingSuccessProps) => {
  if (state === "loading") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-6">
          <div className="w-12 h-12 border-4 border-walmart-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-walmart-blue">
            Checking your responses to see if you qualify...
          </h2>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-md text-center"
    >
      <h2 className="text-3xl font-bold text-walmart-blue mb-4">
        Congratulations!
      </h2>
      <p className="text-xl text-walmart-gray">
        Based on your responses, you are eligible!
      </p>
    </motion.div>
  );
};