import Card from 'components/Card/Card';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "react-loader-spinner";
import { useEffect, useState, useRef } from 'react';
import Detail from './components/Detail/Detail';
import Input from './components/Input/Input';
import Scrollbars from 'react-custom-scrollbars';
import './landing.scss'
import { useAppDispatch, useAppSelector } from 'hook/hook';
import { getBlogLists } from './slice/blogListSlice';
import FilterPanel from 'components/Filter/FilterPanel';
import { Route, Switch } from 'react-router-dom';

const LandingPage = (props: any) => {

    const dispatch = useAppDispatch();
    const { searchKeyWord, totalNumOfBlogs, list, selectedTags, selectedCategories } = useAppSelector(state => state.BlogList);
    const [blogs, setBlogs] = useState(list);
    const [hasMore, setMore] = useState(true);
    const [showMenu, setMenu] = useState(false);
    const parentElem = useRef<HTMLUListElement>(null);
    const cardElm = useRef<HTMLDivElement>(null);

    
    useEffect(() => {
        setBlogs(list); // to set the list to local state for implemnting filter
    }, [list]);

    useEffect(() => {
        filterListBasedOnInput(searchKeyWord); // for text filter
    }, [searchKeyWord])

    useEffect(() => {
        filterFunction()// for filter based on tags or categories
    }, [selectedTags])

    useEffect(() => {
        filterFunction()// for filter based on tags or categories
    }, [selectedCategories])

    useEffect(() => {
        fetchMoreData(); // to load new blogs based on scroll
    }, []);


    const fetchMoreData = () => {
        const totalCountValue = totalNumOfBlogs === null ? 1 : totalNumOfBlogs;
        if (list.length >= totalCountValue) {
            setMore(false);
        } else {
            const ulHeight = parentElem?.current?.clientHeight || 900;
            const cardHeight = cardElm?.current?.clientHeight || 110;
            const perPageCards = Math.ceil(ulHeight / cardHeight);
            const pageNumber = Math.ceil(list.length / perPageCards) + 1;
            dispatch(getBlogLists({ perPageCards, pageNumber }));
        }
    }

    const toggleMenuBar = () => {
        setMenu(!showMenu);
    }

    const filterFunction = () => {
        const categoriesFilteredList = filterBasedOnCategories(filterBasedOnTags(list) || [])
        setBlogs(categoriesFilteredList);
    }

    const filterListBasedOnInput = (key: string) => {
        const filteredBlogList = list.filter((blog: { title: { rendered: string; }; }) => blog.title.rendered.toLowerCase().includes(key.toLowerCase()));
        setBlogs(filteredBlogList);
    }

    const filterBasedOnTags = (filteredList: any[]) => {
        if (selectedTags !== null) {
            const filteredBlogList = filteredList.filter((blog: any) => blog.tags.includes(selectedTags));
            return filteredBlogList;
        } else {
            return filteredList
        }
    }

    const filterBasedOnCategories = (filteredList: any[]) => {
        if (selectedCategories?.length) {
            const filteredBlogList = filteredList.filter((blog: any) => {
                return blog.categories.find((blogCategory: any) => {
                    return selectedCategories.includes(blogCategory);
                })
            });
            return filteredBlogList;
        } else {
            return filteredList
        }
    }

    return (
        <div className="wrapper">
            <div className="columns">
                <div className={`column is-hidden-mobile sidebar is-one-fifth ${showMenu && 'sidebar-transition'}`}>
                    <div className="btn-wrap-icon is-hidden-desktop">
                        <button className="filter-btn" onClick={toggleMenuBar}><i className="fas fa-times"></i></button>
                    </div>
                    <FilterPanel />
                </div>
                <div className={`column is-one-third p-5 `}>
                    <ul className="filter-wrap ">
                        <li className="search-wrapper">
                            <div className="btn-wrap-icon">
                                <button className="filter-btn" onClick={toggleMenuBar}><i className="fas fa-bars"></i></button>
                            </div>
                            <Input />
                        </li>
                    </ul>
                    <ul id="scrollableList" ref={parentElem}>
                        <Scrollbars
                            universal
                            renderView={scrollProps => (
                                <div {...scrollProps} id="comments-scroll-target" />
                            )}
                        >
                            {blogs.length ? (
                                <InfiniteScroll
                                    dataLength={blogs.length}
                                    next={fetchMoreData}
                                    hasMore={hasMore}
                                    scrollableTarget="comments-scroll-target"
                                    endMessage={
                                        <p style={{ textAlign: 'center' }}>
                                            <b>Yay! You have seen it all</b>
                                        </p>
                                    }
                                    loader={<Loader
                                        type="ThreeDots"
                                        color="#FFFFFF"
                                        height={25}
                                        width={25}
                                        timeout={6000}
                                    />}
                                >
                                    {blogs.map((list: any, index: number) => (
                                        <Card key={index} data={list} innerRef={cardElm}/>
                                    ))}
                                </InfiniteScroll>
                            ) : (
                                <h1>No data found</h1>
                            )}
                        </Scrollbars>
                    </ul>
                </div>
                <div className={`column`}>
                    <Switch>
                        <Route path='/:id' component={Detail} />
                    </Switch>
                </div>
            </div>

        </div>
    )

}

export default LandingPage;
