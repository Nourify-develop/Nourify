import { IoSearch } from "react-icons/io5";
import React, { useState } from "react";
import { products } from "@/ui/products/_data";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useRouter } from "next/navigation";


interface NavSearchProps {
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  onSearch?: (term: string) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  handleSearchClick?: (e: React.MouseEvent) => void;
  handleSearchClose?: (e: React.MouseEvent) => void;
  isSmallScreen: boolean;
}

export const NavSearch: React.FC<NavSearchProps> = ({
  isSearchOpen,
  setIsSearchOpen,
  onSearch,
  handleSearchClick,
  handleSearchClose,
  inputRef,
  isSmallScreen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const router = useRouter();


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    if (onSearch) onSearch(query);

    // Local search filtering
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  // Placeholder for future API integration
  const fetchSearchResults = async (query: string) => {
    // Uncomment when API is ready
    // const response = await fetch(`/api/products/search?query=${query}`);
    // const data = await response.json();
    // setFilteredProducts(data);
  };

  return (
    <div className="flex flex-col  w-full">
      {/* Search Bar */}
      <div className="flex items-center relative">
        <div
          className="absolute left-2.5 cursor-pointer z-10"
          onClick={handleSearchClick}
        >
          <IoSearch
            className="text-gray-600 hover:text-green-700 transition-colors"
            size={20}
          />
        </div>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search..."
          value={searchTerm}
          className={`
            transition-all duration-300 ease-in-out
            rounded-full
            py-2 pl-10
            outline-none
            focus:ring-2 focus:ring-green-1/20
            ${
              isSearchOpen || !isSmallScreen
                ? "w-36 md:w-64 border border-green-1 md:border-0 md:bg-[#F4F4F4]"
                : "bg-[#F4F4F4] h-10 w-10"
            }
          `}
          onClick={(e) => {
            e.stopPropagation();
            setIsSearchOpen(true);
          }}
          onChange={handleInputChange}
        />
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="absolute top-full left-0 h-screen overflow-auto   w-screen bg-white shadow-md  z-50">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() =>{
                  setSearchTerm('')
                  router.push(`/shop/${product.category}/${product.name}`)}
                }
                className="flex justify-between items-center p-5 border-b border-gray-2 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="text-primary-2/90">{product.name}</span>
                  <span className="text-xs bg-gray-1 border border-primary-2/30 text-primary-2/80 px-2 py-1 rounded-lg">
                    {product.category}
                  </span>
                </div>
                <div className="text-primary-2/30 font-bold">
                  <MdOutlineArrowOutward size={28} />
                </div>
              </div>
            ))
          ) : (
            <div className="p-2 text-center text-gray-500">
              No results found
            </div>
          )}
        </div>
      )}
    </div>
  );
};
