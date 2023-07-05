
class BookObject {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = (title + author).replace(/\s/g, '');
  }
}

class Book {
  constructor() {
    this.bookLibrary = JSON.parse(localStorage.getItem("jsonLibrary")) || [];
  }

  insertHtml() {
    bookSection.innerHTML = ''
    this.bookLibrary.forEach((n) => {
      bookSection.innerHTML += `<div class='book'>
        <div class='bookDetail'>
          <p>${n.title}</p>
          <p>${n.author}</p>
        </div>    
          <button class='remove' type='button' onclick='bookList.remove("${n.id}")'>Remove</button>
      </div>`;
    });
  }

  addBook() {
    const book = new BookObject(titleText.value, authorText.value);
    this.bookLibrary.push(book);
    localStorage.setItem('jsonLibrary', JSON.stringify(this.bookLibrary));
    this.insertHtml();
  }

  remove(idParameter) {
    this.bookLibrary = this.bookLibrary.filter(book => book.id !== idParameter)
    localStorage.setItem("jsonLibrary", JSON.stringify(this.bookLibrary));
    this.insertHtml();
  }
}

const bookList = new Book();
const bookSection = document.querySelector("#library");
const titleText = document.querySelector("#title");
const authorText = document.querySelector("#author");
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  bookList.addBook();
  form.reset();
});

window.addEventListener("load", () => {
  if (localStorage.getItem("jsonLibrary")) {
    bookList.insertHtml();
  }
});
