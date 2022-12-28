class Book {
  constructor(title, author, pages, read) {
    this.id =
      this.title = title;
    this.author = author;
    this.pages = pages + " p.";
    this.read = read;
    this.info = function () {
      if (!read) {
        return `${this.title} by ${this.author}, ${this.pages} pages, not yet read`;
      } else {
        return `${this.title} by ${this.author}, ${this.pages} pages, already read`;
      }
    };
  }
};

// array with books data
let myLibrary = [];

const formWrapper = document.querySelector(".form-wrapper");  // div for form wrapping
const form = document.getElementById("add-book-form");  // the form with data
const submitButton = form.querySelector("input[type='submit']");  // button to add book to array
const bookList = document.getElementById("book-list");  // div container for book cards

submitButton.addEventListener("click", function (e) {
  e.preventDefault();

  var formData = new FormData(form);
  const newBook = new Book(formData.get("bookTitle"), formData.get("bookAuthor"), formData.get("bookPages"), formData.get("readChoise"));
  myLibrary.push(newBook);

  form.reset();  // clear form content
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));  // save data to local storage
  showBooks();
}, false);

// show all books on page
function showBooks() {
  const showedBooks = document.querySelectorAll(".bookCard");
  showedBooks.forEach(element => {
    bookList.removeChild(element);
  });

  for (book in myLibrary) {
    createBookCard(myLibrary[book]);
  }
}

function createBookCard(book) {
  const bookCard = document.createElement("div");
  const bookTitle = document.createElement("div");
  const bookAuthor = document.createElement("div");
  const bookPages = document.createElement("div");
  const bookIsRead = document.createElement("button");
  const removeButton = document.createElement("button");

  bookTitle.textContent = book.title;
  bookTitle.classList.add("textBold");

  bookAuthor.textContent = book.author;
  bookAuthor.classList.add("textRegular");

  bookPages.textContent = book.pages;
  bookPages.classList.add("textRegular");

  if (book.read) {
    bookIsRead.textContent = "Read";
  } else {
    bookIsRead.textContent = "Not read";
  }
  bookIsRead.addEventListener("click", () => {
    book.read = !book.read;
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));  // save data to local storage
    showBooks();
  });

  removeButton.textContent = "Delete";
  removeButton.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));  // save data to local storage
    showBooks();
  })

  bookCard.classList.add("bookCard");
  bookCard.appendChild(bookTitle);
  bookCard.appendChild(bookAuthor);
  bookCard.appendChild(bookPages);
  bookCard.appendChild(bookIsRead);
  bookCard.appendChild(removeButton);
  bookList.appendChild(bookCard);

  bookCard.setAttribute("data-id", myLibrary.indexOf(book));


};

function restoreData() {
  if (!localStorage.myLibrary) {
    showBooks();
  } else {
    var books = localStorage.getItem("myLibrary");
    books = JSON.parse(books);
    myLibrary = books;
    showBooks();
  };
};

restoreData();