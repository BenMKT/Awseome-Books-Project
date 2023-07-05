const insertHtml = () => {
  const bookSection = document.querySelector("#library");
  bookSection.innerHTML = "";

  let bookLibrary = JSON.parse(localStorage.getItem("jsonLibrary"));
  bookLibrary.forEach((n) => {
    bookSection.innerHTML += `<div id='${n.id}'>
        <p>${n.title}</p>
        <p>${n.author}</p>
        <button class='remove' type='button'>Remove</button>
        <hr>
    </div>`;
  });
}

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = (title + author).replace(/\s/g, '');
  }

  addBook() {
    let bookLibrary = [];
    if (localStorage.getItem("jsonLibrary")) {
      bookLibrary = JSON.parse(localStorage.getItem("jsonLibrary"));
    }

    bookLibrary.push(this);
    localStorage.setItem("jsonLibrary", JSON.stringify(bookLibrary));
    insertHtml();
  }

  remove() {
    let bookLibrary = [];
    if (localStorage.getItem("jsonLibrary")) {
      bookLibrary = JSON.parse(localStorage.getItem("jsonLibrary"));
    }
    for (let i = 0; i < bookLibrary.length; i += 1) {
      if (
        bookLibrary[i].id === this.id
      ) {
        bookLibrary.splice(i, 1);
      }
    }
    localStorage.setItem("jsonLibrary", JSON.stringify(bookLibrary));
    insertHtml();
  }
}

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleText = document.querySelector("#title");
  const authorText = document.querySelector("#author");

  const book = new Book(titleText.value, authorText.value);
  book.addBook();
  form.reset();
});

window.addEventListener("load", () => {
  if (localStorage.getItem("jsonLibrary")) {
    insertHtml();
  }
});
