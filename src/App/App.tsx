import React from 'react';
import styles from './App.module.css';
import Greeting from '../Greeting/Greeting';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Greeting />
      <Greeting />
      <Greeting />
      <Greeting />
    </div>
  );
};

export default App;