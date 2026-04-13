interface CardViewProps {
  title: string;
  description: string;
}

const CardView = ({ title, description }: CardViewProps) => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
      <div className="font-medium mb-1">{title}</div>
      <div className="text-xs text-gray-500">{description}</div>
    </div>
  );
}

export default CardView;
