import React from 'react';
import Icon from 'assets/img/avatar.jpeg';
import Loader from "react-loader-spinner";
import { useHistory, useParams } from 'react-router-dom';
import BlogImage from 'assets/img/blog.svg';
import './detail.scss'
import { useAppDispatch, useAppSelector } from 'hook/hook';
import Scrollbars from 'react-custom-scrollbars';
import { useEffect } from 'react';
import { getBlog } from 'pages/landingPage/slice/blogListSlice';
import ReactHtmlParser from 'react-html-parser';



const Detail = (props: any) => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const { list, currentSelectedData } = useAppSelector(state => state.BlogList);
    const selectedBlog = list.filter((list: { id: any; }) => list.id === Number(id));
    const isMobile = useAppSelector(state => state.Main.isMobile);

    useEffect(() => {
        list?.length === 0 && dispatch(getBlog(Number(id)))
    }, [id])

    const parseHtml = (item: any) => {
        return ReactHtmlParser(item)
    }

    const navigateToListing = () => history.push("/");


    const renderBlog = () => {
        const renderBlog = selectedBlog?.length ? selectedBlog[0] : currentSelectedData;
        if (Object.keys(renderBlog).length) {
            return (
                <Scrollbars universal>
                    {isMobile && <button className="button is-white" onClick={navigateToListing}><i className="fas fa-angle-left mr-2"></i>Back to Listing</button>}
                    <div className={`columns  is-mobile ${isMobile ? 'm-0' : 'm-5'}`}>
                        <div className="column is-1">
                            <figure className={`image ${isMobile ? 'is-48x48' : 'is-64x64'} ${isMobile && 'mt-1'}`}>
                                <img className="is-rounded" src={Icon} alt="avatar icon" />
                            </figure>
                        </div>
                        <div className="column ml-3 is-11">
                            <div className="content">
                                <div className="columns m-0">
                                    <h3 className="column is-10 is-size-3">{parseHtml(renderBlog.title.rendered)}</h3>
                                    <p className="column is-2 is-size-6">Oct 22</p>
                                </div>
                                <div className="mb-6">
                                    <span className="tag is-danger mr-2">Inspiration</span>
                                    <span className="tag is-warning">Photos</span>
                                </div>
                                <div className="blog-content">
                                    {parseHtml(renderBlog.content.rendered)}
                                </div>
                            </div>
                        </div>
                    </div>
                </Scrollbars>
            )
        } else {
            <Loader
                type="ThreeDots"
                color="#FFFFFF"
                height={45}
                width={45}
                timeout={10000}
            />
        }

    }
    return (
        <div className="section">
            {renderBlog()}
        </div>
    )
}

export default Detail;