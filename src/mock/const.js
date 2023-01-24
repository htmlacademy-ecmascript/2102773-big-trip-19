const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const SortType = {
  DAY: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const NEW_POINT = {
  basePrice: '',
  dateFrom: '',
  dateTo: '',
  destinations: {
    id: '',
    description: '',
    name: '',
    picture: [
      {
        src: '',
        description: '',
      },
    ]
  },
  isFavorite: false,
  offers: [
    {
      type: '',
      id: []
    },
  ],
  type: POINT_TYPES[1],
};

export { POINT_TYPES, FilterType, SortType, UserAction, UpdateType, NEW_POINT };
