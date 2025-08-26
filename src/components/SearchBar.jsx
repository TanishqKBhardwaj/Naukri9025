import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu"; // adjust path if needed
import { Button } from "./ui/button";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    author: "",
    publisher: "",
    year: "",
    subject: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query, filters);
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row justify-center gap-2 mb-6 items-center"
    >
      {/* Main search input */}
      <input
        type="text"
        placeholder="Search for books..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full sm:w-2/3 md:w-1/2 rounded-full px-4 py-2 shadow-sm transition-colors focus:outline-none focus:ring-2"
        style={{
          backgroundColor: "var(--input)",
          color: "var(--foreground)",
          borderColor: "var(--border)",
        }}
      />

      {/* Filter dropdown with inputs */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full px-4 py-2 shadow transition-transform hover:scale-105"
            style={{
              backgroundColor: "var(--secondary)",
              color: "var(--secondary-foreground)",
            }}
          >
            Filters
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="p-4 w-60 space-y-3">
          <DropdownMenuLabel>Author</DropdownMenuLabel>
          <input
            type="text"
            placeholder="e.g. J.K. Rowling"
            value={filters.author}
            onChange={(e) => handleFilterChange("author", e.target.value)}
            className="w-full rounded-md px-3 py-1 border border-gray-300 focus:ring-2 focus:ring-primary transition"
            style={{
              backgroundColor: "var(--input)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            }}
          />

          <DropdownMenuLabel>Publisher</DropdownMenuLabel>
          <input
            type="text"
            placeholder="e.g. Bloomsbury"
            value={filters.publisher}
            onChange={(e) => handleFilterChange("publisher", e.target.value)}
            className="w-full rounded-md px-3 py-1 border border-gray-300 focus:ring-2 focus:ring-primary transition"
            style={{
              backgroundColor: "var(--input)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            }}
          />

          <DropdownMenuLabel>Year</DropdownMenuLabel>
          <input
            type="text"
            placeholder="e.g. 1997-2007"
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            className="w-full rounded-md px-3 py-1 border border-gray-300 focus:ring-2 focus:ring-primary transition"
            style={{
              backgroundColor: "var(--input)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            }}
          />

          <DropdownMenuLabel>Subject</DropdownMenuLabel>
          <input
            type="text"
            placeholder="e.g. Fantasy"
            value={filters.subject}
            onChange={(e) => handleFilterChange("subject", e.target.value)}
            className="w-full rounded-md px-3 py-1 border border-gray-300 focus:ring-2 focus:ring-primary transition"
            style={{
              backgroundColor: "var(--input)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            }}
          />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Search button */}
      <button
        type="submit"
        className="rounded-full px-6 py-2 shadow transition-transform hover:scale-105"
        style={{
          backgroundColor: "var(--primary)",
          color: "var(--primary-foreground)",
        }}
      >
        Search
      </button>
    </form>
  );
}
