import React from 'react';

import Input from '@mui/material/Input';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; import CloseBtn from 'Components/CloseBtn';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import PencilIcon from '@mui/icons-material/Create';

import Loader from 'Components/Loader';

import './ChatBoardQuestionPsychotype.style.scss';

export const ChatBoardQuestionPsychotype = (props) => {
    const {
        psychotype: {
            data: {
                name,
            },
        },
        formulation: { data: { answers } = {} } = {},
        inputVal,
        answerVal,
        onAddClick,
        onAnswerAddClick,
        onAnswerRemoveClick,
        onExpandAnswers,
        onInputChange,
        onAnswerInputChange,
        isLoading,
        isAddAnswerAvailable,
        isAnswersExpanded,
    } = props;

    const buttonsMap = [
        {
            Component: PencilIcon,
            onClick: onAddClick,
            isActive: true,
        },
        {
            Component: ArrowDropDownIcon,
            onClick: onExpandAnswers,
            isActive: isAddAnswerAvailable,
            className: `ChatBoardQuestionPsychotype-DropdownButton ${isAnswersExpanded ? 'ChatBoardQuestionPsychotype-DropdownButton_isExpanded' : ''}`,
        },
    ];

    const answerButtonsMap = [
        {
            Component: AddIcon,
            onClick: onAnswerAddClick,
            isActive: true,
        },
    ];

    function renderHeader() {
        return (
            <h3 className="ChatBoardQuestionPsychotype-Header">
                { name }
            </h3>
        );
    }

    function renderInputField(value, onChange, placeholder, actionsMap) {
        return (
            <div className="ChatBoardQuestionPsychotype-InputRow">
                <div className="ChatBoardQuestionPsychotype-InputWrapper">
                    <Input
                        fullWidth
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                    />
                </div>
                { renderActions(actionsMap) }
            </div>
        );
    }

    function renderQuestionInputField() {
        const placeholder = `Default is used for ${name}`;
        return renderInputField(inputVal, onInputChange, placeholder, buttonsMap);
    }

    function renderButton(button) {
        const {
            Component,
            onClick,
            isActive,
            className,
        } = button;

        return (
            <IconButton
                onClick={onClick}
                size="small"
                className={`ChatBoardTabItem-Button ${isActive && 'ChatBoardTabItem-Button_isActive'} ${className}`}
            >
                <Component />
            </IconButton>
        );
    }

    function renderActions(actionsMap) {
        return (
            <div className="ChatBoardQuestionPsychotype-Actions">
                { actionsMap.map(renderButton) }
            </div>
        );
    }

    function renderAnswerTabs() {
        if (!Array.isArray(answers) || !answers.length) {
            return null;
        }

        return answers.map(renderAnswerTab);
    }

    function renderAnswerTab(answerText) {
        return (
            <div className="ChatBoardQuestionPsychotype-AnswerTab">
                <p className="ChatBoardQuestionPsychotype-AnswerTabText">
                    { answerText }
                </p>
                <CloseBtn
                    onClick={() => onAnswerRemoveClick(answerText)}
                    fontSize="small"
                />
            </div>
        );
    }

    function renderAnswersSection() {
        const placeholder = 'Add a new answer';

        if (!isAnswersExpanded) {
            return null;
        }

        return (
            <div className="ChatBoardQuestionPsychotype-AnswerTabsSection">
                <h4 className="ChatBoardQuestionPsychotype-AnswerTabsHeader">
                    Answers:
                </h4>
                { renderInputField(answerVal, onAnswerInputChange, placeholder, answerButtonsMap) }
                <div className="ChatBoardQuestionPsychotype-AnswerTabs">
                    { renderAnswerTabs() }
                </div>
            </div>
        );
    }

    return (
        <div className="ChatBoardQuestionPsychotype">
            <Loader isLoading={isLoading} />
            { renderHeader() }
            { renderQuestionInputField() }
            { renderAnswersSection() }
        </div>
    );
};
export default ChatBoardQuestionPsychotype;
