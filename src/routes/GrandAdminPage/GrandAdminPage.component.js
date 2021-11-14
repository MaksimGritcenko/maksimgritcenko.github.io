import React from 'react';

import Editor from 'Components/Editor';
import TreeNav from 'Components/TreeNav';
import Loader from 'Components/Loader';

import './GrandAdminPage.style.scss';

export const GrandAdminPageComponent = (props) => {
    const {
        isLoading,
        setIsLoading,
    } = props;

    return (
        <main className="GrandAdminPage">
            <TreeNav />
            <Editor setIsLoading={setIsLoading} />
            <Loader isLoading={isLoading} />
        </main>
    );
};

export default GrandAdminPageComponent;
