import { ArrowUpward } from "@mui/icons-material";
import React from "react";

// -------------- Small Card --------------
export const SmallCard = ({
  title,
    value,
  days,
  color = "text-black",
}: {
  title: string;
        value: string | number;
  days?: string | number;
  color?: string;
}) => {
  return (
    <div className="bg-white shadow p-6 rounded-md w-full h-full space-y-3">
      <div className="font-light">{title}</div>
          <div className={"text-2xl font-semibold text-green-700"}>{value}</div>
          <div className="flex w-full justify-between">
        <div className="text-gray-400 text-sm">Last {days} days</div>
        <div className="text-green-500"><ArrowUpward /></div>
          </div>
    </div>
  );
};

// -------------- Big Card --------------
export const BigCard = ({
  title,
  value,
  children,
}: {
  title: string;
  value: string | number;
  children?: React.ReactNode;
}) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-lg font-bold text-gray-700">{title}</h2>
      <p className="text-3xl font-extrabold mt-3 text-sky-900">{value}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

// -------------- Car Card for big brands--------------
export const CarBrandsCard = ({
  imageSrc,
  brandName,
}: {
  imageSrc: string;
  brandName: string;
}) => {
  return (
    <div className="bg-white shadow:lg md:shadow-none my-8 hover:shadow-lg transition h-[150px] w-48 rounded-md flex flex-col items-center justify-center p-4 cursor-pointer">
      <div className="mb-5">
        <img src={imageSrc} alt={brandName} height={100} width={150}/>
      </div>
    </div>
  );
}
  
// -------------- filter card--------------