import React from 'react';
import { connect } from 'react-redux';

import Editor from './Editor.component';

export const mapStateToProps = (state) => ({
  isGrandAdmin: state.AdminReducer.isGrandAdmin,
});

export const EditorContainer = () => (
  <Editor />
);
export default connect(mapStateToProps, null)(EditorContainer);
