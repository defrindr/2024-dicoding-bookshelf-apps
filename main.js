const bookApp = new BookShelfApp();
bookApp.initial("bookApp");

formAction("inputBook", "submit", () => {
  let title = getId("inputBookTitle").value;
  let author = getId("inputBookAuthor").value;
  let year = getId("inputBookYear").value;
  let isComplete = getId("inputBookIsComplete").checked;

  bookApp.insertBook(title, author, year, isComplete);
});

formAction("searchBook", "submit", () => {
  let keyword = getId("searchBookTitle").value;
  bookApp.search(keyword);
});
