import React, { useState } from 'react';
import { connect } from 'react-redux';

import { CHATBOARD_ADD_QUESTION_POPUP } from 'Components/ChatBoardQuestionPopup/ChatBoardQuestionPopup.config';
import { updateActivePopupId } from 'Store/Popup/Popup.dispatcher';

import ChatBoardQuestions from './ChatBoardQuestions.component';

export const mapStateToProps = (state) => ({
    questions: state.ChatBoardReducer.questions,
    isQuestionsLoading: state.ChatBoardReducer.isQuestionsLoading,
});

export const mapDispatchToProps = (dispatch) => ({
    openPopup: (popupId) => updateActivePopupId(dispatch, popupId),
});

export const ChatBoardQuestionsContainer = (props) => {
    const { openPopup } = props;

    const [isEdittingPopupType, setIsEdittingPopupType] = useState(false);
    const [edittingQstId, setEdittingQstId] = useState('');

    function openAddQuestionPopup() {
        setIsEdittingPopupType(false);
        setTimeout(() => openPopup(CHATBOARD_ADD_QUESTION_POPUP));
    }

    const containerFunctions = {
        openAddQuestionPopup,
        setIsEdittingPopupType,
        setEdittingQstId,
    };

    const containerProps = () => ({
        ...props,
        isEdittingPopupType,
        edittingQstId,
    });

    return (
        <ChatBoardQuestions
            {...containerProps()}
            {...containerFunctions}
        />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoardQuestionsContainer);
