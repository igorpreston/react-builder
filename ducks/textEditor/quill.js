import Parchment from 'parchment';
import Quill from 'quill/core/quill';
import Block, { BlockEmbed } from 'quill/blots/block';
import Break from 'quill/blots/break';
import Container from 'quill/blots/container';
import Cursor from 'quill/blots/cursor';
import Embed from 'quill/blots/embed';
import Inline from 'quill/blots/inline';
import Scroll from 'quill/blots/scroll';
import TextBlot from 'quill/blots/text';

import Clipboard from 'quill/modules/clipboard';
import History from 'quill/modules/history';
import Keyboard from 'quill/modules/keyboard';

Quill.register({
  'blots/block'        : Block,
  'blots/block/embed'  : BlockEmbed,
  'blots/break'        : Break,
  'blots/container'    : Container,
  'blots/cursor'       : Cursor,
  'blots/embed'        : Embed,
  'blots/inline'       : Inline,
  'blots/scroll'       : Scroll,
  'blots/text'         : TextBlot,

  'modules/clipboard'  : Clipboard,
  'modules/history'    : History,
  'modules/keyboard'   : Keyboard
});

Parchment.register(Block, Break, Cursor, Inline, Scroll, TextBlot);

export default Quill;