const calculateMiddleColor = ({
  color1 = "990F02",
  color2 = "3CB043",
  ratio = 0,
}) => {
  const hex = (color: number) => {
    const colorString = color.toString(16);
    return colorString.length === 1 ? `0${colorString}` : colorString;
  };

  const r = Math.ceil(
    parseInt(color2.substring(0, 2), 16) * ratio +
      parseInt(color1.substring(0, 2), 16) * (1 - ratio)
  );
  const g = Math.ceil(
    parseInt(color2.substring(2, 4), 16) * ratio +
      parseInt(color1.substring(2, 4), 16) * (1 - ratio)
  );
  const b = Math.ceil(
    parseInt(color2.substring(4, 6), 16) * ratio +
      parseInt(color1.substring(4, 6), 16) * (1 - ratio)
  );

  return hex(r) + hex(g) + hex(b);
};

const StatCard = ({
  label,
  amount,
  maxAmount,
}: {
  label: string;
  amount: number;
  maxAmount: number;
}) => {
  const maxWidth = 250;
  return (
    <div className="grid grid-cols-[1fr_2fr]">
      <div className="flex justify-between">
        <span>{label}</span>
        <span>{amount}</span>
      </div>
      <div
        style={{
          width: `${(amount / maxAmount) * maxWidth}px`,
          backgroundColor: `#${calculateMiddleColor({
            ratio: amount / maxAmount,
          })}`,
        }}
      />
    </div>
  );
};

export default StatCard;
