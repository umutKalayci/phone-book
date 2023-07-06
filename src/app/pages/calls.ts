import { Person, persons } from './persons';

export interface Call {
  id: String;
  caller: Person;
  callee: Person;
  date: Date;
  duration: Number;
}
export const calls: Call[] = [
  {
    id: '1',
    caller: persons[0],
    callee: persons[1],
    date: new Date(),
    duration: 100,
  },
  {
    id: '2',
    caller: persons[2],
    callee: persons[0],
    date: new Date('07-05-2023'),
    duration: 0,
  },
  {
    id: '5',
    caller: persons[4],
    callee: persons[0],
    date: new Date('07-05-2023'),
    duration: 100,
  },
  {
    id: '3',
    caller: persons[1],
    callee: persons[0],
    date: new Date('07-04-2023'),
    duration: 100,
  },
  {
    id: '4',
    caller: persons[0],
    callee: persons[3],
    date: new Date('05-14-2023'),
    duration: 0,
  },
];
