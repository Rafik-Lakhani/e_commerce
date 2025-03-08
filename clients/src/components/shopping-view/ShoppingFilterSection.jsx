import React from "react";
import { FilterIcon, CheckIcon} from "lucide-react";


function ShoppingFilterSection({
  Categoties,
  categoryFilter,
  setCategoryFilter,
}) {
  return (
    <div className="flex flex-col items-start
      bg-white p-4 rounded-lg shadow-md min-w-[250px] max-w-[300px]
      
    ">
      <span className="flex text-sm font-semibold text-gray-700 mb-4">
        <FilterIcon />
        Filter by Category
      </span>
      <div className="flex flex-col items-start">
        {Categoties.map((category) => (
          <>
            <label className="flex items-center">
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
                className="form-checkbox h-5 w-5 text-gray-600 transition duration-150 ease-in-out"
              />
              <span className="ml-3 block text-sm font-medium text-gray-700">
                {category.label}
              </span>
              {categoryFilter.includes(category.id) ? (
                <CheckIcon className="ml-2 h-5 w-5 text-green-500" />
              ) : null}
            </label>
            <hr className="my-2 border-t border-gray-200 w-full" />
          </>
        ))}
      </div>
    </div>
  );
}

export default ShoppingFilterSection;
