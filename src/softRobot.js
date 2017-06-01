import React from 'react';
import ItemList from './components/itemList';

const styles = {
  wrapper: {
    width: '70%',
    margin: '8% auto',
  },
};

class NewTask extends React.Component {
  render() {
    return (
      <div style={styles.wrapper}>
        <ItemList />
      </div>
    )
  }
};

export default NewTask;
