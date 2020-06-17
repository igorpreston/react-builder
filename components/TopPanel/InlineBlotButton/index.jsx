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

function toggleInline (quill, name, value) {
  console.log(value);
  quill.format(name, value || true);
  console.log(quill.format(name, value || true))
};

const InlineBlotButton = ({ name, icon, onUpdate, bloc, value }) => (
  <div 
    className={classNames.bind(styles)({
      'blot-button': true,
    })}
    onClick={() => toggleInline(bloc.textEditor, name, value)}
  >
    <i className="material-icons">{icon}</i>
  </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(InlineBlotButton);