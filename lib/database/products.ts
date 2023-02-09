import clientPromise from './mongodb';
import products from '../../pages/api/products/products.json';

export async function intiDB() {
  const client = await clientPromise;
  const collection = client.db('test').collection('products');
  
  return await collection.insertMany(products);
}

export async function getProducts(): Promise<any | null> {
  const client = await clientPromise;
  const cursor = await client.db('test').collection('products').find();

  return cursor.toArray();
}

export async function updateProduct({item_id, rating}:(any)){
  const client = await clientPromise;
  const collection = await client.db('test').collection('products');
  const updateDoc = {
    $set: {
      rating: rating
    },
  };
  
  return await collection.updateOne({item_id: +item_id}, updateDoc);
}