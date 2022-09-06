export const FirstLetter = (name: string | undefined): string => {
  return (
    name
      ?.match(/\b(\w)/g)
      ?.join("")
      ?.substring(0, 2) || "--"
  );
};

export const SheOrHe = (name: string | undefined): string => {
  return name === "female" ? "She" : "He";
};

export const GenerateColors = (count: number = 1) => {
  return new Array(count).fill(1).map(dynamicColors);
};

const dynamicColors = () => {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  return `rgba(${r},${g},${b},0.8)`;
};
