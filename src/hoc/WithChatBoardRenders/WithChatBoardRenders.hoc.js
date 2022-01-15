import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import './WithChatBoardRenders.style.scss';

export const WithChatBoardRenders = (Component) => (props) => {
    function renderAddItemBtn(text, onClick, isDisabled = false) {
        return (
            <IconButton
                className="WithChatBoardRenders-AddBtn"
                onClick={onClick}
                disabled={isDisabled}
            >
                <AddIcon />
                <span>
                    { text }
                </span>
            </IconButton>
        );
    }

    const containerFunctions = {
        renderAddItemBtn,
    };

    return (
        <Component
            {...props}
            {...containerFunctions}
        />
    );
};

export default WithChatBoardRenders;
