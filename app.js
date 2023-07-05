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
    const bookSection = document.querySelector("#library");
    bookSection.innerHTML = "";
    this.bookLibrary.forEach((n) => {
      const bookDiv = document.createElement('div');
      bookDiv.id = `${n.id}`;
      const title = document.createElement('p');
      title.innerHTML = `${n.title}`;
      const author = document.createElement('p');
      author.innerHTML = `${n.author}`;
      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'remove';
      bookSection.appendChild(bookDiv);
      removeBtn.addEventListener('click', this.remove(bookDiv.id));
    });
  }

  addBook() {
    const book = new BookObject(titleText.value, authorText.value);
    this.bookLibrary.push(book);
    localStorage.setItem('jsonLibrary', JSON.stringify(this.bookLibrary));
    this.insertHtml();
  }

  remove(id) {
    for (let i = 0; i < this.bookLibrary.length; i += 1) {
      if (this.bookLibrary[i].id === id) {
        this.bookLibrary.splice(i, 1);
      }
    }
    localStorage.setItem("jsonLibrary", JSON.stringify(this.bookLibrary));
    this.insertHtml();
  }
}

const bookList = new Book();
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
