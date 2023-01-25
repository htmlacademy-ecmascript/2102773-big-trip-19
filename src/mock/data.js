import {nanoid} from 'nanoid';
import { getRandomArrayElement, getRandomIntegerInclusive } from '../utils/common.js';
import { POINT_TYPES } from './const.js';

const mockOffersByType = [
  {
    type: getRandomArrayElement(POINT_TYPES),
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
    type: getRandomArrayElement(POINT_TYPES),
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
    type: getRandomArrayElement(POINT_TYPES),
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
    type: getRandomArrayElement(POINT_TYPES),
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
    type: getRandomArrayElement(POINT_TYPES),
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
    type: getRandomArrayElement(POINT_TYPES),
    id: ['1', '3']
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    id: ['2']
  },
  {
    type: getRandomArrayElement(POINT_TYPES),
    id: ['1', '2', '3']
  },
];

const mockDestinations = [
  {
    id: nanoid(),
    description: 'описание 1',
    name: 'Санкт-Петербург',
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
    id: nanoid(),
    description: 'описание 2',
    name: 'Псков',
    picture: [
      {
        src: 'http://picsum.photos/300/200?r=0.006',
        description: 'описание 6',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.007',
        description: 'описание 7',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.008',
        description: 'описание 8',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.009',
        description: 'описание 9',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0010',
        description: 'описание 10',
      }
    ]
  },
  {
    id: nanoid(),
    description: 'описание 3',
    name: 'Ярославль',
    picture: [
      {
        src: 'http://picsum.photos/300/200?r=0.0011',
        description: 'описание 11',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0012',
        description: 'описание 12',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0013',
        description: 'описание 13',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0014',
        description: 'описание 14',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0015',
        description: 'описание 15',
      }
    ]
  }
];

const mockPoints = [
  {
    basePrice: getRandomIntegerInclusive(10, 1000),
    dateFrom: new Date('2022-12-31T12:15:56'),
    dateTo: new Date('2022-12-31T14:25:56'),
    destinations: getRandomArrayElement(mockDestinations),
    isFavorite: false,
    offers: mockOffers,
    type: getRandomArrayElement(POINT_TYPES),
  },

  {
    basePrice: getRandomIntegerInclusive(10, 1000),
    dateFrom: new Date('2020-05-15T15:30:56'),
    dateTo: new Date('2020-05-20T16:30:56'),
    destinations: getRandomArrayElement(mockDestinations),
    isFavorite: false,
    offers: mockOffers,
    type: getRandomArrayElement(POINT_TYPES),
  },

  {
    basePrice: getRandomIntegerInclusive(10, 1000),
    dateFrom: new Date('2023-08-01T10:20:56'),
    dateTo: new Date('2023-08-10T11:30:56'),
    destinations: getRandomArrayElement(mockDestinations),
    isFavorite: true,
    offers: mockOffers,
    type: getRandomArrayElement(POINT_TYPES),
  },
];

function getRandomPoint() {
  return {
    id: nanoid(),
    ...getRandomArrayElement(mockPoints)
  };
}

export { getRandomPoint, mockOffersByType, mockDestinations };
