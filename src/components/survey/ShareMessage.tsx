
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const MESSAGE = `Hey! Walmart is urgently looking for product reviewers, I just signed up! They're giving reviewers $750 to shop and review anything at Walmart to everyone who signs up and shares the program with 3 friends. Sign up here: https://ReviewerPlace.com 🙏`;

interface ShareMessageProps {
  shareCount: number;
  onShare: () => void;
}

export const ShareMessage = ({ shareCount, onShare }: ShareMessageProps) => {
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
        description: "Share this message with 3 friends to continue.",
      });
      
      onShare();
    } catch (error) {
      toast({
        title: "Message copied to clipboard",
        description: "Please paste and share with 3 friends to continue.",
      });
      onShare();
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-walmart-blue mb-2">Help Spread The Word!</h2>
      <p className="text-walmart-gray mb-6">
        (Must send to 3 real phone numbers to claim your $750 Walmart reward!)
      </p>
      <div className="bg-walmart-lightgray p-6 rounded-lg mb-6 w-full">
        <p className="text-walmart-gray mb-4">{shareCount}/3 friends shared</p>
        <div className="bg-white p-4 rounded-lg mb-4 text-left">
          <p className="text-sm">{MESSAGE}</p>
        </div>
        <Button
          onClick={handleShare}
          className="bg-walmart-blue hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300"
        >
          Copy & Share ({3 - shareCount} remaining)
        </Button>
      </div>
    </>
  );
};
