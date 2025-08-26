import { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "./ui/card";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Button } from "./ui/button";

export default function BookCard({ book }) {
  const [open, setOpen] = useState(false);

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : "https://openlibrary.org/static/images/icons/avatar_book-lg.png"; // fallback image

  const descriptionParts = [];
  if (book.first_publish_year)
    descriptionParts.push(`First Published: ${book.first_publish_year}`);
  if (book.edition_count) descriptionParts.push(`Editions: ${book.edition_count}`);
  if (book.subject)
    descriptionParts.push(`Subjects: ${book.subject.join(", ")}`); // full subjects

  const shortDescription = descriptionParts.slice(0, 3).join(" | "); // top 3 for card
  const fullDescription = descriptionParts.join(" | "); // full for modal

  // Determine link for reading or details
  const readLink =
    book.ebook_access === "full" || book.ebook_access === "borrow"
      ? `https://openlibrary.org/books/${book.cover_edition_key}`
      : `https://openlibrary.org${book.key}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card
          className="w-full cursor-pointer hover:shadow-xl hover:scale-105 transition-transform transform"
          style={{ backgroundColor: "var(--card)", color: "var(--card-foreground)" }}
        >
          <img
            src={coverUrl}
            alt={book.title}
            className="w-full h-48 object-cover rounded-t-md"
          />
          <CardContent className="p-4">
            <CardHeader className="mb-2">
              <CardTitle
                className="text-center font-semibold line-clamp-2"
                style={{ color: "var(--foreground)" }}
              >
                {book.title}
              </CardTitle>
              <CardDescription
                className="text-center line-clamp-1"
                style={{ color: "var(--muted-foreground)" }}
              >
                {book.author_name?.join(", ") || "Unknown Author"}
              </CardDescription>
            </CardHeader>
            {shortDescription && (
              <p
                className="text-center mt-1 line-clamp-2"
                style={{ color: "var(--muted-foreground)" }}
              >
                {shortDescription}
              </p>
            )}
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{book.title}</DialogTitle>
          <DialogDescription>
            <p>
              <strong>Authors:</strong> {book.author_name?.join(", ") || "Unknown Author"}
            </p>
            <p>
              <strong>First Published:</strong> {book.first_publish_year || "N/A"}
            </p>
            <p>
              <strong>Editions:</strong> {book.edition_count || "N/A"}
            </p>
            {book.subject && (
              <p>
                <strong>Subjects:</strong> {book.subject.join(", ")}
              </p>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex justify-center">
          <img src={coverUrl} alt={book.title} className="w-48 h-auto rounded-md" />
        </div>

        <div className="mt-4 flex justify-between">
          <DialogClose asChild>
            <Button
              variant="default"
              className="hover:bg-amber-400 bg-amber-700 text-white transition-colors"
            >
              Close
            </Button>
          </DialogClose>

          <a
            href={readLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-500 text-white transition-colors cursor-pointer"
            >
              Read / Details
            </Button>
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
