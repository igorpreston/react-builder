import Quill from './quill';
import * as Blots from './blots';

Quill.register({
  'formats/bold': Blots.Bold,
  'formats/italic': Blots.Italic,
  'formats/underline': Blots.Underline,
  'formats/strike': Blots.Strike,
  'formats/align': Blots.AlignStyle,
  'formats/font': Blots.FontStyle,
  'formats/size': Blots.SizeStyle,
  'formats/background': Blots.BackgroundStyle,
  'formats/color': Blots.ColorStyle,
  'formats/link': Blots.Link,
  'formats/image': Blots.Image,
  'formats/video': Blots.Video,
  'formats/indent': Blots.Indent,
});

export default Quill;

// TYPES

export const TEXT_EDITOR_INIT = 'TEXT_EDITOR/INIT';
export const TEXT_EDITOR_SELECTION_CHANGE = 'TEXT_EDITOR/SELECTION_CHANGE';
export const TEXT_EDITOR_CONTENT_CHANGE = 'TEXT_EDITOR/CONTENT_CHANGE';

// ACTIONS

export const textEditorInit = (id, editor) => ({
  type: TEXT_EDITOR_INIT,
  payload: { id, editor },
});

export const textEditorSelectionChange = (id, newSelection, oldSelection) => ({
  type: TEXT_EDITOR_SELECTION_CHANGE,
  payload: { id, newSelection, oldSelection },
});

export const textEditorContentChange = (id, newContent, oldContent) => ({
  type: TEXT_EDITOR_CONTENT_CHANGE,
  payload: { id, newContent, oldContent },
});