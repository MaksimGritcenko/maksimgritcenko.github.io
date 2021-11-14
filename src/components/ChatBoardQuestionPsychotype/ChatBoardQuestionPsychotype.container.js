import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { addQuestionFormulation, addOrRemoveAnswerForFormulation } from 'Store/ChatBoard/ChatBoard.dispatcher';
import { pushNotification, WARNING_TYPE } from 'Store/Notification/Notification.dispatcher';
import {
    WARNING_SUCH_ANSWER_EXIST,
    WARNING_EMPTY_ANSWER_FIELD,
    WARNING_FORMULATION_WASNT_CHANGED,
} from 'Utils/Constants/notificationMessages';

import ChatBoardQuestionPsychotype from './ChatBoardQuestionPsychotype.component';

export const mapStateToProps = (state) => ({
    isLoading: state.ChatBoardReducer.isFormulationLoading,
    formulations: state.ChatBoardReducer.formulations,
});

export const mapDispatchToProps = (dispatch) => ({
    addQuestionFormulation: async (questionId, psychotypeId, formulation) => {
        const result = await addQuestionFormulation(dispatch, questionId, psychotypeId, formulation);
        return result;
    },
    addOrRemoveAnswerForFormulation: async (questionId, formulationId, data) => {
        const result = await addOrRemoveAnswerForFormulation(dispatch, questionId, formulationId, data);
        return result;
    },
    pushNotification: (type, message) => pushNotification(dispatch, type, message),
});

export const ChatBoardQuestionPsychotypeContainer = (props) => {
    const {
        questionId,
        psychotype: { id },
        formulation,
        addQuestionFormulation,
        addOrRemoveAnswerForFormulation,
        pushNotification,
    } = props;

    const [inputVal, setInputVal] = useState('');
    const [answerVal, setAnswerVal] = useState('');
    const [isAddAnswerAvailable, setIsAddAnswerAvailable] = useState(false);
    const [isAnswersExpanded, setIsAnswersExpanded] = useState(false);

    useEffect(() => {
        const { data: { formulationText } = {} } = formulation || {};

        if (formulationText) {
            setInputVal(formulationText);
            setIsAddAnswerAvailable(true);
        } else {
            setInputVal('');
            setIsAddAnswerAvailable(false);
        }
    }, [formulation]);

    function onInputChange(e) {
        setInputVal(e.target.value);
    }

    function onAnswerInputChange(e) {
        setAnswerVal(e.target.value);
    }

    function onExpandAnswers() {
        setIsAnswersExpanded(!isAnswersExpanded);
    }

    function onAnswerRemoveClick(answerTextToRemove) {
        const { data: { answers = [] } = {} } = formulation || {};

        const newAnswers = [...answers]
            .filter((answerText) => answerTextToRemove !== answerText);

        const data = { answers: newAnswers };
        addOrRemoveAnswerForFormulation(questionId, id, data);
    }

    async function onAddClick() {
        const { data: { formulationText } = {} } = formulation || {};

        if (formulationText === inputVal || formulationText === inputVal.trim()) {
            pushNotification(WARNING_TYPE, WARNING_FORMULATION_WASNT_CHANGED);
            return;
        }

        const isFormulationEditted = await addQuestionFormulation(questionId, id, inputVal);

        if (isFormulationEditted && inputVal) {
            setIsAddAnswerAvailable(true);
        } else {
            setIsAddAnswerAvailable(false);
            setIsAnswersExpanded(false);
        }
    }

    async function onAnswerAddClick() {
        const { data: { answers = [] } = {} } = formulation || {};

        const isAddError = answers.some((answerText) => answerText === answerVal.trim()) || !answerVal.trim();

        if (isAddError) {
            const notification = !answerVal.trim()
                ? WARNING_EMPTY_ANSWER_FIELD
                : WARNING_SUCH_ANSWER_EXIST;
            pushNotification(WARNING_TYPE, notification);
            return;
        }

        const data = { answers: [...answers, answerVal] };
        addOrRemoveAnswerForFormulation(questionId, id, data);
    }

    const containerProps = () => ({
        ...props,
        inputVal,
        answerVal,
        isAddAnswerAvailable,
        isAnswersExpanded,
    });

    const containerFunctions = {
        onInputChange,
        onAnswerInputChange,
        onAddClick,
        onAnswerAddClick,
        onExpandAnswers,
        onAnswerRemoveClick,
    };

    return (
        <ChatBoardQuestionPsychotype
            {...containerProps()}
            {...containerFunctions}
        />
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(ChatBoardQuestionPsychotypeContainer);
