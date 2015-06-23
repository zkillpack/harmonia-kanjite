// wrapper around tile array
Game.Map = function (tiles) {
    this._tiles = tiles;
    this._width = tiles.length;
    this._height = tiles[0].length;
};

Game.Map.prototype.getWidth = function () {
    return this._width;
};

Game.Map.prototype.getHeight = function () {
    return this._height;
};

Game.Map.prototype.getTile = function (x, y) {
    if (x < 0 || x >= this._width || y < 0 || y >= this._height) {
        return Game.Tile.nullTile;
    } else {
        return this._tiles[x][y] || Game.Tile.nullTile;
    }
};

Game.Map.prototype.getStartPos = function () {
    // Returns starting position that's walkable and within starting view bounds
    var x, y;
    do {
        x = Math.floor(Math.random() * this._width);
        y = Math.floor(Math.random() * this._height);
        console.log("loop")
    } while (this._tiles[x][y].isWalkable() === false);
    console.log("START: " + x, y);
    return {x: x, y: y}
};