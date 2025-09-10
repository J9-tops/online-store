import PriceFormatter from "./PriceFormatter";

interface Props {
  price: number | undefined;
  className?: string;
  label?: string;
}
const PriceView = ({ price, label, className }: Props) => {
  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex items-center gap-2">
        <PriceFormatter amount={price} className={className} />
      </div>
      <p className="text-gray-500">{label}</p>
    </div>
  );
};

export default PriceView;
