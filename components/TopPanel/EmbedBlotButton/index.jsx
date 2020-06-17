import React from 'react';
import classNames from 'classnames/bind';
import Quill from 'app/ducks/textEditor';
import { connect } from 'react-redux';
import styles from './styles';
import { getSingleSelectedBloc } from 'app/ducks/canvas/selected';
import { updateBloc } from 'app/ducks/blocs';

const mapStateToProps = state => ({
  bloc: getSingleSelectedBloc(state),
});

const mapDispatchToProps = dispatch => ({
  onUpdate: (id, updated) => dispatch(updateBloc(id, updated)),
});

function insertEmbed (quill, name) {
  let range = quill.getSelection(true);
  quill.insertText(range.index, '\n', Quill.sources.USER);
  if (name === 'image') {
    let alt = 'Quill Cloud';
    let url = 'http://quilljs.com/0.20/assets/images/cloud.png';
    quill.insertEmbed(range.index + 1, 'image', { alt, url }, Quill.sources.USER);
  } else if (name === 'video') {
    let url = 'https://www.youtube.com/embed/QHH3iSeDBLo?showinfo=0';
    quill.insertEmbed(range.index + 1, 'video', url, Quill.sources.USER);
    quill.formatText(range.index + 1, 1, { height: '170', width: '400' });
  }
  quill.setSelection(range.index + 2, Quill.sources.SILENT);
};

const InlineBlotButton = ({ name, icon, onUpdate, bloc }) => (
  <div 
    className={classNames.bind(styles)({
      'blot-button': true,
    })}
    onClick={() => insertEmbed(bloc.textEditor, name)}
  >
    <i className="material-icons">{icon}</i>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(InlineBlotButton);