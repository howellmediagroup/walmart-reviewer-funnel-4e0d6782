import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { QuestionCard } from "./survey/QuestionCard";
import { LoadingSuccess } from "./survey/LoadingSuccess";
import { ShareMessage } from "./survey/ShareMessage";
import { toast } from "@/components/ui/use-toast";

type QuestionType = "shopping" | "helpfulness" | "age" | "loading" | "success" | "share";

export const ShareStep = ({ onComplete }: { onComplete: () => void }) => {
  const [shareCount, setShareCount] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>("shopping");
  const [shoppingFrequency, setShoppingFrequency] = useState<string>("");

  useEffect(() => {
    if (currentQuestion === "loading") {
      const timer = setTimeout(() => {
        setCurrentQuestion("success");
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (currentQuestion === "success") {
      const timer = setTimeout(() => {
        setCurrentQuestion("share");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  const incrementShareCount = () => {
    setShareCount((prev) => {
      const newCount = prev + 1;
      if (newCount >= 5) {
        onComplete();
      }
      return newCount;
    });
  };

  const handleFrequencySelect = (frequency: string | boolean) => {
    setShoppingFrequency(frequency as string);
    setCurrentQuestion("helpfulness");
  };

  const handleHelpfulnessSelect = () => {
    setCurrentQuestion("age");
  };

  const handleAgeSelect = (isAdult: boolean | string) => {
    if (isAdult) {
      setCurrentQuestion("loading");
    } else {
      toast({
        title: "Age Requirement",
        description: "You must be 18 or older to participate.",
      });
    }
  };

  const renderQuestion = () => {
    switch (currentQuestion) {
      case "loading":
      case "success":
        return <LoadingSuccess state={currentQuestion} />;

      case "shopping":
        return (
          <QuestionCard
            title="How often do you shop at Walmart?"
            options={[
              { label: "Daily", value: "Daily" },
              { label: "Weekly", value: "Weekly" },
              { label: "Monthly", value: "Monthly" },
              { label: "Never", value: "Never" }
            ]}
            onSelect={handleFrequencySelect}
          />
        );

      case "helpfulness":
        return (
          <QuestionCard
            title="How helpful would a $750 Walmart gift card be for you right now?"
            options={[
              { label: "Very helpful", value: "Very helpful" },
              { label: "Somewhat helpful", value: "Somewhat helpful" },
              { label: "Not very helpful", value: "Not very helpful" },
              { label: "Don't need it", value: "Don't need it" }
            ]}
            onSelect={handleHelpfulnessSelect}
          />
        );

      case "age":
        return (
          <QuestionCard
            title="Are you currently 18 years or older?"
            options={[
              { label: "Yes", value: true },
              { label: "No", value: false }
            ]}
            onSelect={handleAgeSelect}
          />
        );

      case "share":
        return (
          <ShareMessage
            shareCount={shareCount}
            onShare={incrementShareCount}
          />
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