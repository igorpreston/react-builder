import React, { Component } from 'react';
import classNames from 'classnames/bind';
import ModalHeader from '../ModalHeader';
import LinkUrl from './LinkUrl';
import LinkPage from './LinkPage';
import LinkSection from './LinkSection';
import LinkCall from './LinkCall';
import LinkEmail from './LinkEmail';
import styles from './styles';

const linkTypes = [
  { name: 'url', icon: 'public' },
  { name: 'page', icon: 'cloud' },
  { name: 'section', icon: 'web' },
  { name: 'call', icon: 'call' },
  { name: 'email', icon: 'email' },
];

class EditorLinkModal extends Component {
  constructor(props, context) {
    super(props, context);
  }

  state = {
    type: 'url',
  };

  changeType = type => this.setState({ type });

  render() {
    const { type } = this.state;

    return (
      <div
        className={classNames.bind(styles)({
          'modal__editor-link': true,
        })}
      >
        <ModalHeader title="Link" />
        <div
          className={classNames.bind(styles)({
            'modal__editor-link__content': true,
          })}
        >
          <div
            className={classNames.bind(styles)({
              'modal__editor-link__type': true,
            })}
          >
            {linkTypes.map(type =>
              <div
                key={type.name}
                className={classNames.bind(styles)({
                  'modal__editor-link__type__button': true,
                })}
                onClick={() => this.changeType(type.name)}
              >
                <i className="material-icons md-18">{type.icon}</i>
              </div>
            )}
          </div>
          {type === 'url' ? <LinkUrl /> : null}
          {type === 'page' ? <LinkPage /> : null}
          {type === 'section' ? <LinkSection /> : null}
          {type === 'call' ? <LinkCall /> : null}
          {type === 'email' ? <LinkEmail /> : null}
        </div>
      </div>
    );
  }
};

export default EditorLinkModal;