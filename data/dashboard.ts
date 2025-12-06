export type KPI = {
  title: string;
  value: number | string;
  change: number; // percent change vs previous period
};

export const kpis: KPI[] = [
  { title: "Cars Sold", value: 150, change: 12 },
  { title: "Cars Hired", value: 89, change: 5 },
  { title: "Total Revenue", value: "$125,400", change: 8 },
  { title: "Active Listings", value: 45, change: -2 },
];

export const monthlyRevenue: number[] = [
  8000, 9500, 12000, 15000, 14000, 16000, 17000, 16500, 15500, 18000, 20000,
  21000,
];

export type Booking = {
  id: string;
  customer: string;
  car: string;
  date: string;
  amount: number;
  status: "Confirmed" | "Pending" | "Cancelled";
};

export const recentBookings: Booking[] = [
  {
    id: "BK-1001",
    customer: "John Doe",
    car: "Toyota Corolla 2019",
    date: "2025-11-22",
    amount: 120,
    status: "Confirmed",
  },
  {
    id: "BK-1002",
    customer: "Mary Smith",
    car: "Honda Civic 2020",
    date: "2025-11-20",
    amount: 95,
    status: "Pending",
  },
  {
    id: "BK-1003",
    customer: "Carlos Ruiz",
    car: "Ford Ranger 2018",
    date: "2025-11-18",
    amount: 220,
    status: "Confirmed",
  },
  {
    id: "BK-1004",
    customer: "Aisha K.",
    car: "Nissan Qashqai 2021",
    date: "2025-11-15",
    amount: 110,
    status: "Cancelled",
  },
  {
    id: "BK-1005",
    customer: "Li Wei",
    car: "Subaru Forester 2017",
    date: "2025-11-12",
    amount: 80,
    status: "Confirmed",
  },
];

export type Maintenance = {
  carId: string;
  model: string;
  dueDate: string;
  miles: number;
};

export const upcomingMaintenance: Maintenance[] = [
  {
    carId: "car_002",
    model: "Honda Civic 2020",
    dueDate: "2025-12-05",
    miles: 45000,
  },
  {
    carId: "car_004",
    model: "Ford Ranger 2018",
    dueDate: "2026-01-10",
    miles: 78000,
  },
  {
    carId: "car_003",
    model: "Toyota Corolla 2019",
    dueDate: "2026-02-02",
    miles: 61000,
  },
];

export const topModels = [
  { model: "Toyota Corolla", sold: 45, hired: 120 },
  { model: "Honda Civic", sold: 30, hired: 95 },
  { model: "Ford Ranger", sold: 22, hired: 30 },
];
