import React, { createContext, useState, useEffect } from 'react';

export const ItemContext = createContext({} as ItemsContextProps);

export interface ItemProps {
  itemId: string;
  userId: string;
  itemTitle: string;
  itemDesc: string;
  itemLocation: string;
  itemPrice: string;
  itemPicture: File;
}

interface ItemsContextProps {
  items: ItemProps[];
  addItem: (newItem: ItemProps) => void;
}

interface Props {
  children?: React.ReactNode;
}

function ItemsProvider({ children }: Props) {
  const initialItems = JSON.parse(localStorage.getItem('itemSoldBy') || '[]');
  const [items, setItems] = useState<ItemProps[]>(initialItems);

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
