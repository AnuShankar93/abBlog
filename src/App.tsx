import React, { useEffect, useState } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainLayout from 'container/MainLayout/MainLayout';
import Detail from 'pages/landingPage/components/Detail/Detail';
import { useAppDispatch } from 'hook/hook';
import { setIsMobile } from 'store/slices/mainSlice';

const App = () => {

  const dispatch = useAppDispatch();
  const [width, setWidth] = useState<number>(window.innerWidth);
  let isMobile: boolean = (width <= 768);
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, []);


  useEffect(() => {
    dispatch(setIsMobile(isMobile))
  }, [dispatch, isMobile])


  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth);
  }

  return (
    <Router>
      <Switch>
        {isMobile && <Route path='/:id' component={Detail} />}
        <Route path='/' component={MainLayout} />
      </Switch>
    </Router>
  );
}

export default App;
