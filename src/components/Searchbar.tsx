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
  const [category, setCategory] = useState("All categories");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const debounceTimeout = useRef<number | null>(null);

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
      const filtered = ads.filter((ad) => {
        // Filter based on category and query
        const searchInCategory =
          category === "Location"
            ? ad.location.toLowerCase().includes(query.toLowerCase())
            : category === "Business Idea"
            ? ad.businessIdea.toLowerCase().includes(query.toLowerCase())
            : ad.businessIdea.toLowerCase().includes(query.toLowerCase()) ||
              ad.location.toLowerCase().includes(query.toLowerCase());

        return searchInCategory || ad.description.toLowerCase().includes(query.toLowerCase());
      });

      setFilteredAds(filtered);
      setNoResults(filtered.length === 0);
    }, 300);
  };

  // Clear search query and results
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredAds([]);
    setNoResults(false);
  };

  return (
    <form className="max-w-lg mx-auto py-20 my-20">
      <div className="flex">
        {/* Category Dropdown */}
        <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
          Search
        </label>
        <button
          id="dropdown-button"
          className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
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
          <div className="absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setCategory("All categories");
                    setDropdownOpen(false);
                  }}
                >
                  All categories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setCategory("Location");
                    setDropdownOpen(false);
                  }}
                >
                  Location
                </button>
              </li>
              <li>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => {
                    setCategory("Business Idea");
                    setDropdownOpen(false);
                  }}
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
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search by category..."
            required
          />

          {/* Clear Button */}
          {searchQuery && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute inset-y-0 right-16 flex items-center pr-3 text-zinc-300"
            >
              Clear
            </button>
          )}

          {/* Search Button */}
          <button
            type="submit"
            onClick={(e) => e.preventDefault()}
            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
                  <li className="my-4 text-sm font-bold text-secondCyan hover:text-customCyan">
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
