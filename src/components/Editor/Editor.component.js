import React, { useEffect, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML } from 'draft-js-export-html';

import { toolbarConfig } from './Editor.config';

import './Editor.style.scss';

export const EditorComponent = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  // eslint-disable-next-line
  const [contentInHtmlForm, setContentInHtmlForm] = useState('');

  useEffect(() => {
    onTextAreaClick('addEventListener');

    return () => {
      onTextAreaClick('removeEventListener');
    };
  });

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

  return (
    <Editor
      toolbar={toolbarConfig}
      editorState={editorState}
      wrapperClassName="EditorWrapper"
      editorClassName="EditorTextArea"
      toolbarClassName="EditorToolbar"
      onEditorStateChange={onContentChange}
    />
  );
};

export default EditorComponent;
