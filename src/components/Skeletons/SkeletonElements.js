import React from 'react';
import './Skeleton.style.scss';

const SkeletonElements = ({ type }) => {
    const classes = `skeleton ${type}`;
    return (
        <div className={classes} />
    );
};

export default SkeletonElements;
