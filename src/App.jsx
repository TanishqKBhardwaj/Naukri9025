import { useState } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import { searchBooks } from "./api/openLibrary";
import { ThemeProvider } from "./components/ThemeProvider";
import ModeToggle from "./components/ModeToggle";
import { Card } from "./components/ui/card";

function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center items-center gap-2 my-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-50 transition"
        style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        Prev
      </button>
      <span style={{ color: "var(--foreground)" }} className="px-3 py-1 font-semibold">
        {page} / {totalPages}
      </span>
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="px-4 py-2 rounded-full hover:opacity-90 disabled:opacity-50 transition"
        style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)" }}
      >
        Next
      </button>
    </div>
  );
}

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentFilters, setCurrentFilters] = useState({}); // NEW: store filters

  // Updated to accept filters
  const handleSearch = async (query, filters = {}, newPage = 1) => {
    try {
      setLoading(true);
      setCurrentQuery(query);
      setCurrentFilters(filters); // store filters for pagination
      const limit = 20;
      const data = await searchBooks(query, filters, newPage, limit);
      setBooks(data.docs);
      setPage(newPage);
      setTotalPages(Math.ceil(data.numFound / limit));
    } catch (err) {
      console.error(err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    // Use currentQuery and currentFilters for pagination
    handleSearch(currentQuery, currentFilters, newPage);
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <div
        className="min-h-screen transition-colors"
        style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
      >
        <header
          className="shadow-md py-4 mb-6 flex justify-between items-center px-6 transition-colors"
          style={{ backgroundColor: "var(--card)" }}
        >
          <h1 style={{ color: "var(--primary)" }} className="text-3xl font-bold">
            📚 Book Finder
          </h1>
          <ModeToggle />
        </header>

        <main className="max-w-6xl mx-auto px-4">
          {/* Pass both query and filters from SearchBar */}
          <SearchBar onSearch={(query, filters) => handleSearch(query, filters, 1)} />
          {loading ? (
            <p style={{ color: "var(--foreground)" }} className="text-center mt-6 text-lg">
              Loading...
            </p>
          ) : (
            <>
              <BookList books={books} />
              {books.length > 0 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}


export default App;
