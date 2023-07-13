import { Person, persons } from './persons';

export interface Call {
  id: number;
  caller: Person | number;
  callee: Person | number;
  date: Date;
  duration: string | number;
  title?: string | null;
  description?: string | null;
}
export const calls: Call[] = [
  {
    id: 1,
    caller: persons[0],
    callee: persons[1],
    date: new Date(),
    duration: '00:00:01',
  },
  {
    id: 2,
    caller: persons[2],
    callee: persons[0],
    date: new Date('07-09-2023 14:00:00'),
    duration: '00:00:01',
  },
  {
    id: 5,
    caller: persons[4],
    callee: persons[0],
    date: new Date('07-05-2023'),
    duration: '00:00:01',
  },
  {
    id: 3,
    caller: persons[1],
    callee: persons[0],
    date: new Date('07-04-2023'),
    duration: '00:00:01',
  },
  {
    id: 4,
    caller: persons[0],
    callee: persons[3],
    date: new Date('05-14-2023'),
    duration: '00:00:01',
  },
  {
    id: 6,
    caller: persons[0],
    callee: persons[3],
    date: new Date('05-14-2023'),
    duration: '00:00:01',
  },
  {
    id: 7,
    caller: persons[0],
    callee: persons[3],
    date: new Date('05-14-2023'),
    duration: '00:00:01',
  },
  {
    id: 8,
    caller: persons[0],
    callee: persons[3],
    date: new Date('05-14-2023'),
    duration: '00:00:01',
  },
  {
    id: 9,
    caller: persons[0],
    callee: persons[3],
    date: new Date('05-14-2023'),
    duration: '00:00:01',
  },
  {
    id: 10,
    caller: persons[0],
    callee: persons[3],
    date: new Date('05-14-2023'),
    duration: '00:00:01',
  },
];
