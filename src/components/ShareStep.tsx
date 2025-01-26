import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "@/components/ui/use-toast";

const MESSAGE = `Hey! Walmart is desperately looking for product reviewers, I just signed up! They're giving away $750 to shop and review anything at Walmart to everyone who signs up and shares the program with 5 friends. Sign up here: https://ReviewerPlace.com 🙏`;

export const ShareStep = ({ onComplete }: { onComplete: () => void }) => {
  const [shareCount, setShareCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<"shopping" | "helpfulness" | "age" | "share">("shopping");
  const [shoppingFrequency, setShoppingFrequency] = useState<string>("");

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(MESSAGE);
      
      // Check if on Mac desktop
      const isMacDesktop = /Macintosh/.test(navigator.userAgent) && !/iPhone|iPad/.test(navigator.userAgent);
      
      if (isMacDesktop) {
        window.location.href = `imessage://`;
      }
      // Check if on mobile
      else if (/Android|iPhone/i.test(navigator.userAgent)) {
        // For iOS
        if (/iPhone/i.test(navigator.userAgent)) {
          window.location.href = `sms:&body=${encodeURIComponent(MESSAGE)}`;
        } 
        // For Android
        else {
          window.location.href = `sms:?body=${encodeURIComponent(MESSAGE)}`;
        }
      }
      
      toast({
        title: "Message copied!",
        description: "Share this message with 5 friends to continue.",
      });
      
      incrementShareCount();
    } catch (error) {
      toast({
        title: "Message copied to clipboard",
        description: "Please paste and share with 5 friends to continue.",
      });
      incrementShareCount();
    }
  };

  const incrementShareCount = () => {
    setShareCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        onComplete();
      }
      return newCount;
    });
  };

  const handleFrequencySelect = (frequency: string) => {
    setShoppingFrequency(frequency);
    setCurrentQuestion("helpfulness");
  };

  const handleHelpfulnessSelect = () => {
    setCurrentQuestion("age");
  };

  const handleAgeSelect = (isAdult: boolean) => {
    if (isAdult) {
      setCurrentQuestion("share");
    } else {
      toast({
        title: "Age Requirement",
        description: "You must be 18 or older to participate.",
      });
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion) {
      case "shopping":
        return (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-walmart-blue mb-6">
              How often do you shop at Walmart?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {["Daily", "Weekly", "Monthly", "Never"].map((frequency) => (
                <Button
                  key={frequency}
                  variant="outline"
                  onClick={() => handleFrequencySelect(frequency)}
                  className="p-4 h-auto border-2 border-walmart-blue text-walmart-blue hover:bg-walmart-blue hover:text-white"
                >
                  {frequency}
                </Button>
              ))}
            </div>
          </div>
        );

      case "helpfulness":
        return (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-walmart-blue mb-6">
              How helpful would a $750 Walmart gift card be for you right now?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                "Very helpful",
                "Somewhat helpful",
                "Not very helpful",
                "Don't need it"
              ].map((option) => (
                <Button
                  key={option}
                  variant="outline"
                  onClick={() => handleHelpfulnessSelect()}
                  className="p-4 h-auto border-2 border-walmart-blue text-walmart-blue hover:bg-walmart-blue hover:text-white"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        );

      case "age":
        return (
          <div className="w-full max-w-md">
            <h2 className="text-2xl font-bold text-walmart-blue mb-6">
              Are you currently 18 years or older?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Yes", value: true },
                { label: "No", value: false }
              ].map((option) => (
                <Button
                  key={option.label}
                  variant="outline"
                  onClick={() => handleAgeSelect(option.value)}
                  className="p-4 h-auto border-2 border-walmart-blue text-walmart-blue hover:bg-walmart-blue hover:text-white"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        );

      case "share":
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-8 max-w-2xl mx-auto text-center"
    >
      {renderQuestion()}
    </motion.div>
  );
};