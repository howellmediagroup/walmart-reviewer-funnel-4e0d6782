import { useState } from "react";
import { LandingStep } from "@/components/LandingStep";
import { ShareStep } from "@/components/ShareStep";
import { ConfirmStep } from "@/components/ConfirmStep";
import { RewardStep } from "@/components/RewardStep";

const Index = () => {
  const [step, setStep] = useState(0);

  const steps = [
    <LandingStep key="landing" onStart={() => setStep(1)} />,
    <ShareStep key="share" onComplete={() => setStep(2)} />,
    <ConfirmStep key="confirm" onComplete={() => setStep(3)} />,
    <RewardStep key="reward" />,
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-12">{steps[step]}</div>
    </div>
  );
};

export default Index;