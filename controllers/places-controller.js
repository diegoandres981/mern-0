const HttpError = require("../models/http-error");

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State",
    description: "Cucamonga",
    location: 1,
    address: 1,
    creator: "u1",
  },
];

const getPlaceById = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  if (!place) throw new HttpError("Could not find place for provided id", 404);

  res.json({ place });
};

const getPlaceByUserId = (req, res, next) => {
  const userId = req.params.userId;
  const place = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });

  if (!place)
    return next(new Error("Could not find place for provided user id", 404));

  res.json({ place });
};

const createPlace = (req, res, next) => {
  const { title, description, location, address, creator } = req.body;
  const createdPlace = {
    title,
    description,
    location,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createPlace });
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
