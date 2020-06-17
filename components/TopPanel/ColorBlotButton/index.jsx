import React from 'react';
import classNames from 'classnames/bind';
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

function toggleInline (quill, name) {
  quill.format('color', 'red');
};

const InlineBlotButton = ({ name, icon, onUpdate, bloc }) => (
  <div 
    className={classNames.bind(styles)({
      'blot-button': true,
    })}
    onClick={() => toggleInline(bloc.textEditor, name)}
  >
    <i className="material-icons">{icon}</i>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(InlineBlotButton);