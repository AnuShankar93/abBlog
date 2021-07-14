import React from 'react';
import Loader from "react-loader-spinner";
import './filter.scss'
import { useAppDispatch, useAppSelector } from 'hook/hook';
import { TagState } from 'interface/filter.interface';
import { selectedTags } from 'pages/landingPage/slice/blogListSlice';

const FilterPanel = () => {
    const tags: TagState = useAppSelector(state => state.Tags);
    const categories: TagState = useAppSelector(state => state.Categories);
    const selectedTag = useAppSelector(state => state.BlogList.selectedTags);
    const dispatch = useAppDispatch();

    const renderItemAsList = (listArray: any, type: string) => {
        return listArray?.map((list: any, index: any) => {
            return (<li key={index} className="mt-2 list">
                {type === 'tag' ? renderAsTag(list,index) : renderAsCheckBox(list)}
            </li>)
        })
    }

    const renderAsTag = (tag: { id: string; name: string },index: any) => {
        return (
            <span className={`tag ${randomTagGenerator(index)} ${(selectedTag === tag.id) && 'add-opacity'}`} onClick={() => addToSearchArray(tag.id, 'tag')}>
                {tag.name}
            </span>
        )
    }

    const renderAsCheckBox = (categories: { id: string; name: string }) => {
        return (
            <label className="checkbox">
                <input type="checkbox" onClick={() => addToSearchArray(categories.id, 'checkbox')}/>
                {categories.name}
            </label>
        )
    }

    const addToSearchArray = (id: string, type:string) => {
        dispatch(selectedTags({id,type}));
    }

    const randomTagGenerator = (index: any) => {
        index = index >= 5 ? index/5 : index;
        const tagColorArr = ['is-primary', 'is-link', 'is-info', 'is-success', 'is-warning', 'is-danger'];
        return tagColorArr[index];
    }



    const renderLoader = () => {
        return (
            <Loader
                type="ThreeDots"
                color="#FFFFFF"
                height={25}
                width={25}
                timeout={6000}
            />
        )
    }

    return (
        <div className="sidebar-wrapper m-7">
            <ul className="main-list p-5">
                <p className="mb-2">Tags</p>
                {tags.loading ? renderLoader() : renderItemAsList(tags?.tags, 'tag')}
            </ul>
            <ul className="main-list p-5">
                <p className="mb-2">Categories</p>
                {tags.loading ? renderLoader() : renderItemAsList(categories?.categories, 'checkbox')}
            </ul>
        </div>
    )
}

export default FilterPanel;


