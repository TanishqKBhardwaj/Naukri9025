import BookCard from "./BookCard";

export default function BookList({ books }) {
  if (!books.length) {
    return (
      <p
        className="text-center mt-6 text-lg"
        style={{ color: "var(--muted-foreground)" }}
      >
        No books found
      </p>
    );
  }
  console.log(books)

  return (
    <div className="max-w-6xl mx-auto   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10  mt-20">
      {books.map((book, idx) => (
        <div
          key={idx}
          className="transition-transform transform hover:scale-105 hover:shadow-lg"
        >
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}
