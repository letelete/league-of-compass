const Yup = require('yup');
const Champion = require('../../models/database/champion');
const UserRating = require('../../models/database/rating/user_rating');
const ArrayIndexPagination = require('../../helpers/paginations/array_index_paginations');
const { Database } = require('../../configs/firebase');
const { BadRequestError } = require('../../errors/4xx');
const { createError } = require('../../errors/http_error');
const { getProperty } = require('../../helpers/object');

require('../../helpers/yup/cast_and_validate/sync');

const params = {
  types: {
    all: 'all',
    rated: 'rated',
    unrated: 'unrated',
  },
  sorts: {
    asc: 'asc',
    desc: 'desc',
  },
  orders: {
    name: 'name',
    role: 'role.main',
    'role.main': 'role.main',
  },
};

const reqSchema = Yup.object().shape({
  query: Yup.object().shape({
    type: Yup.string()
      .trim()
      .lowercase()
      .oneOf(Object.keys(params.types))
      .default(params.types.all),
    search: Yup.string().nullable().trim().lowercase().default(null),
    per_page: Yup.number().integer().min(1).max(50).default(5),
    page: Yup.number().min(0).default(0),
    sort: Yup.string()
      .oneOf(Object.keys(params.sorts))
      .default(params.sorts.asc),
    order_by: Yup.string()
      .oneOf(Object.keys(params.orders))
      .default(params.orders.name)
      .transform((key) => params.orders[key]),
  }),
});

const getAllChampions = async (req, res) => {
  const { id: userId } = res.locals.userPayload;
  req = { ...req, ...reqSchema.castAndValidateSync(req) };

  const [userRatings, champions] = await Promise.all([
    UserRating.doc(userId).getAllRatings(),
    Champion.getAllChampions({ searchName: req.query.search }),
  ]);

  const allChampions = mergeChampionsWithUserRatings(champions, userRatings);
  const selectedChampions = getChampionsByType(allChampions, req.query.type);
  selectedChampions.sort((first, second) => {
    const propertyPath = `champion.${req.query.order_by}`;
    const orderBehavior = req.query.sort === params.sorts.asc ? -1 : 1;
    return getProperty(first, propertyPath) <= getProperty(second, propertyPath)
      ? orderBehavior
      : orderBehavior * -1;
  });

  const pagination = new ArrayIndexPagination({
    array: selectedChampions,
    page: req.query.page,
    perPage: req.query.per_page,
  });
  const response = normalizeResponseData(pagination.build());

  res.status(200).send(response);
};

const mergeChampionsWithUserRatings = (champions, userRatings) =>
  champions.map((champion) => {
    const isChampionRated = userRatings.hasOwnProperty(champion.id);
    return {
      champion,
      ratings: isChampionRated ? userRatings[champion.id].ratings : null,
    };
  });

const getChampionsByType = (allChampions, type) => {
  switch (type) {
    case params.types.unrated:
      return getUnratedChampions(allChampions);
    case params.types.rated:
      return getRatedChampions(allChampions);
  }
  return allChampions;
};

const getUnratedChampions = (allChampions) =>
  allChampions.filter((data) => !data.ratings);

const getRatedChampions = (allChampions) =>
  allChampions.filter((data) => data.ratings);

const normalizeResponseData = (response) => ({
  ...response,
  data: response.data.map((data) => ({
    ...data,
    champion: Champion.format.to.response(data.champion),
  })),
});

module.exports = getAllChampions;
