import React, { useState } from "react";
import { FilterIcon, X, ChevronDown, ChevronUp, Sliders } from "lucide-react";

function ShoppingFilterSection({
  Categoties,
  categoryFilter,
  setCategoryFilter,
  clearFilters
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    category: true,
  });

  
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <>
      {/* Mobile filter button */}
      <button 
        className="lg:hidden flex items-center gap-2 mb-4 px-5 py-3 bg-black text-white rounded-md shadow-sm"
        onClick={() => setIsFilterOpen(true)}
      >
        <Sliders size={16} />
        <span className="font-medium">Filter & Sort</span>
      </button>

      {/* Filter sidebar - larger screens or when opened on mobile */}
      <div className={`
        fixed lg:relative top-0 left-0 h-full lg:h-auto w-full lg:w-64 z-50
        bg-white lg:bg-transparent
        transition-all duration-300 ease-in-out
        ${isFilterOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:block overflow-auto
      `}>
        <div className="p-6 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] overflow-y-auto bg-white shadow-sm border border-gray-100 rounded-md">
          {/* Mobile header */}
          <div className="flex items-center justify-between lg:hidden mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Filter Products</h2>
            <button 
              onClick={() => setIsFilterOpen(false)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-6">
            {/* Category filter */}
            <div className="border-b border-gray-100 pb-6">
              <button 
                className="flex items-center justify-between w-full mb-3"
                onClick={() => toggleSection('category')}
              >
                <h3 className="font-medium text-gray-900">Bag Type</h3>
                {expandedSections.category ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              
              {expandedSections.category && (
                <div className="space-y-2.5 mt-3">
                  {Categoties.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        value={category.id}
                        checked={categoryFilter.includes(category.id)}
                        onChange={(e) =>
                          setCategoryFilter((prevFilters) =>
                            prevFilters.includes(e.target.value)
                              ? prevFilters.filter((item) => item !== e.target.value)
                              : [...prevFilters, e.target.value]
                          )
                        }
                        className="form-checkbox h-4 w-4 border border-gray-300 rounded text-black focus:ring-0 focus:ring-offset-0 transition"
                      />
                      <span className="ml-3 text-sm text-gray-700 group-hover:text-black transition-colors">
                        {category.label}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>


            {/* Clear button */}
            <button 
              onClick={clearFilters}
              className="w-full px-4 py-2.5 border border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-sm font-medium mt-2"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingFilterSection;
