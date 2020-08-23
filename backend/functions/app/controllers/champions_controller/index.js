const champions = require('../../models/database/champions');
const { BadRequestError } = require('../../errors/4xx');
const { createError } = require('../../errors/http_error');
const validate = require('./validation');
const sanitize = require('./sanitization');
const database = require('../../configs/firebase');
const DocumentIdPagination = require('../../helpers/firebase_pagination');

const getAll = async (req, res) => {
  validate.all(req);
  const { search, sortBy, order, filters, perPage, page } = sanitize.all(req);

  const ref = () => {
    let base = database.collection('champions');
    if (search) {
      base = base.where('prefixes.name', 'array-contains', search);
    }
    filters.roles.forEach(
      (role) => (base = base.where(`role.all.${role}`, '==', true))
    );
    return base.orderBy(sortBy, order);
  };

  const docPath = page ? `champions/${page}` : null;
  const pagination = new DocumentIdPagination({ ref, docPath, perPage });
  const { docs, prevPageId, nextPageId } = await pagination.build();

  const championsData = docs.map((docs) => {
    const data = docs.data();
    return champions.normalizeForResponse(data);
  });

  res.status(200).send({
    page: {
      prev: prevPageId,
      next: nextPageId,
    },
    length: championsData.length,
    data: championsData,
  });
};

module.exports = {
  getAll,
};
