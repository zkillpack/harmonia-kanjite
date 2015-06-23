// Entity = Glyph wrapper with name/position info and behavior mixins
Game.Entity = function (props) {
    props = props || {};
    Game.Glyph.call(this, props);
    this._name = props['name'] || '';
    this._x = props['x'] || 0;
    this._y = props['y'] || 0;

    this._attachedMixins = {};
    var mixins = props['mixins'] || [];
    // copy mixin properties to us IF WE DON'T ALREADY HAVE
    // attach record of it, and call initializer if there exists one
    for (var i = 0; i < mixins.length; i++) {
        for (var key in mixins[i]) {
            if (key != 'init' && key != 'name' && !this.hasOwnProperty(key)) {
                this[key] = mixins[i][key];
            }
        }

        this._attachedMixins[mixins[i].name] = true;

        if (mixins[i].init) {
            mixins[i].init.call(this, props)
        }
    }
};

Game.Entity.extend(Game.Glyph);

Game.Entity.prototype.setName = function (name) {
    this._name = name;
};
Game.Entity.prototype.setX = function (x) {
    this._x = x;
};
Game.Entity.prototype.setY = function (y) {
    this._y = y;
};
Game.Entity.prototype.getName = function () {
    return this._name;
};
Game.Entity.prototype.getX = function () {
    return this._x;
};
Game.Entity.prototype.getY = function () {
    return this._y;
};

Game.Entity.prototype.hasMixin = function (mix) {
    if (typeof mix === 'object') {
        return this._attachedMixins[mix.name];
    } else {
        return this._attachedMixins[name];
    }
};
