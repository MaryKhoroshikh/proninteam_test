import React, { useState } from 'react';
import styles from './App.module.css';
import data from '../data.json';
import { Dropdown } from '../Dropdown/Dropdown.tsx';
import ItemsList from '../ItemsList/ItemsList.tsx';

const App: React.FC = () => {
  const [quote, setQuote] = useState<string>(data.quotes[0].itemMeaning);
  const [image, setImage] = useState<string>(data.images[0].itemMeaning);
  const [font, setFont] = useState<string>(data.fonts[0].itemMeaning);
  const [isReverse, setIsReverse] = useState<boolean>(false);

  return (
    <>
      <div className={`${styles.app} ${isReverse ? styles.reverse : ''}`}>
        <h1 className={`${styles[font]} ${styles.title}`}>
          Тестируем работу компонента Dropdown
        </h1>
        <div className={styles.triggers}>
          <Dropdown
            trigger={<button>Время</button>}
            content={onCloseDropdown => (
              <ItemsList
                items={data.quotes}
                onItemClick={setQuote}
                onCloseDropdown={onCloseDropdown}
              />
            )}
          />
          <Dropdown
            trigger={<button>Место</button>}
            content={onCloseDropdown => (
              <ItemsList
                items={data.images}
                onItemClick={setImage}
                onCloseDropdown={onCloseDropdown}
              />
            )}
          />
          <Dropdown
            trigger={<button>Стиль</button>}
            content={onCloseDropdown => (
              <ItemsList
                items={data.fonts}
                onItemClick={setFont}
                onCloseDropdown={onCloseDropdown}
              />
            )}
          />
        </div>
        <div className={styles.content}>
          <img className={styles.image} src={image} />
          <h2 className={`${styles[font]} ${styles.text}`}>{quote}</h2>
        </div>
        <button
          className={styles.button}
          type='button'
          onClick={() => setIsReverse(!isReverse)}
        >
          Перевернуть
        </button>
      </div>
      <div className={styles.empty}></div>
    </>
  );
};

export default App;
