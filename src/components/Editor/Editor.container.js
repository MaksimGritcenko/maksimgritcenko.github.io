import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import { updateOnboardingSlidesContent } from 'Store/Settings/Settings.dispatcher';

import Editor from './Editor.component';

export const mapStateToProps = (state) => ({
    isGrandAdmin: state.AdminReducer.isGrandAdmin,
    customizableContent: state.SettingsReducer.customizableContent,
    activeMenuItem: state.SettingsReducer.activeMenuItem,
});

export const mapDispatchToProps = (dispatch) => ({
    updateOnboardingSlidesContent: (dataToUpdate, prevData, setLoading) => updateOnboardingSlidesContent(dispatch, dataToUpdate, prevData, setLoading),
});

export const EditorContainer = (props) => {
    const {
        updateOnboardingSlidesContent,
        customizableContent = [],
        activeMenuItem,
        setIsLoading,
    } = props;

    const currentContent = customizableContent
        .reduce((acc, contentDoc) => {
            if (Object.keys(contentDoc.data).includes(activeMenuItem)) {
                acc = contentDoc.data[activeMenuItem];
            }

            return acc;
        },
        '');

    const [contentInHtmlForm, setContentInHtmlForm] = useState();
    const [editorState, setEditorState] = useState(() => setInitialEditorState());

    useEffect(() => {
        if (!activeMenuItem) {
            return;
        }

        onTextAreaClick('addEventListener');
        window.addEventListener('onContentSelect', onContentSelectEvent);

        return () => {
            onTextAreaClick('removeEventListener');
            window.removeEventListener('onContentSelect', onContentSelectEvent);
        };
    });

    function setInitialEditorState() {
        const state = EditorState.createWithContent(stateFromHTML(currentContent));
        setContentInHtmlForm(stateToHTML(state.getCurrentContent()));
        return state;
    }

    function onContentSelectEvent() {
        const newState = EditorState.createWithContent(stateFromHTML(currentContent));
        setContentInHtmlForm(stateToHTML(newState.getCurrentContent()));
        setEditorState(newState);
    }

    function onTextAreaClick(action) {
        const textArea = document.querySelector('.EditorTextArea');
        textArea[action]('click', () => {
            textArea.children[0].click();
        });
    }

    function onContentChange(editorState) {
        setEditorState(editorState);
        setContentInHtmlForm(stateToHTML(editorState.getCurrentContent()));
    }

    function getIsContentUpdatable() {
        if (
            !activeMenuItem.trim()
            || !editorState.getCurrentContent().getPlainText().trim()
        ) {
            return false;
        }

        return true;
    }

    function onSaveClick() {
        if (!getIsContentUpdatable()) {
            return;
        }

        updateOnboardingSlidesContent(
            { [activeMenuItem]: contentInHtmlForm },
            customizableContent,
            setIsLoading,
        );
    }

    const containerFunctions = {
        onSaveClick,
        onContentChange,
        onTextAreaClick,
        setEditorState,
        setContentInHtmlForm,
    };

    const containerProps = () => ({
        ...props,
        editorState,
        contentInHtmlForm,

    });

    return (
        <Editor
            {...containerProps()}
            {...containerFunctions}
        />
    );
};
export default connect(mapStateToProps, mapDispatchToProps)(EditorContainer);
