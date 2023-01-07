import axios from 'redaxios';
import { ItemContext, ItemProps } from '../contexts/ItemContext';

const BASE_URL = import.meta.env.VITE_API_ENDPOINT;
const DATA_URL = import.meta.env.VITE_API_ENDPOINT_DATA;

const config = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Required for CORS support to work
  },
};

export function createItem(item: ItemProps) {
  return axios.put(
    DATA_URL + '/items',
    {
      itemId: item.itemId,
      userId: item.userId,
      itemTitle: item.itemTitle,
      itemDesc: item.itemDesc,
      itemLocation: item.itemLocation,
      itemPrice: item.itemPrice,
      itemPicture: item.itemPicture,
    },
    config
  );
}

export async function getAllItems() {
  const response = await axios.get(DATA_URL + '/items', config);
  return response.data.Items;
}
