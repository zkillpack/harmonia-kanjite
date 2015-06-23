/**
 * Created by Dakota on 5/17/2015.
 */

/* INTERFACE:
 enter : function(){},
 exit : function(){},
 render : function(display){},
 handleInput : function(inputType, inputData){}
 */

Game.Screen = {};

Game.Screen.startScreen = {
    pos: 2,
    enter: function () {
        console.log("Enter start screen");
    },
    exit: function () {
        console.log("Exit start screen");
    },
    render: function (display) {
        console.log(display);
        display.drawText(1, 1, "%c{steelblue}" + "Harmonia: Kanjite~");
        display.drawText(1, this.pos, (this.pos > 5 ?
            "Press ENTER to continue... (actually press 1)" : "Press ENTER to continue..."));
    },
    handleInput: function (inputType, inputData) {
        if (inputType === 'keydown') {
            if (inputData.keyCode === ROT.VK_RETURN) {
                this.pos += 1;
                Game.Music.drone.frequency.value = Math.round(this.pos * 55);
                Game.switchScreen(Game.Screen.startScreen);
            } else if (inputData.keyCode === ROT.VK_1) {
                Game.switchScreen(Game.Screen.playScreen);
            }
        }
    }
};

Game.Screen.playScreen = {
    _map: null,
    _player: null,
    move: function (dx, dy) {
        var newX = this._player.getX() + dx;
        var newY = this._player.getY() + dy;
        this._player.tryMove(newX, newY, this._map);
    },
    enter: function () {
        console.log("Enter gameplay screen");
        var W = Game.getWidth()// * 2;
        var H = Game.getHeight()// * 8;
        var map = [];
        for (var x = 0; x < W; x++) {
            map.push([]);
            for (var y = 0; y < H; y++) {
                map[x].push(Game.Tile.nullTile);
            }
        }

        var generator = new ROT.Map.Uniform(W, H);
        generator.create(function (x, y, v) {
            if (v === 0) {
                map[x][y] = Game.Tile.floorTile;
            } else {
                map[x][y] = Game.Tile.wallTile;
            }

        });
        console.log(generator.getRooms());
        this._map = new Game.Map(map);
        // init player object
        this._player = new Game.Entity(Game.PlayerTemplate);
        var start = this._map.getStartPos();
        this._player.setX(start.x);
        this._player.setY(start.y);

    },
    exit: function () {
        console.log("Exit gameplay screen");
    },
    render: function (display) {
        // screen dimensions
        var W = Game.getWidth();
        var H = Game.getHeight();

        // map scroll bounds
        var topLeftX = Math.min(
            Math.max(0, this._player.getX() - Math.round(W / 2)),
            this._map.getWidth() - W);
        var topLeftY = Math.min(
            Math.max(0, this._player.getY() - Math.round(H / 2)),
            this._map.getHeight() - H);


        //console.log("TOP LEFT: ", topLeftX, topLeftY);
        //console.log("CENTER: ", this._centerX, this._centerY);

        // render map
        for (var x = topLeftX; x < topLeftX + W; x++) {
            for (var y = topLeftY; y < topLeftY + H; y++) {
                var tile = this._map.getTile(x, y);
                display.draw(x - topLeftX, y - topLeftY,
                    tile.getChar(),
                    tile.getForeground(),
                    tile.getBackground());
            }
        }

        // render PC
        display.draw(
            this._player.getX() - topLeftX,
            this._player.getY() - topLeftY,
            this._player.getChar(),
            this._player.getForeground(),
            this._player.getBackground()
        );
        //display.drawText(3, 4, "%c{red}Now you are playing things. 1 win; 2 lose?")
    },
    handleInput: function (inputType, inputData) {
        if (inputType === 'keydown') {

            // debug win cheats
            if (inputData.keyCode === ROT.VK_1) {
                Game.switchScreen(Game.Screen.winScreen);

            } else if (inputData.keyCode === ROT.VK_2) {
                Game.switchScreen(Game.Screen.loseScreen);

            }

            // MOVEMENT
            if (inputData.keyCode === ROT.VK_LEFT) {
                this.move(-1, 0);
            } else if (inputData.keyCode === ROT.VK_RIGHT) {
                this.move(1, 0);
            } else if (inputData.keyCode === ROT.VK_UP) {
                this.move(0, -1);
            } else if (inputData.keyCode === ROT.VK_DOWN) {
                this.move(0, 1);
            }

        }
    }
};


Game.Screen.winScreen = {
    enter: function () {
        console.log("Enter win screen");
        Game.Music.drone.frequency.value = Math.round(550);
        window.setInterval(function () {
            Game.Music.drone.frequency.value = Math.round(225 + Math.random() * 225) * 2;
            var max = Math.round(Math.random() * 14) + 1;
            var hei = Math.round(Math.random() * 8) + 1;
            var wid = Math.round(Math.random() * 60) + 2;
            for (var i = 0; i < max; i++) {
                // Generate random background colors
                var r = Math.round(Math.random() * 255);
                var g = Math.round(Math.random() * 255);
                var b = Math.round(Math.random() * 255);
                var background = ROT.Color.toRGB([r, g, b]);
                Game._display.drawText(wid, i + hei, "%b{" + background + "}You win!");
            }


        }, 250)
    },
    exit: function () {
        console.log("Exit win screen");
    },
    render: function (display) {
        for (var i = 0; i < 22; i++) {
            // Generate random background colors
            var r = Math.round(Math.random() * 255);
            var g = Math.round(Math.random() * 255);
            var b = Math.round(Math.random() * 255);
            var background = ROT.Color.toRGB([r, g, b]);
            display.drawText(2, i + 1, "%b{" + background + "}You win!");
        }

    },
    handleInput: function (inputType, inputData) {
    }
};


Game.Screen.loseScreen = {
    enter: function () {
        console.log("Enter lose screen");
    },
    exit: function () {
        console.log("Exit lose screen");
    },
    render: function (display) {
        for (var i = 0; i < 22; i++) {
            display.drawText(2, i + 1, "%b{red}You lose! :(");
        }
    },
    handleInput: function (inputType, inputData) {
    }
};