import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import RichTextBloc from 'app/components/Canvas/Blocs/RichTextBloc';
import styles from './styles';

const BaseBloc = (
  {
    bloc,
  },
  {
    canvasClassName,
    draggableClassName,
    selectableClassName,
    resizableClassName,
    dragHandlers,
    resizeHandlers,
    isSelected,
    onSelect,
    onDeselect,
  },
) => (
  <div
    id={bloc.id}
    className={classNames.bind(styles)({
      'base-bloc': true,
      [selectableClassName]: selectableClassName,
      [canvasClassName]: canvasClassName,
      [draggableClassName]: draggableClassName,
      [resizableClassName]: resizableClassName,
      'base-bloc--selected': isSelected,
    })}
    style={{
      top: bloc.styles.top,
      left: bloc.styles.left + '%',
      width: bloc.styles.width + '%',
      height: bloc.styles.height,
    }}
    onClick={isSelected ? onDeselect : onSelect}
  >
    {bloc.name === 'Rich Text' ?
      <RichTextBloc
        id={bloc.id}
      />
    : null}
    {dragHandlers}
    {resizeHandlers}
  </div>
);

BaseBloc.contextTypes = {
  canvasClassName: PropTypes.string,
  draggableClassName: PropTypes.string,
  selectableClassName: PropTypes.string,
  resizableClassName: PropTypes.string,
  isSelected: PropTypes.bool,
  dragHandlers: PropTypes.object,
  resizeHandlers: PropTypes.object,
  onSelect: PropTypes.func,
  onDeselect: PropTypes.func,
};

export default BaseBloc;
