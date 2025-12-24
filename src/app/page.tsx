"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import PromptCard from "@/components/PromptCard";
import PromptModal from "@/components/PromptModal";
import promptsData from "@/data/prompts.json";
import { Prompt } from "@/types/prompt";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);

  const prompts = promptsData as Prompt[];

  const categories = useMemo(() => {
    const cats = Array.from(new Set(prompts.map((p) => p.category)));
    return cats.sort();
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    return prompts.filter((prompt) => {
      const matchesSearch =
        prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || prompt.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, prompts]);

  return (
    <main className="min-h-screen pb-20">
      <Header />

      <div className="max-w-7xl mx-auto py-12 space-y-12">
        <div className="space-y-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white px-6">
            Verified AI Image Prompts
          </h2>
          <p className="text-white/40 max-w-xl mx-auto px-6">
            A curated collection of verified image-to-image prompts for high-quality AI artistic transformations.
          </p>
        </div>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <div className="px-6">
          {filteredPrompts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrompts.map((prompt) => (
                <PromptCard
                  key={prompt.id}
                  prompt={prompt}
                  onClick={() => setSelectedPrompt(prompt)}
                />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center space-y-4">
              <p className="text-white/20 text-lg">No prompts found matching your search.</p>
              <button
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <PromptModal
        prompt={selectedPrompt}
        onClose={() => setSelectedPrompt(null)}
      />
    </main>
  );
}
