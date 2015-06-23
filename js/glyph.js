// Character wrapped with fg and bg color
Game.Glyph = function (props) {
    props = props || {};
    this._char = props['character'] || '?';
    this._foreground = props['foreground'] || 'white';
    this._background = props['background'] || 'black';
};

Game.Glyph.prototype.getChar = function () {
    return this._char;
};
Game.Glyph.prototype.getBackground = function () {
    return this._background;
};
Game.Glyph.prototype.getForeground = function () {
    return this._foreground;
};

