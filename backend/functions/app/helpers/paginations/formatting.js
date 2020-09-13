const paginationResponse = ({ prevPage, nextPage, data }) => ({
  page: {
    prev: prevPage,
    next: nextPage,
  },
  length: data.length,
  data,
});

module.exports = { paginationResponse };
