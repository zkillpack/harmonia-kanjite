/**
 * Created by Dakota on 5/19/2015.
 */
// Tile = Glyph (char+colors) wrapped with interaction info


Game.Tile = function (props) {
    props = props || {};
    Game.Glyph.call(this, props);
    this._isWalkable = props['isWalkable'] || false;
    this._isDiggable = props['isDiggable'] || false;
};

Game.Tile.extend(Game.Glyph);

Game.Tile.prototype.isWalkable = function () {
    return this._isWalkable;
};

Game.Tile.prototype.isDiggable = function () {
    return this._isDiggable;
};

Game.Tile.wallColor = 'steelblue';

Game.Tile.nullTile = new Game.Tile({});
Game.Tile.floorTile = new Game.Tile({character: '.', isWalkable: true});
Game.Tile.wallTile = new Game.Tile({character: '#', isWalkable: false, foreground: Game.Tile.wallColor});