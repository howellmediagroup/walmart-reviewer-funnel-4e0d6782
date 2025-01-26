import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

const MESSAGE = `Hey! Walmart is desperately looking for product reviewers, I just signed up! They're giving away $750 to shop and review anything at Walmart to everyone who signs up and shares the program with 5 friends. Sign up here: https://ReviewerPlace.com 🙏`;

export const ShareStep = ({ onComplete }: { onComplete: () => void }) => {
  const [shareCount, setShareCount] = useState(0);

  const handleShare = async () => {
    try {
      await navigator.share({
        text: MESSAGE,
      });
      setShareCount((prev) => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          onComplete();
        }
        return newCount;
      });
    } catch (error) {
      // Fallback to clipboard if share API is not supported
      await navigator.clipboard.writeText(MESSAGE);
      toast({
        title: "Message copied!",
        description: "Share this message with 5 friends to continue.",
      });
      setShareCount((prev) => {
        const newCount = prev + 1;
        if (newCount >= 5) {
          onComplete();
        }
        return newCount;
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center"
    >
      <h2 className="text-2xl font-bold text-walmart-blue mb-2">Help Spread The Word!</h2>
      <p className="text-walmart-gray mb-6">
        (Must send to 5 real phone numbers to claim your $750 Walmart reward!)
      </p>
      <div className="bg-walmart-lightgray p-6 rounded-lg mb-6 w-full">
        <p className="text-walmart-gray mb-4">{shareCount}/5 friends shared</p>
        <div className="bg-white p-4 rounded-lg mb-4 text-left">
          <p className="text-sm">{MESSAGE}</p>
        </div>
        <Button
          onClick={handleShare}
          className="bg-walmart-blue hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
        >
          Copy & Share ({5 - shareCount} remaining)
        </Button>
      </div>
    </motion.div>
  );
};