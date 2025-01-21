import React from "react";
import { Button } from "@heroui/react";
interface TotalPriceBarProps {
    prixTotal: number;
    onClick?: () => void;
}

const TotalPriceBar = (props: TotalPriceBarProps) => {
    const { prixTotal, onClick } = props;
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md rounded-t-3xl flex items-center justify-end px-4 py-1 custom-shadow">
      <div className="flex items-center gap-10">
        <div className="text-right py-2">
          <span className="block text-l text-primary px-3 ">Prix total</span>
          <span className="block text-4xl font-semibold text-primary px-2">{`${prixTotal}€`}</span>
        </div>
        <Button onPress={onClick} className="px-12 py-6 bg-secondary text-white font-semibold text-2xl rounded-full mr-40">
          Réserver
        </Button>
      </div>
    </div>
  );
};

export default TotalPriceBar;
