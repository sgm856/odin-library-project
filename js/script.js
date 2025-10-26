const books = new Map();
const container = document.querySelector('.book-container'
);
const addButton = document.querySelector('.add');
const dialog = document.querySelector('dialog');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const numPagesInput = document.querySelector('#numPages');
const readInput = document.querySelector('#read');
const submitButton = document.querySelector('[type="submit"]');
const cancelButton = document.querySelector('#cancel');
const form = document.querySelector('form');

const readSymbol = '✓';
const unreadSymbol = '✗'

class Book {
    constructor(title, author, numPages, read, id) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.id = id;
        this.read = read;
    }
}

function toggleRead(book) {
    let bookNode = document.getElementById(`${book.id}`);
    let bookReadStatus = bookNode.querySelector('.read-status');
    if (Boolean(book.read)) {
        book.read = false;
        bookReadStatus.textContent = `Read: ${unreadSymbol}`;
    } else {
        book.read = true;
        bookReadStatus.textContent = `Read: ${readSymbol}`;
    }
}

function displayBook(newBook) {
    const bookCard = document.createElement('div');
    bookCard.classList.add('book-card');
    const title = document.createElement('h3');
    title.textContent = `Title: ${newBook.title}`;
    const author = document.createElement('p');
    author.textContent = `By: ${newBook.author}`;
    const numPages = document.createElement('span');
    numPages.textContent = `Pages: ${newBook.numPages}`;
    const read = document.createElement('span');
    read.classList.add('read-status');
    let readStatus;
    if (newBook.read) {
        readStatus = readSymbol;
    } else {
        readStatus = unreadSymbol;
    }
    read.textContent = `Read: ${readStatus}`;

    let cardButtonContainer = document.createElement('div');
    cardButtonContainer.classList.add('card-button-container');

    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    cardButtonContainer.appendChild(removeButton);

    let readToggle = document.createElement('button');
    readToggle.textContent = 'Read';
    cardButtonContainer.appendChild(readToggle);

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(numPages);
    bookCard.appendChild(read);
    bookCard.setAttribute('id', newBook.id);
    bookCard.appendChild(cardButtonContainer);
    container.appendChild(bookCard);

    removeButton.addEventListener('click', () => container.removeChild(bookCard));
    readToggle.addEventListener('click', () => toggleRead(newBook));
}

function addBookToLibrary(title, author, numPages, read) {
    const bookID = crypto.randomUUID();
    const newBook = new Book(title, author, numPages, read, bookID);
    books.set(bookID, newBook);
    displayBook(newBook);
}

function displayAddBookForm() {
    dialog.showModal();
}

function formValid() {
    return form.checkValidity();
}

submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (titleInput.value.trim().length !== 0) {
        let authorName = authorInput.value;
        if (authorName === '') {
            authorName = 'Unknown';
        }
        addBookToLibrary(titleInput.value, authorName, parseInt(numPagesInput.value), readInput.checked);
        dialog.close();
    } else {
        titleInput.setCustomValidity('A title is required!');
        form.reportValidity();
        titleInput.focus();
    }
});

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    displayAddBookForm();
});

cancelButton.addEventListener('click', (e) => {
    dialog.close();
});

titleInput.addEventListener("input", (e) => {
    if (!titleInput.validity.valueMissing) {
        titleInput.setCustomValidity("");
    } else {
        titleInput.setCustomValidity('A title is required!');
        form.reportValidity();
    }
});

