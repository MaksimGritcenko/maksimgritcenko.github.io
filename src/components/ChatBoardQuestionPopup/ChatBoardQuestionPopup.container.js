import React, { useState } from 'react';
import { connect } from 'react-redux';

import { addQuestion, addQuestionFormulation, getQuestionFormulations } from 'Store/ChatBoard/ChatBoard.dispatcher';
import { pushNotification } from 'Store/Notification/Notification.dispatcher';
import { updateActivePopupId } from 'Store/Popup/Popup.action';
import { getServerTimestamp } from 'Utils/Firebase';

import ChatBoardQuestionPopup from './ChatBoardQuestionPopup.component';

export const mapStateToProps = (state) => ({
    adminId: state.AdminReducer.admin.docId,
    psychotypes: state.PsychoTypesReducer.psychotypes,
    questions: state.ChatBoardReducer.questions,
    formulations: state.ChatBoardReducer.formulations,
    isFormulationLoading: state.ChatBoardReducer.isFormulationLoading,
});

export const mapDispatchToProps = (dispatch) => ({
    addQuestion: (questionData) => addQuestion(dispatch, questionData),
    closePopup: () => dispatch(updateActivePopupId('')),
    addQuestionFormulation: (
        questionId, psychotypeId, formulation,
    ) => addQuestionFormulation(dispatch, questionId, psychotypeId, formulation),
    getQuestionFormulations: (questionId) => getQuestionFormulations(dispatch, questionId),
    pushNotification: (type, message) => pushNotification(dispatch, type, message),
});

export const ChatBoardQuestionPopupContainer = (props) => {
    const {
        addQuestion,
        adminId,
    } = props;

    const [questionAddInputVal, setQuestionAddInputVal] = useState('');
    const [answerAddInputVal, setAnswerAddInputVal] = useState('');
    const [isLoading, setIsLoading] = useState('');

    function onQuestionAddChange(e) {
        setQuestionAddInputVal(e.target.value);
    }

    function onAnswerAddChange(e) {
        setAnswerAddInputVal(e.target.value);
    }

    async function onQuestionAddClick() {
        const timestamp = getServerTimestamp();
        const questionData = {
            answerInput: answerAddInputVal,
            questionInput: questionAddInputVal,
            adminId,
            created_at: timestamp,
            updated_at: timestamp
        };

        setIsLoading(true);
        const isQuestionAdded = await addQuestion(questionData);
        setIsLoading(false);

        if (isQuestionAdded) {
            setQuestionAddInputVal('');
            setAnswerAddInputVal('');
        }
    }

    const containerProps = () => {
        return {
            ...props,
            questionAddInputVal,
            answerAddInputVal,
            isLoading,
        };
    };

    const containerFunctions = {
        onQuestionAddChange,
        onAnswerAddChange,
        onQuestionAddClick,
    };

    return (
        <ChatBoardQuestionPopup
            {...containerProps()}
            {...containerFunctions}
        />
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBoardQuestionPopupContainer);
