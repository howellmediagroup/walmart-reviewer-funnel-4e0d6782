import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const LandingStep = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center"
    >
      <img
        src="/images/Walmart-Logo.png"
        alt="Walmart Logo"
        className="w-48 mb-8 animate-fadeIn"
      />
      <h1 className="text-4xl font-bold text-walmart-blue mb-4">
        We Are Looking For Product Reviewers!
      </h1>
      <p className="text-xl text-walmart-gray mb-8">
        Complete a few easy steps and share with friends to receive a $750 Walmart Gift Card!
      </p>
      <Button
        onClick={onStart}
        className="bg-walmart-blue hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105"
      >
        Start Now
      </Button>
    </motion.div>
  );
};