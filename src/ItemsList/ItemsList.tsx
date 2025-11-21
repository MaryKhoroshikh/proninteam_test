import React from 'react';
import styles from './ItemsList.module.css';

type TMenuItem = {
  itemTitle: string;
  itemMeaning: string;
};

interface ItemsListProps {
  items: TMenuItem[];
  onItemClick: (item: string) => void;
  onCloseDropdown?: () => void;
}

const ItemsList: React.FC<ItemsListProps> = ({
  items,
  onItemClick,
  onCloseDropdown,
}) => {
  return (
    <ul className={styles.list}>
      {items.length > 0 ? (
        items.map((item: TMenuItem, index: number) => (
          <li
            key={`${item.itemTitle}-${index}`}
            className={styles.item}
            onClick={() => {
              onItemClick(item.itemMeaning);
              if (onCloseDropdown) {
                onCloseDropdown();
              }
            }}
            role='button'
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                onItemClick(item.itemMeaning);
                if (onCloseDropdown) {
                  onCloseDropdown();
                }
              }
            }}
          >
            {item.itemTitle}
          </li>
        ))
      ) : (
        <li className={styles.empty}>Нет элементов</li>
      )}
    </ul>
  );
};

export default ItemsList;
