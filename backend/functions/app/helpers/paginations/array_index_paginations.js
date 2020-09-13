const { paginationResponse } = require('./formatting');

class ArrayIndexPagination {
  constructor({ array, page, perPage }) {
    this._array = array;
    this._page = page;
    this._perPage = perPage;
    this._offset = this._perPage * this._page;

    this.build = () => {
      const prevPage = this._getPrevPage();
      const nextPage = this._getNextPage();
      const data = this._paginateArray();
      return paginationResponse({ prevPage, nextPage, data });
    };

    this._getPrevPage = () => {
      if (!this._offset) return null;
      return this._offset >= this._perPage ? this._page - 1 : 0;
    };

    this._getNextPage = () =>
      this._offset + this._perPage >= this._array.length
        ? null
        : this._page + 1;

    this._paginateArray = () => {
      const startAtInclusive = this._offset;
      const endAtExclusive = this._offset + this._perPage;
      return this._array.slice(startAtInclusive, endAtExclusive);
    };
  }
}

module.exports = ArrayIndexPagination;
