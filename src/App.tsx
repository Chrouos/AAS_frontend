import { useEffect } from 'react';
import { useLocation, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Accordion from './pages/Accordion';
import Carousel from './pages/Carousel';
import Collapse from './pages/Collapse';
import Dropdown from './pages/Dropdown';
import InputNumber from './pages/InputNumber';
import Overlay from './pages/Overlay';
import PinInput from './pages/PinInput';
import RemoveElement from './pages/RemoveElement';
import Scrollspy from './pages/Scrollspy';
import Select from './pages/Select';
import Stepper from './pages/Stepper';
import StrongPassword from './pages/StrongPassword';
import Tabs from './pages/Tabs';
import ToggleCount from './pages/ToggleCount';
import TogglePassword from './pages/TogglePassword';
import Tooltip from './pages/Tooltip';

function App() {
  const location = useLocation();

  useEffect(() => {
    require('preline/preline');
  }, []);

  useEffect(() => {
    // @ts-ignore
    HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <>
      <header>
        <div className="py-[20px] px-[50px]">
          <div className="flex flex-wrap gap-x-4">
            <Link to="/">Home</Link>
            <Link to="/accordion">Accordion</Link>
            <Link to="/carousel">Carousel</Link>
            <Link to="/collapse">Collapse</Link>
            <Link to="/dropdown">Dropdown</Link>
            <Link to="/input-number">Input Number</Link>
            <Link to="/overlay">Overlay</Link>
            <Link to="/pin-input">Pin Input</Link>
            <Link to="/remove-element">Remove Element</Link>
            <Link to="/scrollspy">Scrollspy</Link>
            <Link to="/select">Select</Link>
            <Link to="/stepper">Stepper</Link>
            <Link to="/strong-password">Strong Password</Link>
            <Link to="/tabs">Tabs</Link>
            <Link to="/toggle-count">Toggle Count</Link>
            <Link to="/toggle-password">Toggle Password</Link>
            <Link to="/tooltip">Tooltip</Link>
          </div>
        </div>
      </header>

      <div className="pb-[20px] px-[50px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/accordion" element={<Accordion />} />
          <Route path="/carousel" element={<Carousel />} />
          <Route path="/collapse" element={<Collapse />} />
          <Route path="/dropdown" element={<Dropdown />} />
          <Route path="/input-number" element={<InputNumber />} />
          <Route path="/overlay" element={<Overlay />} />
          <Route path="/pin-input" element={<PinInput />} />
          <Route path="/remove-element" element={<RemoveElement />} />
          <Route path="/scrollspy" element={<Scrollspy />} />
          <Route path="/select" element={<Select />} />
          <Route path="/stepper" element={<Stepper />} />
          <Route path="/strong-password" element={<StrongPassword />} />
          <Route path="/tabs" element={<Tabs />} />
          <Route path="/toggle-count" element={<ToggleCount />} />
          <Route path="/toggle-password" element={<TogglePassword />} />
          <Route path="/tooltip" element={<Tooltip />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
