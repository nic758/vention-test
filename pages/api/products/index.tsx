import {getProducts, intiDB, updateProduct} from '../../../lib/database/products';
import {NextApiResponse, NextApiRequest} from 'next';

export default async function  handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method == 'PUT'){
    const r = await intiDB();
    res.send(r);
    return;
  }
  if (req.method == 'GET'){
    const products = await getProducts();
    res.send(products);
    return;
  }

  if (req.method == 'PATCH'){
    const bodyjson = await JSON.parse(req.body);
    const resp = await updateProduct(bodyjson);
    res.json(resp);
    return;
  }

  res.status(400).send('');
}