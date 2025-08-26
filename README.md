# 📚 Book Finder

Book Finder is a modern web application built with **React**, **Tailwind CSS**, and **ShadCN UI components** that allows users to search for books using the **Open Library API**. Users can explore books, apply multiple filters, and access editions or work pages for reading or browsing.

---

## 🛠 Features

### 1. **Search Functionality**
- Users can search for books by **title**.
- The search bar supports multiple filters:
  - **Author**: Filter results by specific authors.
  - **Subject**: Filter results by subject or category.
  - **Publish Year**: Filter by first published year.
  - **Edition Count**: Filter by number of editions.
- Users can enter any combination of filters or just one filter without providing the book title.

---

### 2. **Book Display**
- Results are displayed as **cards** using ShadCN’s `Card` components.
- Each card shows:
  - Book cover
  - Title
  - Authors
  - Short description: First published year, number of editions, and top 3 subjects
- Clicking on a card opens a **modal** with detailed information about the book:
  - Full subjects list
  - Full edition count
  - First published year
  - Large cover image

---

### 3. **Pagination**
- Search results are paginated.
- Users can navigate between pages using `Prev` and `Next` buttons.
- Pagination is dynamically calculated based on the **total number of results** returned by the Open Library API.

---

### 4. **Dark / Light Mode**
- Dark mode is implemented using a **custom ThemeProvider** with ShadCN styling.
- Users can toggle between:
  - **Light Mode**
  - **Dark Mode**
  - **System Mode**
- All components respond dynamically to the selected theme using **CSS variables** for backgrounds, text, cards, and buttons.

---

### 5. **Redirection to Open Library**
- Open Library provides two main endpoints:
  - **Edition page** (`/books/{edition_key}`): Specific copy of the book. Used when an **eBook is available** (`ebook_access` is `"full"` or `"borrow"`).
  - **Work page** (`/works/{work_key}`): General information about the book. Used when **no digital copy** is available.
- Logic for redirection:

```js
const readLink =
  book.ebook_access === "full" || book.ebook_access === "borrow"
    ? `https://openlibrary.org/books/${book.cover_edition_key}`
    : `https://openlibrary.org${book.key}`;
