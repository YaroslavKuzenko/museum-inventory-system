import {EmployeeModel} from "../models/employee.interface";

export const mockEmployees: EmployeeModel[] = [
  {
    name: 'Mykola Korop',
    position: 'CEO',
    text: 'he Chief Executive Officer, responsible for overall management of the company.',
    image: 'images/avatars/mykola.jpg'
  },
  {
    name: 'Bohdan Nazmeev',
    position: 'Developer',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
    image: 'images/avatars/bohdan.jpg'
  },
  {
    name: 'Yaroslav Kuzenko',
    position: 'Front-End Developer',
    text: ' A user interface developer, specializing in the client-side of applications.',
    image: 'images/avatars/yaroslav.jpg'
  },
]
