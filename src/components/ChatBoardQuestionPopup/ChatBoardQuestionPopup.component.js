import React from 'react';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';

import Loader from 'Components/Loader';
import Popup from 'Components/Popup';

import { CHATBOARD_ADD_QUESTION_POPUP } from './ChatBoardQuestionPopup.config';

import './ChatBoardQuestionPopup.style.scss';

export const ChatBoardQuestionPopup = (props) => {
    const {
        questionAddInputVal,
        answerAddInputVal,
        isEdittingPopupType,
        isLoading,
        onQuestionAddChange,
        onAnswerAddChange,
        onQuestionAddClick,
    } = props;

    function renderAddQuestionBtn() {
        return (
            <div className="ChatBoardQuestionPopup-AddQstButton">
                <Button
                    variant="outlined"
                    onClick={ onQuestionAddClick }
                >
                    Add
                </Button>
            </div>
        );
    }

    function renderAddQuestion() {
        return renderAddInput(
            'Enter a new question...',
            questionAddInputVal,
            onQuestionAddChange,
        );
    }

    function renderAddAnswer() {
        return renderAddInput(
            'Enter an answer...',
            answerAddInputVal,
            onAnswerAddChange,
        );
    }

    function renderAddInput(placeholder, value, onChange) {
        return (
            <div className="ChatBoardQuestionPopup-Input">
                <Input
                    autoFocus
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                />
            </div>
        );
    }

    function renderPopupContent() {
        return (
            <div>
                { renderAddQuestion() }
                <br />
                { renderAddAnswer() }
                <br />
                { renderAddQuestionBtn() }
            </div>
        );
    }

    return (
        <Popup
            popupId={CHATBOARD_ADD_QUESTION_POPUP}
            hookClasses={['ChatBoardQuestionPopup']}
        >
            <div className={`ChatBoardQuestionPopup ${
                isEdittingPopupType
                    ? 'ChatBoardQuestionPopup_isEditting'
                    : ''}`}
            >
                { renderPopupContent() }
            </div>
            <Loader isLoading={isLoading} />
        </Popup>
    );
};
export default ChatBoardQuestionPopup;
