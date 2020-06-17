import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import TypographyHeader from './TypographyHeader';
import TypographyRow from './TypographyRow';
import TypographyFont from './TypographyFont';
import TypographySize from './TypographySize';
import TypographyFormat from './TypographyFormat';
import TypographyAlign from './TypographyAlign';
import TypographyIndent from './TypographyIndent';
import TypographyColor from './TypographyColor';
import TypographyInsert from './TypographyInsert';
import { getAreAllBlocsOfTypeRichText, getIsSingleBlocSelected } from 'app/ducks/canvas/selected'
import styles from './styles';

const mapStateToProps = state => ({
  isRichTextBloc: getAreAllBlocsOfTypeRichText(state),
  isSingleSelected: getIsSingleBlocSelected(state),
});

const TypographySection = ({ isRichTextBloc, isSingleSelected }) => isSingleSelected && isRichTextBloc ? (
  <div
    className={classNames.bind(styles)({
      'design__typography': true,
    })}
  >
    <TypographyHeader />
    <TypographyRow>
      <TypographyFont />
      <TypographySize />
    </TypographyRow>
    <TypographyRow>
      <TypographyFormat />
      <TypographyInsert />
    </TypographyRow>
    <TypographyRow>
      <TypographyAlign />
      <TypographyIndent />
      <TypographyColor />
    </TypographyRow>
  </div>
) : null;

const TypographySectionContainer = connect(
  mapStateToProps,
)(TypographySection);

export default connect(mapStateToProps)(TypographySection);