function Book(title, author) {
    this.title = title;
    this.author = author;
  }

let bookKLibrary = [];

function addBook () {
    const titleText = document.querySelector('#title');
    const authorText = document.querySelector('#author');
    const book = new Book(titleText.value,authorText.value);
    bookKLibrary.push(book);
    console.log(bookKLibrary);
}

const form = document.querySelector('form');
form.addEventListener('submit',(event)=>{
    event.preventDefault();
    form.reset()
})