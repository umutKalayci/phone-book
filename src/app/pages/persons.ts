import { Company, companies } from './companies';

export interface Person {
  id: number;
  name: string;
  phoneNumber: string;
  image?: string | null;
  companies?: Number[];
  email?: string | null;
}
export const persons = [
  {
    id: 6,
    name: 'Person 1',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/passport',
    companies: [companies[0].id, companies[2].id],
  },
  {
    id: 2,
    name: 'Person 2',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/dog',
    companies: [],
  },
  {
    id: 3,
    name: 'Person 3',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/cat',
    companies: [],
  },
  {
    id: 4,
    name: 'Person 4',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/person',
    companies: [],
  },
  {
    id: 5,
    name: 'Person 5',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/animal',
    companies: [],
  },
  {
    id: 6,
    name: 'Person 6',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/passportphoto5',
    companies: [],
  },
  {
    id: 7,
    name: 'Person 7',
    phoneNumber: '05444444444',
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    companies: [],
  },
  {
    id: 8,
    name: 'Person 8',
    phoneNumber: '05444444444',
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    companies: [],
  },
  {
    id: 9,
    name: 'Person 9',
    phoneNumber: '05444444444',
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    companies: [],
  },
  {
    id: 10,
    name: 'Person 10',
    phoneNumber: '05444444444',
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    companies: [],
  },
  {
    id: 11,
    name: 'Person 11',
    phoneNumber: '05444444444',
    image: 'https://material.angular.io/assets/img/examples/shiba2.jpg',
    companies: [],
  },
];
