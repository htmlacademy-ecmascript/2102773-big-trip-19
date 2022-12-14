import { getRandomArrayElement, getRandomIntegerInclusive } from './utils.js';
import { POINT_TYPE } from './const.js';

const mockOffersByType = [
  {
    type: getRandomArrayElement(POINT_TYPE),
    offers: [
      {
        id: '1',
        title: 'предложение 1',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '2',
        title: 'предложение 2',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '3',
        title: 'предложение 3',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '4',
        title: 'предложение 4',
        price: getRandomIntegerInclusive(10, 1000),
      },
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPE),
    offers: [
      {
        id: '1',
        title: 'предложение 5',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '2',
        title: 'предложение 6',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '3',
        title: 'предложение 7',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '4',
        title: 'предложение 8',
        price: getRandomIntegerInclusive(10, 1000),
      },
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPE),
    offers: [
      {
        id: '1',
        title: 'предложение 9',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '2',
        title: 'предложение 10',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '3',
        title: 'предложение 11',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '4',
        title: 'предложение 12',
        price: getRandomIntegerInclusive(10, 1000),
      },
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPE),
    offers: [
      {
        id: '1',
        title: 'предложение 13',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '2',
        title: 'предложение 14',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '3',
        title: 'предложение 15',
        price: getRandomIntegerInclusive(10, 1000),
      },
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPE),
    offers: [
      {
        id: '1',
        title: 'предложение 16',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '2',
        title: 'предложение 17',
        price: getRandomIntegerInclusive(10, 1000),
      },
    ]
  },
];

const mockOffers = [
  {
    type: getRandomArrayElement(POINT_TYPE),
    offers: [
      {
        id: '1',
        title: 'предложение 1',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '2',
        title: 'предложение 2',
        price: getRandomIntegerInclusive(10, 1000),
      },
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPE),
    offers: [
      {
        id: '1',
        title: 'предложение 5',
        price: getRandomIntegerInclusive(10, 1000),
      },
    ]
  },
  {
    type: getRandomArrayElement(POINT_TYPE),
    offers: [
      {
        id: '1',
        title: 'предложение 9',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '2',
        title: 'предложение 10',
        price: getRandomIntegerInclusive(10, 1000),
      },
      {
        id: '3',
        title: 'предложение 11',
        price: getRandomIntegerInclusive(10, 1000),
      },
    ]
  },
];

const mockDestinations = [
  {
    id: '1',
    description: 'описание 1',
    name: 'Москва',
    picture: [
      {
        src: 'http://picsum.photos/300/200?r=0.001',
        description: 'описание 1',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.002',
        description: 'описание 2',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.003',
        description: 'описание 3',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.004',
        description: 'описание 4',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.005',
        description: 'описание 5',
      }
    ]
  },
  {
    id: '2',
    description: 'описание 2',
    name: 'Псков',
    picture: [
      {
        src: 'http://picsum.photos/300/200?r=0.001',
        description: 'описание 1',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.002',
        description: 'описание 2',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.003',
        description: 'описание 3',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.004',
        description: 'описание 4',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.005',
        description: 'описание 5',
      }
    ]
  },
  {
    id: '3',
    description: 'описание 3',
    name: 'Ярославль',
    picture: [
      {
        src: 'http://picsum.photos/300/200?r=0.001',
        description: 'описание 1',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.002',
        description: 'описание 2',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.003',
        description: 'описание 3',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.004',
        description: 'описание 4',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.005',
        description: 'описание 5',
      }
    ]
  }
];

const mockPoints = [
  {
    basePrice: getRandomIntegerInclusive(10, 1000),
    dateFrom: new Date('2019-07-10T12:15:56'),
    dateTo: new Date('2019-07-11T14:25:56'),
    destinations: mockDestinations,
    id: '1',
    isFavorite: false,
    offers: mockOffers,
    type: getRandomArrayElement(POINT_TYPE),
  },

  {
    basePrice: getRandomIntegerInclusive(10, 1000),
    dateFrom: new Date('2020-05-15T15:30:56'),
    dateTo: new Date('2020-05-20T16:30:56'),
    destinations: mockDestinations,
    id: '2',
    isFavorite: false,
    offers: mockOffers,
    type: getRandomArrayElement(POINT_TYPE),
  },

  {
    basePrice: getRandomIntegerInclusive(10, 1000),
    dateFrom: new Date('2021-08-01T10:20:56'),
    dateTo: new Date('2021-08-10T11:30:56'),
    destinations: mockDestinations,
    id: '3',
    isFavorite: true,
    offers: mockOffers,
    type: getRandomArrayElement(POINT_TYPE),
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockPoints);
}

export { getRandomPoint, mockOffersByType };
