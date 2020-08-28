const Database = require('../configs/firebase');

class DocumentIdPagination {
  constructor({ ref, docPath, perPage }) {
    this._ref = ref;
    this._docPath = docPath;
    this._perPage = perPage;

    this.build = async () => {
      this._dataRef = this._docPath
        ? await Database
            .doc(this._docPath)
            .get()
            .then(this._getRefWithDocOffset)
        : this._ref();

      this._docs = await this._getPaginatedData();

      this._firstVisibleDoc = this._getFirstVisibleDoc();
      this._lastVisibleDoc = this._getLastVisibleDoc();

      const [prevPageId, nextPageId] = await Promise.all([
        this._getPrevPageId(),
        this._getNextPageId(),
      ]);

      return {
        docs: this._docs,
        prevPageId,
        nextPageId,
      };
    };

    this._getRefWithDocOffset = (doc) => this._ref().startAt(doc);

    this._getPaginatedData = async () => {
      return await this._dataRef
        .limit(this._perPage)
        .get()
        .then((snapshot) => snapshot.docs);
    };

    this._getFirstVisibleDoc = () => {
      return this._docs.length ? this._docs[0] : null;
    };

    this._getLastVisibleDoc = () => {
      return this._docs.length ? this._docs[this._docs.length - 1] : null;
    };

    this._getPrevPageId = async () => {
      if (!this._firstVisibleDoc) return null;

      const prevPageDocs = await this._ref()
        .endBefore(this._firstVisibleDoc)
        .limitToLast(this._perPage)
        .get()
        .then((snapshot) => snapshot.docs);

      if (!prevPageDocs.length) return null;

      const prevPageId = prevPageDocs[0].id;
      const hasPrevPage = this._docs.length && prevPageId !== this._docs[0].id;
      return hasPrevPage ? prevPageId : null;
    };

    this._getNextPageId = async () => {
      if (!this._lastVisibleDoc) return null;

      const nextPageDocs = await this._ref()
        .startAfter(this._lastVisibleDoc)
        .limit(1)
        .get()
        .then((snapshot) => snapshot.docs);

      return nextPageDocs.length ? nextPageDocs[0].id : null;
    };
  }
}

module.exports = DocumentIdPagination;
