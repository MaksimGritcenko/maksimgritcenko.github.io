import React from 'react';

import WithChatBoardRenders from 'Hoc/WithChatBoardRenders';
import ChatBoardQuestionItem from 'Components/ChatBoardQuestionItem';
import ChatBoardQuestionPopup from 'Components/ChatBoardQuestionPopup';
import ChatBoardSkeleton from 'Components/Skeletons/ChatBoardSkeleton/ChatBoardSkeleton';

import './ChatBoardQuestions.style.scss';

export const ChatBoardQuestions = (props) => {
    const {
        renderAddItemBtn,
        openAddQuestionPopup,
        activeTabId,
        questions,
        isQuestionsLoading,
        isEdittingPopupType,
        setIsEdittingPopupType,
        setEdittingQstId,
        edittingQstId,
    } = props;

    function renderQuestionsPlaceholder() {
        return <ChatBoardSkeleton />;
    }

    function renderEmptyQuestionsSection() {
        const text = !activeTabId
            ? 'Select a topic.'
            : "Questions for this topic aren't exist.";

        return (
            <p className="ChatBoardQuestions-EmptyQstMsg">
                { text }
            </p>
        );
    }

    function renderQuestionsSection() {
        if (isQuestionsLoading) {
            return renderQuestionsPlaceholder();
        }

        if (!questions?.length || !activeTabId) {
            return renderEmptyQuestionsSection();
        }

        return (
            <div className="ChatBoardQuestions-QuestionsSection">
                { questions.map(renderQuestion) }
            </div>
        );
    }

    function renderQuestion({ data, id }) {
        return (
            <div
                className="ChatBoardQuestions-Question"
                key={id}
            >
                <ChatBoardQuestionItem
                    {...{ ...data, id }}
                    setIsEdittingPopupType={setIsEdittingPopupType}
                    edittingQstId={edittingQstId}
                    setEdittingQstId={setEdittingQstId}
                />
            </div>
        );
    }

    function renderAddQuestionPopup() {
        return (
            <ChatBoardQuestionPopup
                tabId={activeTabId}
                isEdittingPopupType={isEdittingPopupType}
                edittingQstId={edittingQstId}
            />
        );
    }

    function renderContent() {
        return (
            <>
                { renderAddQuestionPopup() }
                { renderAddItemBtn('Add Question', openAddQuestionPopup, !activeTabId) }
                { renderQuestionsSection() }
            </>
        );
    }

    return (
        <div className="ChatBoardQuestions">
            { renderContent() }
        </div>
    );
};

export default WithChatBoardRenders(ChatBoardQuestions);
