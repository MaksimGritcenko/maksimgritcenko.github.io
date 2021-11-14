import React from 'react';
import Input from '@mui/material/Input';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import Loader from 'Components/Loader';
import Popup from 'Components/Popup';
import ChatBoardQuestionPsychotype from 'Components/ChatBoardQuestionPsychotype';

import { CHATBOARD_ADD_QUESTION_POPUP } from './ChatBoardQuestionPopup.config';

import './ChatBoardQuestionPopup.style.scss';

export const ChatBoardQuestionPopup = (props) => {
    const {
        psychotypes,
        formulations,
        questionAddInputVal,
        edittingQstId,
        isEdittingPopupType,
        isLoading,
        onQuestionAddChange,
        onQuestionAddClick,
    } = props;

    function renderAddBoardItemBtn(onClick) {
        return (
            <IconButton onClick={onClick}>
                <AddIcon />
            </IconButton>
        );
    }

    function renderEdditingQuestionPopupType() {
        if (!psychotypes || !psychotypes.length) {
            return (
                <p>
                    No psychotypes found.
                </p>
            );
        }

        return (
            <div>
                { psychotypes.map(renderPsychotypeFormulationField) }
            </div>
        );
    }

    function renderPsychotypeFormulationField(psychotype) {
        const { id } = psychotype;
        const formulation = formulations
            .filter(({ id: formulationId }) => formulationId === id)[0];

        return (
            <ChatBoardQuestionPsychotype
                key={id}
                questionId={edittingQstId}
                formulation={formulation}
                psychotype={psychotype}
            />
        );
    }

    function renerAddQuestionType() {
        return renderAddInput(
            'Enter a new question name...',
            questionAddInputVal,
            onQuestionAddChange,
            onQuestionAddClick,
        );
    }

    function renderAddInput(placeholder, value, onChange, onClick, isDisabled = false) {
        return (
            <div className="ChatBoardQuestionPopup-Input">
                <Input
                    autoFocus
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={isDisabled}
                />
                { renderAddBoardItemBtn(onClick) }
            </div>
        );
    }

    function renderPopupContent() {
        if (isEdittingPopupType) {
            return renderEdditingQuestionPopupType();
        }

        return renerAddQuestionType();
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
