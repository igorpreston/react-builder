import Parchment from 'parchment';

class BoldAttributor extends Parchment.Attributor.Style {}
class ItalicAttributor extends Parchment.Attributor.Style {}
class UnderlineAttributor extends Parchment.Attributor.Style {}
class StrikeAttributor extends Parchment.Attributor.Style {}

export const Bold = new BoldAttributor('bold', 'font-weight', {
  scope: Parchment.Scope.INLINE
});

export const Italic = new ItalicAttributor('italic', 'font-style', {
  scope: Parchment.Scope.INLINE
});

export const Underline = new UnderlineAttributor('underline', 'text-decoration', {
  scope: Parchment.Scope.INLINE
});

export const Strike = new StrikeAttributor('strike', 'text-decoration', {
  scope: Parchment.Scope.INLINE
});