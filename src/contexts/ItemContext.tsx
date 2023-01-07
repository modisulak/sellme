import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAllItems } from '../api/Api';
import { UserContext } from './UserContext';

export const ItemContext = createContext({} as ItemsContextProps);

export interface ItemProps {
  itemId: string;
  userId: string;
  itemTitle: string;
  itemDesc: string;
  itemLocation: string;
  itemPrice: string;
  itemPicture: string;
}

interface ItemsContextProps {
  items: ItemProps[];
  addItem: (newItem: ItemProps) => void;
}

interface Props {
  children?: React.ReactNode;
}

function ItemsProvider({ children }: Props) {
  const [items, setItems] = useState<ItemProps[]>([]);
  const { user } = useContext(UserContext);

  const fetchItems = async () => {
    const response = await getAllItems();
    // console.log(response);
    setItems(response);
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  const addItem = (newItem: ItemProps) => {
    setItems((prevItems) => [newItem, ...prevItems]);
  };

  const updateTasks = useEffect(() => {
    localStorage.setItem('itemSoldBy', JSON.stringify(items));
  }, [items]);

  return (
    <ItemContext.Provider value={{ items, addItem }}>
      {children}
    </ItemContext.Provider>
  );
}

export default ItemsProvider;
