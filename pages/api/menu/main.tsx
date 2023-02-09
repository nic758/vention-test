import mainFooter from './mainMenu.json';
import {NextApiResponse, NextApiRequest} from 'next';

export default function handler(req:NextApiRequest, res:NextApiResponse) {
    res.json(mainFooter);
  }