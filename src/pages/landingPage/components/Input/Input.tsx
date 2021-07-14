import { useAppDispatch, useAppSelector } from 'hook/hook';
import { inputSearchKeyword } from 'pages/landingPage/slice/blogListSlice';
import React from 'react';
import './input.scss'

const Input = () => {
    const dispatch = useAppDispatch();
    const value = useAppSelector(state => state.BlogList.searchKeyWord);

    const updateSearchKey = (e: any) => {
        e.preventDefault();
        dispatch(inputSearchKeyword(e.target.value));
    };


    return (
        <div className="input-wrapper">
            <i className="icon fas fa-search"></i>
            <input type="email" className="input-box" value={value}
                placeholder="Search" id="email" onChange= {e=> updateSearchKey(e)} 
            />
        </div>
    )
}

export default Input;