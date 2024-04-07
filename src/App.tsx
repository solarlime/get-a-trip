import { Route, Routes } from 'react-router-dom';

import Page from './components/Page/Page';
import Checkout from './components/Checkout/Checkout';
import Main from './components/Page/Main/Main';
import Directions from './components/Page/Main/Directions/Directions';
import Direction from './components/Page/Main/Directions/Direction/Direction';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<Main />} />
        <Route path="/directions" element={<Directions />} />
        <Route path="/directions/:location" element={<Direction />} />
      </Route>
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
