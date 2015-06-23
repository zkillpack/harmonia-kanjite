/**
 * Created by Dakota on 5/17/2015.
 */


var Game = {
    _width: 80,
    _height: 25,
    _display: null,
    _currentScreen: null,
    init: function () {
        // TODO INIT SHIT
        this._display = new ROT.Display({width: this._width, height: this._height});
        var game = this;
        // adds callback to current screen: window listens and passes it down
        var bindEventToScreen = function (e1) {
            window.addEventListener(e1, function (e2) {
                if (game._currentScreen !== null) {
                    game._currentScreen.handleInput(e1, e2);
                    game._display.clear();
                    game._currentScreen.render(game._display);
                }
            });
        };

        bindEventToScreen('keydown');
        bindEventToScreen('keyup');
        bindEventToScreen('keypress');

        Game.Music.init();
    },
    getDisplay: function () {
        return this._display;
    },
    getWidth: function () {
        return this._width;
    },
    getHeight: function () {
        return this._height;
    },

    switchScreen: function (screen) {
        // exit us, clear, enter other, render
        if (this._currentScreen !== null) {
            this._currentScreen.exit();
        }
        this.getDisplay().clear();
        this._currentScreen = screen;
        if (!this._currentScreen !== null) {
            this._currentScreen.enter();
            this._currentScreen.render(this._display);
        }
    }
};

window.onload = function () {
    Game.init();
    document.body.appendChild(Game.getDisplay().getContainer());
    Game.switchScreen(Game.Screen.startScreen);
};