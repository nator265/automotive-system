import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

const Search = () => {
  return (
    <div>
      <div className="flex items-center justify-center w-full md:pt-10 pt-8 font-semibold text-2xl md:mb-8 md-4">
        <h2>Find your Perfect Car</h2>
      </div>
      <div className="flex items-center justify-center w-full">
        <form action="" method="post" className="flex gap-4">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Your car awaits..."
            className="border border-gray-400 rounded-md md:w-[500px] h-12 p-4"
          />
          <div className="w-12 h-12 items-center justify-center flex hover:bg-gray-200 rounded-md border border-gray-400">
            <Link href="/">
              <SearchIcon />
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Search;
