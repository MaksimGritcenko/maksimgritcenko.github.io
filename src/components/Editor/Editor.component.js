import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import Button from '@mui/material/Button';

import { toolbarConfig } from './Editor.config';

import './Editor.style.scss';

export const EditorComponent = (props) => {
    const {
        editorState,
        onContentChange,
        onSaveClick,
        activeMenuItem,
    } = props;

    function renderSaveBtn() {
        return (
            <Button
                className="EditorWrapper-SaveBtn"
                variant="contained"
                onClick={onSaveClick}
                disabled={!activeMenuItem}
            >
                Save
            </Button>
        );
    }

    if (!activeMenuItem) {
        return null;
    }

    return (
        <div className="EditorWrapper-Container">
            <Editor
                toolbar={toolbarConfig}
                editorState={editorState}
                wrapperClassName="EditorWrapper"
                editorClassName="EditorTextArea"
                toolbarClassName="EditorToolbar"
                onEditorStateChange={onContentChange}
            />
            { renderSaveBtn() }
        </div>
    );
};

export default EditorComponent;
