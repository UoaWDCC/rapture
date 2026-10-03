"use client";

type props = {
  className?: string;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  amount: number;
  numCap: number;
};

export default function IncrementorButton(props: props) {
  return (
    <div
      className={`flex flex-row w-[35%] px-[3.5%] py-[1.5%] border-brand-yellow border ${props.className}`}
    >
      <button
        className={`font-mono text-brand-yellow rounded-sm hover:text-shadow-white hover:text-shadow-xs hover:cursor-pointer`}
        onClick={() => props.setCounter((c) => Math.max(0, c - 1))}
      >
        -
      </button>
      <span className="number mx-auto">{props.amount}</span>
      <button
        className={`font-mono text-brand-yellow rounded-sm hover:text-shadow-white hover:text-shadow-xs hover:cursor-pointer`}
        onClick={() => props.setCounter((c) => Math.min(props.numCap, c + 1))}
      >
        +
      </button>
    </div>
  );
}
