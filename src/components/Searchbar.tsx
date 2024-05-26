import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface Ad {
  id: number;
  posterName: string;
  businessIdea: string;
  description: string;
  location: string;
  investment: string;
  requiredSkills: Array<string>;
}

const Searchbar = () => {

  const [searchQuery, setSearchQuery] = useState("");
  const [ads, setAds] = useState<Ad[]>([]);
  const [filteredAds, setFilteredAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [category, setCategory] = useState("Choose a category");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const debounceTimeout = useRef<number | null>(null); // store a mutable value that persists across renders.
  const dropdownRef = useRef<HTMLDivElement>(null) // create a reference to a DOM element (div) 

  // Fetch ads data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data from the API
  const fetchData = async () => {
    setLoading(true);
    const response = await fetch("/api/ads");
    const data = await response.json();
    setAds(data as Ad[]);
    setLoading(false);
  };

  // Handle search input changes
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Clear previous timeout if exists
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    // Set a new timeout to debounce the search
    debounceTimeout.current = window.setTimeout(() => {
      // search after typing 3 characters
      if (query.length >= 3) {
        const filtered = ads.filter((ad) => {
          // Filter based on category and query
          if (category === "Location") {
            return ad.location.toLowerCase().includes(query.toLowerCase());
          } else if (category === "Business Idea") {
            return ad.businessIdea.toLowerCase().includes(query.toLowerCase());
          } else {
            return false
          }
        });

        setFilteredAds(filtered);
        setNoResults(filtered.length === 0);
      } else {
        setFilteredAds([]);
        setNoResults(false);
      }
    }, 300);
  };

// Clear search query and results
const clearSearch = () => {
  setSearchQuery("");
  setFilteredAds([]);
  setNoResults(false);
};

const handleCategorySelect = (category: string) => {
  setCategory(category);
  setDropdownOpen(false);
};


 // Close dropdown when clicking outside
 useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);


  return (
    <form className="max-w-3xl mx-auto py-10 my-10">
      <div className="flex">
        {/* Category Dropdown */}
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-slate-700 sr-only">
          Search
        </label>
        <button
          id="dropdown-button"
          className="flex-shrink-0 z-10 inline-flex items-center py-3 px-6 text-sm font-medium text-center text-slate-700 bg-zinc-300 border border-zinc-200 rounded-s-lg hover:bg-zinc-200 focus:ring-4 focus:outline-none focus:ring-zinc-200"
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {category}
          <svg
            className="w-2.5 h-2.5 ms-2.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute bg-slate-700 divide-y divide-gray-100 rounded-lg shadow w-44 ">
            <ul className="py-2 text-sm text-zinc-300">
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-600 hover:text-white"
                  onClick={() => handleCategorySelect("Choose a category")}
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 pt-8 pb-2 hover:bg-gray-600 hover:text-white"
                  onClick={() => handleCategorySelect("Location")}
                >
                  Location
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-600 hover:text-white"
                  onClick={() => handleCategorySelect("Business Idea")}
                >
                  Business Idea
                </button>
              </li>
            </ul>
          </div>
        )}

        <div className="relative w-full">
          {/* Search Input */}
          <input
            type="search"
            id="search-dropdown"
            value={searchQuery}
            onChange={handleSearch}
            className="block p-4 w-full z-20 text-lg text-slate-700 bg-zinc-300 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-customCyan focus:border-customCyan"
            placeholder="Search by location or business idea"
            disabled={category === "Choose a category"}
            required
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-16 flex items-center pr-3 text-slate-700"
            >
              Clear
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            onClick={(e) => e.preventDefault()}
            className="absolute top-0 right-0 p-4 text-lg font-medium h-full text-white bg-customBlue rounded-e-lg border border-customBlue hover:bg-secondCyan focus:ring-4 focus:outline-none focus:ring-customCyan"
            disabled={category === "Choose a category"}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>

      {/* Search Results */}
      <div>
        {loading ? (
          <div className="text-white text-center mt-4">Loading...</div>
        ) : (
          <ul className="mt-4">
            {noResults ? (
              <li className="text-white text-center">No results found</li>
            ) : (
              filteredAds.map((ad) => (
                <Link to={`/ads/${ad.id}`} key={ad.id}>
                  <li className="my-4 text-lg font-bold text-zinc-300 hover:text-zinc-100">
                    {ad.businessIdea}
                  </li>
                </Link>
              ))
            )}
          </ul>
        )}
      </div>
    </form>
  );
};

export default Searchbar;
