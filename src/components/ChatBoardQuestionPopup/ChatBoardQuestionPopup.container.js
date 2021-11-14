import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { addQuestion, addQuestionFormulation, getQuestionFormulations } from 'Store/ChatBoard/ChatBoard.dispatcher';
import { pushNotification, WARNING_TYPE } from 'Store/Notification/Notification.dispatcher';
import { WARNING_ON_ADDING_ALREADY_EXISTING_QUESTION } from 'Utils/Constants/notificationMessages';
import { updateActivePopupId } from 'Store/Popup/Popup.action';

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
        psychotypes,
        addQuestion,
        pushNotification,
        tabId,
        edittingQstId,
        adminId,
        closePopup,
        formulation,
        questions,
    } = props;

    const [questionAddInputVal, setQuestionAddInputVal] = useState('');
    const [formulationInputVal, setFormulationInputVal] = useState('');
    const [selectValue, setSelectValue] = useState('');
    const [prevEdittingQstId, setPrevEdittingQstId] = useState(null);
    const [isLoading, setIsLoading] = useState('');

    useEffect(() => {
        let newFormulation = '';

        if (prevEdittingQstId === edittingQstId) {
            newFormulation = formulation;
        } else {
            setSelectValue('');
        }

        setFormulationInputVal(newFormulation);
        setPrevEdittingQstId(edittingQstId);
    }, [formulation, edittingQstId]);

    function onQuestionAddChange(e) {
        setQuestionAddInputVal(e.target.value);
    }

    async function onQuestionAddClick() {
        const questionData = {
            name: questionAddInputVal,
            adminId,
            tabId,
        };

        const isSuchQstExist = questions.length
      && questions.some(({ data: { name } }) => name.trim() === questionAddInputVal.trim());

        if (isSuchQstExist) {
            pushNotification(WARNING_TYPE, WARNING_ON_ADDING_ALREADY_EXISTING_QUESTION);
            return;
        }

        setIsLoading(true);
        const isQuestionAdded = await addQuestion(questionData);
        setQuestionAddInputVal('');
        setIsLoading(false);

        if (isQuestionAdded) {
            closePopup();
        }
    }

    const containerProps = () => {
        const {
            data: {
                name: activePsychotypeName,
            } = {},
        } = psychotypes.filter(({ id }) => id === selectValue)[0] || {};

        return {
            ...props,
            questionAddInputVal,
            formulationInputVal,
            selectValue,
            activePsychotypeName,
            isLoading,
        };
    };

    const containerFunctions = {
        onQuestionAddChange,
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
