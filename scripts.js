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

function addBookToLibrary(title, author, numPages, read) {
  const newBook = new Book(title, author, numPages, read);
  myLibrary.push(newBook);
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
  statusCell.append(statusBtn);

  const delCell = newRow.insertCell();
  delCell.classList.add("book-delete");
  const delBtn = document.createElement("button");
  delBtn.classList.add("del-btn");
  delBtn.setAttribute("data-id", bookObj.id);
  delBtn.textContent = "Delete";
  delCell.append(delBtn);
}

function populateDisplay() {
  myLibrary.forEach((book) => {
    addBookToTable(book);
  });
}

populateDisplay();
