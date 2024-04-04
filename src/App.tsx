import { Route, Routes } from 'react-router-dom';

import Page from './components/Page/Page';
import Checkout from './components/Checkout/Checkout';
import Main from './components/Page/Main/Main';
import Directions from './components/Page/Main/Directions/Directions';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />}>
        <Route index element={<Main />} />
        <Route path="directions" element={<Directions />} />
      </Route>
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
