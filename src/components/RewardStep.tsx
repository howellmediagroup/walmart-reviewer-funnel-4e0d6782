import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export const RewardStep = () => {
  const handleClaim = () => {
    window.location.href = "https://glstrck.com/aff_c?offer_id=564&aff_id=14106";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center"
    >
      <h2 className="text-2xl font-bold text-walmart-blue mb-6">
        Claim Your $750 Walmart Gift Card
      </h2>
      <div className="bg-walmart-lightgray p-6 rounded-lg mb-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Complete these steps to get your reward:</h3>
        <ol className="text-left space-y-3 mb-6">
          <li>1. Click the button below</li>
          <li>2. Answer Some Quick Questions</li>
          <li>3. Enter Your Basic Info</li>
          <li>4. Complete 2-3 Simple Deals</li>
          <li>5. Claim Your $750 Walmart Gift Card</li>
        </ol>
        <Button
          onClick={handleClaim}
          className="bg-walmart-blue hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
        >
          Continue to Claim Reward
        </Button>
      </div>
    </motion.div>
  );
};