import React from 'react';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import Loader from 'Components/Loader';
import Popup from 'Components/Popup';

import { CHATBOARD_ADD_TAB_POPUP } from './ChatBoardAddTabPopup.config';

import './ChatBoardAddTabPopup.style.scss';

export const ChatBoardAddTabPopup = (props) => {
    const {
        tabAddInputVal,
        onChange, addTab,
        isLoading,
    } = props;

    function renderAddBoardItemBtn() {
        return (
            <IconButton
                className="ChatBoardTabs-AddBtn"
                onClick={addTab}
            >
                <AddIcon />
            </IconButton>
        );
    }

    return (
        <Popup
            popupId={CHATBOARD_ADD_TAB_POPUP}
            hookClasses={['ChatBoardAddTabPopup']}
        >
            <div className="ChatBoardAddTabPopup-Wrapper">
                <Input
                    autoFocus
                    placeholder="Enter a new tab name..."
                    value={tabAddInputVal}
                    onChange={onChange}
                />
                { renderAddBoardItemBtn() }
            </div>
            <Loader isLoading={isLoading} />
        </Popup>
    );
};
export default ChatBoardAddTabPopup;
