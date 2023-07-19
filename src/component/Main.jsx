import React, { useState } from 'react';
import Header from './Header';
import Search from './Search';
import List from './List';

function Main() {
  const [showList, setShowList] = useState(true);
  // 검색 결과가 있으면 list컴포넌트가 없어짐

  const handleSearchResult = (hasResults) => {
    setShowList(!hasResults);
  };

  return (
    <div>
      <Header />
      <Search onSearchResult={handleSearchResult} />
      {showList && <List />}
    </div>
  );
}

export default Main;
