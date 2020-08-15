const allParams = require('./params');

const sanitize = {
  all: (req) => {
    let search = req.query.search || null;
    if (search) search = search.toString().toLowerCase().trim();

    const sortBy = req.query.sort || allParams.sort.name;
    const order = req.query.order || allParams.order.asc;

    let roles = req.query.role || [];
    if (roles && !Array.isArray(roles)) roles = roles.split(',');

    const perPage = parseInt(req.query.per_page) || 5;
    const page = req.query.page || null;

    return {
      search,
      sortBy,
      order,
      perPage,
      page,
      filters: {
        roles,
      },
    };
  },
};

module.exports = sanitize;
