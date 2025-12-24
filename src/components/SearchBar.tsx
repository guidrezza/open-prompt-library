"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    categories: string[];
}

export default function SearchBar({
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
}: SearchBarProps) {
    return (
        <div className="w-full max-w-2xl mx-auto space-y-4 px-6 md:px-0">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white/70 transition-colors" size={20} />
                <input
                    type="text"
                    placeholder="Search prompts by title or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-white/20 transition-all placeholder:text-white/30 text-white"
                />
                {searchQuery && (
                    <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center">
                <button
                    onClick={() => setSelectedCategory("All")}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === "All"
                            ? "bg-white text-black"
                            : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                        }`}
                >
                    All
                </button>
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                                ? "bg-white text-black"
                                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
}
