import { Route, Routes } from 'react-router-dom';

import Page from './components/Page';
import Checkout from './components/Checkout/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Page />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}

export default App;
