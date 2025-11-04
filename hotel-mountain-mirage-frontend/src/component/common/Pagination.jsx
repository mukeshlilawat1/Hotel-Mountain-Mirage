import React from "react";

const Pagination = ({ roomsPage, totalRooms, currentPage, paginate }) => {
    const totalPages = Math.ceil(totalRooms / roomsPage);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    if (totalPages <= 1) return null; // hide pagination for 1 page

    return (
        <nav className="flex justify-center mt-10">
            <ul className="flex flex-wrap items-center gap-2">
                {/* Prev Button */}
                <li>
                    <button
                        onClick={() => currentPage > 1 && paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg border transition-all duration-300 ${currentPage === 1
                                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                : "text-gray-600 border-gray-300 hover:bg-teal-500 hover:text-white hover:border-teal-500"
                            }`}
                    >
                        Prev
                    </button>
                </li>

                {/* Page Numbers */}
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => paginate(number)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-all duration-300 ${currentPage === number
                                    ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-md scale-105"
                                    : "border border-gray-300 text-gray-600 hover:bg-teal-500 hover:text-white hover:border-teal-500"
                                }`}
                        >
                            {number}
                        </button>
                    </li>
                ))}

                {/* Next Button */}
                <li>
                    <button
                        onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg border transition-all duration-300 ${currentPage === totalPages
                                ? "text-gray-400 border-gray-200 cursor-not-allowed"
                                : "text-gray-600 border-gray-300 hover:bg-teal-500 hover:text-white hover:border-teal-500"
                            }`}
                    >
                        Next
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
