import { useAppDispatch } from 'hook/hook';
import LandingPage from 'pages/landingPage/LandingPage';
import React, { useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import { getCategories } from 'store/slices/categoriesSlice';
import { getTags } from 'store/slices/tagSlice';
import './layout.scss'

const MainLayout = (props: any) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTags());
        dispatch(getCategories())
    }, [dispatch])


    return (
        <Switch>
            <Route component={LandingPage} />
        </Switch>

    )
}

export default MainLayout;