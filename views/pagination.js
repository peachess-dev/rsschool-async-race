export class PaginationView {
  #currentPage;
  pageSize;
  constructor(currentPage, pageSize) {
    this.#currentPage = currentPage;
    this.pageSize = pageSize;
  }

  previousPage() {
    if (this.#currentPage > 1) {
      this.#currentPage--;
    }
  }

  nextPage() {
    this.#currentPage++;
  }

  get currentPage() {
    return this.#currentPage;
  }
}
