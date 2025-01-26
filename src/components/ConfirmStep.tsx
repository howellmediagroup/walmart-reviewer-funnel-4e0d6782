import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { motion } from "framer-motion";

export const ConfirmStep = ({ onComplete }: { onComplete: () => void }) => {
  const [confirmations, setConfirmations] = useState({
    messages: false,
    eligibility: false,
  });

  const isComplete = confirmations.messages && confirmations.eligibility;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-walmart-blue mb-6">Confirm Your Messages</h2>
      <p className="text-walmart-gray mb-6">
        Check both boxes and then press continue to claim reward
      </p>
      <div className="space-y-4 mb-6 w-full max-w-md">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="messages"
            checked={confirmations.messages}
            onCheckedChange={(checked) =>
              setConfirmations((prev) => ({ ...prev, messages: checked as boolean }))
            }
          />
          <label htmlFor="messages" className="text-walmart-gray">
            I confirm I sent all 5 messages
          </label>
        </div>
        <div className="flex items-center space-x-3">
          <Checkbox
            id="eligibility"
            checked={confirmations.eligibility}
            onCheckedChange={(checked) =>
              setConfirmations((prev) => ({ ...prev, eligibility: checked as boolean }))
            }
          />
          <label htmlFor="eligibility" className="text-walmart-gray">
            I confirm all recipients are 18+ and located in the USA, Canada, Australia, or UK
          </label>
        </div>
      </div>
      <Button
        onClick={onComplete}
        disabled={!isComplete}
        className="bg-walmart-blue hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </Button>
    </motion.div>
  );
};