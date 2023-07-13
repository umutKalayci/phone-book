export interface Company {
  id: number;
  name: string;
  phoneNumber?: string | null;
  image?: string | null;
  address?: string | null;
  email?: string | null;
  webAddress?: string | null;
}
export const companies = [
  {
    id: 1,
    name: 'Company 1',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/logo',
  },
  {
    id: 2,
    name: 'Company 2',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/logog',
  },
  {
    id: 3,
    name: 'Company 3',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/logoc',
  },
  {
    id: 4,
    name: 'Company 4',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/logoa',
  },
  {
    id: 5,
    name: 'Company 5',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/randomlogo',
  },
  {
    id: 6,
    name: 'Company 6',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/logo6',
  },
  {
    id: 7,
    name: 'Company 7',
    phoneNumber: '05444444444',
    image: 'https://loremflickr.com/320/240/logo336',
  },
];
