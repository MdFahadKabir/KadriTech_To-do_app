import React from "react";
import { IoSearch } from "react-icons/io5";

const SearchComponent = ({ id, placeholder, handleSearch }) => {
  const handleChange = (event) => {
    handleSearch(event.target.value.trim()); // Pass trimmed search term to parent component
  };

  return (
    <div className="w-[300px] mx-auto">
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoSearch />
        </div>
        <input
          type="search"
          id={id}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
          placeholder={placeholder}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};

export default SearchComponent;
