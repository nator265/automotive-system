import React from "react";
import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import AirportShuttleIcon from "@mui/icons-material/AirportShuttle";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";

const stats = [
  {
    label: "SUVs",
    value: 120,
    icon: (
      <DirectionsCarFilledIcon
        fontSize="large"
        className="text-orange-500 mx-auto mb-2"
      />
    ),
  },
  {
    label: "Sedans",
    value: 200,
    icon: (
      <DriveEtaIcon fontSize="large" className="text-orange-500 mx-auto mb-2" />
    ),
  },
  {
    label: "Buses",
    value: 35,
    icon: (
      <AirportShuttleIcon
        fontSize="large"
        className="text-orange-500 mx-auto mb-2"
      />
    ),
  },
  {
    label: "Luxury Vehicles",
    value: 50,
    icon: (
      <EmojiEventsIcon
        fontSize="large"
        className="text-orange-500 mx-auto mb-2"
      />
    ),
  },
  {
    label: "Years in Business",
    value: 10,
    icon: (
      <CalendarTodayIcon
        fontSize="large"
        className="text-orange-500 mx-auto mb-2"
      />
    ),
  },
  {
    label: "Satisfied Customers",
    value: 1500,
    icon: (
      <PeopleIcon fontSize="large" className="text-orange-500 mx-auto mb-2" />
    ),
  },
];

const reviews = [
  {
    name: "John Doe",
    comment:
      "Fantastic service! The car I hired was in excellent condition and the staff were very helpful.",
    rating: 5,
  },
  {
    name: "Jane Smith",
    comment:
      "I bought my car here and it was a seamless experience. Highly recommend!",
    rating: 4,
  },
  {
    name: "Michael Johnson",
    comment: "Professional and reliable service. Very happy with my SUV.",
    rating: 5,
  },
];

const ReviewsAndStats = () => {
  return (
    <div className="relative z-4 w-screen bg-[url('/homescreen/heroSection.jpg')] bg-fixed bg-cover bg-bottom bg-no-repeat">
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Statistics */}
      <div className="relative z-10 max-w-7xl mx-auto mb-16 py-16">
        
        <div className="grid grid-cols-2 gap-8 text-center md:px-40">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 bg-white scale-90 rounded-lg shadow hover:shadow-lg transition cursor-default"
            >
              {stat.icon}
              <p className="text-4xl font-bold text-orange-600">{stat.value}</p>
              <p className="text-gray-700 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="relative z-10 max-w-5xl mx-auto py-16">
        <h2 className="text-3xl font-bold text-center text-white mb-10 pb-10 md:pb-auto">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-10 md:px-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition cursor-default"
            >
              <p className="text-gray-700 mb-4 italic text-base leading-relaxed">
                "{review.comment}"
              </p>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <p className="text-yellow-400 text-xl select-none">
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsAndStats;
