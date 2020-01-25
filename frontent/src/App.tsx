import React from 'react';
import { HomePageView } from './views/HomePageView';
import { HomePageStore } from './stores/HomePageStore';

const App: React.FC = () => {
  return (
    <div className="App" style={{height: "100%", width: "100%"}}>
      <HomePageView store={new HomePageStore({})} />
    </div>
  );
}

export default App;
