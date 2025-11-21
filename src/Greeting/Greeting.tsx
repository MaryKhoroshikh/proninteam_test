import { Dropdown } from '../Dropdown/Dropdown';
import ItemsList from '../ItemsList/ItemsList';
import styles from './Greeting.module.css';
import data from '../data.json';
import React, { useState } from 'react';

const Greeting: React.FC = () => {
  const [quote, setQuote] = useState<string>(data.quotes[0].itemMeaning);
  const [image, setImage] = useState<string>(data.images[0].itemMeaning);
  const [font, setFont] = useState<string>(data.fonts[0].itemMeaning);

  return (
    <>
      <h1 className={`${styles[font]} ${styles.title}`}>
        Тестируем работу компонента DropdownMenu
      </h1>
      <div className={styles.triggers}>
        <Dropdown
          trigger={<button>Время</button>}
          content={<ItemsList items={data.quotes} onItemClick={setQuote} />}
        />
        <Dropdown
          trigger={<button>Место</button>}
          content={<ItemsList items={data.images} onItemClick={setImage} />}
        />
        <Dropdown
          trigger={<button>Стиль</button>}
          content={<ItemsList items={data.fonts} onItemClick={setFont} />}
        />
      </div>
      <div className={styles.content}>
        <img className={styles.image} src={image} />
        <h2 className={`${styles[font]} ${styles.text} ${image === ''}`}>
          {quote}
        </h2>
      </div>
    </>
  );
};

export default Greeting;
