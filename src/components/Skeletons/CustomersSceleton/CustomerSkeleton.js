import React from 'react';
import SkeletonElements from 'Components/Skeletons/SkeletonElements';
import Shimmer from 'Components/Skeletons/Shimmer/Shimmer';

import './CustomerSkeleton.style.scss';

const CustomerSkeleton = ({ theme }) => {
    const themeClass = theme || 'light';

    return (
        <div className={`skeleton-wrapper ${themeClass}`}>
            <div className="skeleton-customer">
                <div className="header">
                    <SkeletonElements type="avatar" />
                </div>
                <div className="content">
                    <SkeletonElements type="title" />
                    <SkeletonElements type="text" />
                </div>
            </div>
            <Shimmer />
        </div>
    );
};

export default CustomerSkeleton;
