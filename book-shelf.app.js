class BookShelfApp {
  books = [];
  _storageName = "bookshelfapp";
  inCompleteContainer;
  completeContainer;
  instanceName = "";
  lang = {
    delete: "Yakin ingin menghapus data ini ? ",
    inComplete: "Belum selesai di Baca",
    complete: "Selesai baca",
  };

  initial(
    instanceName,
    inCompleteContainer = "incompleteBookshelfList",
    completeContainer = "completeBookshelfList"
  ) {
    this.inCompleteContainer = document.getElementById(inCompleteContainer);
    this.completeContainer = document.getElementById(completeContainer);

    this.instanceName = instanceName;
    this.books = this._loadFromStorage();
    this._loadList(this.books);
  }

  search(keyword) {
    let books = [];

    if (keyword) {
      keyword = keyword.toLowerCase();
      books = this.books.filter((book) => {
        let bookTitle = book.title.toLowerCase();
        return bookTitle.includes(keyword);
      });
    } else books = this.books;

    this._loadList(books);
  }

  _loadList(books) {
    // Clear Container Before Add New Data To View
    this.inCompleteContainer.innerHTML = "";
    this.completeContainer.innerHTML = "";

    books.forEach((book) => {
      let container = book.isComplete
        ? this.completeContainer
        : this.inCompleteContainer;

      // the label is reversed from the actual status
      let label = book.isComplete ? this.lang.inComplete : this.lang.complete;

      container.innerHTML += `
          <article class="book_item">
          <h3>${book.title}</h3>
          <p>Penulis: ${book.author}</p>
          <p>Tahun: ${book.year}</p>

          <div class="action">
            <button class="green" onclick="${this.instanceName}.changeStatus(${book.id})">${label}</button>
            <button class="red" onclick="${this.instanceName}.removeBook(${book.id})">Hapus buku</button>
          </div>
        </article>`;
    });
  }

  insertBook(title, author, year, isComplete) {
    let payload = {
      title,
      author,
      year,
      isComplete,
      id: Date.now(),
    };

    // insert to list
    this.books.push(payload);

    // Sync with storage
    this._persistStorage();
    this._loadList(this.books);
  }

  removeBook(bookId) {
    if (!confirm(this.lang.delete)) return;

    this.books = this.books.filter((book) => {
      return book.id != bookId;
    });

    this._persistStorage();
    this._loadList(this.books);
  }

  changeStatus(bookId) {
    this.books = this.books.map((book) => {
      // Update status
      if (book.id == bookId) {
        book.isComplete = !book.isComplete;
      }

      return book;
    });

    // Sync with storage
    this._persistStorage();
    this._loadList(this.books);
  }

  _persistStorage() {
    localStorage.setItem(this._storageName, JSON.stringify(this.books));
  }

  _loadFromStorage() {
    let objString = localStorage.getItem(this._storageName);
    if (objString == "" || objString == null) return [];
    else return JSON.parse(objString);
  }
}
