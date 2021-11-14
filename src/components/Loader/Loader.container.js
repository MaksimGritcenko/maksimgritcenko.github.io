import React from 'react';

import LoaderComponent from 'Components/Loader/Loader.component';

export const LoaderContainer = (props) => {
    const { isLoading } = props;

    if (!isLoading) return false;

    return (
        <LoaderComponent />
    );
};

export default LoaderContainer;
