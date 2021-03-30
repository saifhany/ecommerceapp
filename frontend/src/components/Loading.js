import React from 'react';
import LoaderGif from "../../src/282.gif";
import '../index.css';
const Loading = (props) => {
    return (
        <div className="loader-container">
            <div className="loader">
                <img src={LoaderGif} />
            </div>
        </div>
    )
}
export default Loading
