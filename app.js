function Book(title, author) {
  this.title = title;
  this.author = author;
}

let bookKLibrary = [];

// eslint-disable-next-line
function bookHTML() {
  const bookSection = document.querySelector('#library');
  bookSection.innerHTML = '';
  bookKLibrary.forEach((n) => {
    bookSection.innerHTML
    += `<div>
    <p>${n.title}</p>
    <p>${n.author}</p>
    <button type='button' onclick='remove("${n.title}","${n.author}")'>Remove</button>
    <hr>
  </div>`;
  });
}
// eslint-disable-next-line
function addBook() {
  const titleText = document.querySelector('#title');
  const authorText = document.querySelector('#author');
  const book = new Book(titleText.value, authorText.value);
  bookKLibrary.push(book);
  localStorage.setItem('jsonLibrary', JSON.stringify(bookKLibrary));
  bookHTML();
}
// eslint-disable-next-line
function remove(title, author) {;
  for (let i = 0; i < bookKLibrary.length; i + 1) {
    if (bookKLibrary[i].title === title && bookKLibrary[i].author === author) {
      bookKLibrary.splice(i, 1);
    }
  }
  localStorage.setItem('jsonLibrary', JSON.stringify(bookKLibrary));
  bookHTML();
}

const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  form.reset();
});

window.addEventListener('load', () => {
  if (localStorage.getItem('jsonLibrary')) {
    bookKLibrary = JSON.parse(localStorage.getItem('jsonLibrary'));
    bookHTML();
  }
});
