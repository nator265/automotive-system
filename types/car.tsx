export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  type: string;
  fuel: "Petrol" | "Diesel" | "Hybrid" | "EV";
  transmission: "Automatic" | "Manual";
  steering: "Right" | "Left";
  engineCapacity: number;
  mileage: number;
  seats: number;
  color: string;
  availability: "For Sale" | "For Hire";
  images: string[];
  features: string[];
}
