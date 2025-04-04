const myLibrary = [];

function Book(title, author, numPages, read) {
  if (!new.target) {
    throw Error("Didn't use new keyword to make Book obj");
  }

  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.numPages = numPages;
  this.read = read;
}

Book.prototype.toggleRead = function () {
  this.read = this.read === "read" ? "unread" : "read";
};

function addBookToLibrary(title, author, numPages, read) {
  const newBook = new Book(title, author, numPages, read);
  myLibrary.push(newBook);
  return newBook;
}

function getBookIndex(bookId) {
  const bookIndex = myLibrary.findIndex((libBook) => {
    return bookId == libBook.id;
  });
  return bookIndex;
}

addBookToLibrary("My Best Book", "Karen Karen", 83, "read");
addBookToLibrary("Second Best", "Peter Peter", 109, "unread");

const tbodyEl = document.querySelector("tbody");

function addBookToTable(bookObj) {
  const newRow = tbodyEl.insertRow();
  newRow.classList.add("book-row");
  newRow.setAttribute("data-id", bookObj.id);

  const titleCell = newRow.insertCell();
  titleCell.classList.add("book-title");
  titleCell.textContent = bookObj.title;

  const authorCell = newRow.insertCell();
  authorCell.classList.add("book-author");
  authorCell.textContent = bookObj.author;

  const pagesCell = newRow.insertCell();
  pagesCell.classList.add("book-pages");
  pagesCell.textContent = bookObj.numPages;

  const statusCell = newRow.insertCell();
  statusCell.classList.add("book-status");
  const statusBtn = document.createElement("button");
  statusBtn.classList.add("status-btn", `${bookObj.read}`);
  statusBtn.setAttribute("data-id", bookObj.id);
  statusBtn.textContent = bookObj.read == "read" ? "Read" : "Unread";
  statusBtn.addEventListener("click", handleToggleStatus);
  statusCell.append(statusBtn);

  const delCell = newRow.insertCell();
  delCell.classList.add("book-delete");
  const delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.setAttribute("data-id", bookObj.id);
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", handleDelete);
  delCell.append(delBtn);
}

function populateDisplay() {
  myLibrary.forEach((book) => {
    addBookToTable(book);
  });
}

function updateDisplay(action, bookId) {
  if (action === "delete") {
    const trDel = tbodyEl.querySelector(`tr[data-id='${bookId}']`);
    trDel.remove();
  }
}

function handleToggleStatus(e) {
  const bookId = e.target.dataset.id;
  const book = myLibrary[getBookIndex(bookId)];
  e.target.classList.remove(book.read);
  book.toggleRead();
  e.target.classList.add(book.read);
  e.target.textContent = book.read == "read" ? "Read" : "Unread";
}

function handleDelete(e) {
  const bookId = e.target.dataset.id;
  const bookIndex = getBookIndex(bookId);
  myLibrary.splice(bookIndex, 1);
  updateDisplay("delete", bookId);
}

function handleAddBook(e) {
  e.preventDefault();
  const newTitle = document.querySelector("#title").value;
  const newAuthor = document.querySelector("#author").value;
  const newPages = document.querySelector("#page-count").value;
  const radioButtons = document.querySelectorAll('input[name="status"]');
  let status = "";
  radioButtons.forEach((radio) => {
    if (radio.checked) {
      status = radio.value;
    }
  });
  const newBook = addBookToLibrary(newTitle, newAuthor, newPages, status);
  addBookToTable(newBook);
  document.querySelector("#add-book-form").reset();
  const dialog = document.querySelector("dialog");
  dialog.close();
}

// Event Listeners Dialog
const addBookBtn = document.querySelector("#add-book-btn");
addBookBtn.addEventListener("click", (e) => {
  const dialog = document.querySelector("dialog");
  dialog.showModal();
});
const cancelDialogBtn = document.querySelector("#cancel-btn");
cancelDialogBtn.addEventListener("click", (e) => {
  document.querySelector("#add-book-form").reset();
  const dialog = document.querySelector("dialog");
  dialog.close();
});

const addDialogBtn = document.querySelector("#add-btn");
addDialogBtn.addEventListener("click", handleAddBook);

populateDisplay();
