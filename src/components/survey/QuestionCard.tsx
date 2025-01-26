import { Button } from "@/components/ui/button";

type QuestionOption = {
  label: string;
  value: string | boolean;
};

interface QuestionCardProps {
  title: string;
  options: QuestionOption[];
  onSelect: (value: string | boolean) => void;
}

export const QuestionCard = ({ title, options, onSelect }: QuestionCardProps) => {
  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-bold text-walmart-blue mb-6">{title}</h2>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <Button
            key={option.label}
            variant="outline"
            onClick={() => onSelect(option.value)}
            className="p-4 h-auto border-2 border-walmart-blue text-walmart-blue hover:bg-walmart-blue hover:text-white"
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};