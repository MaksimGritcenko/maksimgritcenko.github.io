import React from 'react';

import IconButton from '@mui/material/IconButton';
import DeleteButton from '@mui/icons-material/DeleteOutline';
import PencilIcon from '@mui/icons-material/Create';

import Loader from 'Components/Loader';

import './ChatBoardQuestionItem.style.scss';

export const ChatBoardQuestionItem = (props) => {
    const {
        name,
        id,
        openEdittingPopup,
        removeQuestion,
        isLoading,
    } = props;

    const buttonsMap = [
        {
            Component: PencilIcon,
            action: () => openEdittingPopup(),
            isActive: true,
        },
        {
            Component: DeleteButton,
            action: () => removeQuestion(id),
            isActive: true,
        },
    ];

    const renderButtons = () => buttonsMap.map(({ Component, action, isActive }, i) => (
        <IconButton
            key={i}
            onClick={action}
            size="small"
            className={`ChatBoardTabItem-Button ${isActive && 'ChatBoardTabItem-Button_isActive'}`}
        >
            <Component />
        </IconButton>
    ));

    function renderQuestionName() {
        return (
            <h3 className="ChatBoardQuestionItem-Name">
                {name}
            </h3>
        );
    }

    function renderContent() {
        return (
            <>
                <Loader isLoading={isLoading} />
                { renderQuestionName() }
                <div className="ChatBoardQuestionItem-Actions">
                    { renderButtons() }
                </div>
            </>
        );
    }

    return (
        <div className="ChatBoardQuestionItem">
            { renderContent() }
        </div>
    );
};

export default ChatBoardQuestionItem;
