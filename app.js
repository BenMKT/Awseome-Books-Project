const bookSection = document.querySelector('#library');
const titleText = document.querySelector('#title');
const authorText = document.querySelector('#author');
const form = document.querySelector('form');
const listbtn = document.querySelector('#listbtn');
const addlistbtn = document.querySelector('#addlistbtn');
const contactbtn = document.querySelector('#contactbtn');
const list = document.getElementById('list');
const newbooks = document.getElementById('newbooks');
const contact = document.getElementById('contact');
const date = document.getElementById('date');

class Book {
  constructor() {
    this.bookLibrary = JSON.parse(localStorage.getItem('jsonLibrary')) || [];
  }

  insertHtml() {
    bookSection.innerHTML = '';
    this.bookLibrary.forEach((n) => {
      bookSection.innerHTML += `<div class='book'>
        <div class='bookDetail'>
          <p>"${n.title}"</p>
          <p>by</p>
          <p>${n.author}</p>
        </div>    
          <button class='remove' type='button' onclick='bookList.remove("${n.id}")'>Remove</button>
      </div>`;
    });
  }

  addBook() {
    const bookObject = {};
    bookObject.title = titleText.value;
    bookObject.author = authorText.value;
    bookObject.id = (titleText.value + authorText.value).replace(/\s/g, '');
    this.bookLibrary.push(bookObject);
    localStorage.setItem('jsonLibrary', JSON.stringify(this.bookLibrary));
    this.insertHtml();
  }

  remove(idParameter) {
    this.bookLibrary = this.bookLibrary.filter((book) => book.id !== idParameter);
    localStorage.setItem('jsonLibrary', JSON.stringify(this.bookLibrary));
    this.insertHtml();
  }
}

const bookList = new Book();

form.addEventListener('submit', (event) => {
  event.preventDefault();
  bookList.addBook();
  form.reset();
});

window.addEventListener('load', () => {
  if (localStorage.getItem('jsonLibrary')) {
    bookList.insertHtml();
  }
});

listbtn.onclick = () => {
  list.style.display = 'block';
  newbooks.style.display = 'none';
  contact.style.display = 'none';
};

addlistbtn.onclick = () => {
  list.style.display = 'none';
  newbooks.style.display = 'block';
  contact.style.display = 'none';
};

contactbtn.onclick = () => {
  list.style.display = 'none';
  newbooks.style.display = 'none';
  contact.style.display = 'block';
};

setInterval(clock, 1000);

function clock() {
  let d = new Date();
  date.innerHTML = 'Date: ' + d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear() + ' Time: ' +
    d.getHours() + ":" +
    d.getMinutes() + ":" +
    d.getSeconds();
};