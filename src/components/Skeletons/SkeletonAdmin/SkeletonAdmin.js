import React from 'react';
import SkeletonElements from 'Components/Skeletons/SkeletonElements';
import Shimmer from 'Components/Skeletons/Shimmer/Shimmer';

const SkeletonArticle = ({ theme }) => {
    const themeClass = theme || 'light';

    return (
        <div className={`skeleton-wrapper ${themeClass}`}>
            <div className="skeleton-article">
                <SkeletonElements type="title" />
                <SkeletonElements type="avatar" />
            </div>
            <Shimmer />
        </div>
    );
};

export default SkeletonArticle;
