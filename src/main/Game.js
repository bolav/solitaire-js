function Game() {
    this.scene = SCENES.IN_GAME;
}

const SCENES = {
    LOADING: 'loading',
    MENU: 'menu-scene',
    SETTINGS: 'settings',
    IN_GAME: 'in-game'
}

const GAMES = {
    KLONDIKE: 'klondike',
    FREECELL: 'freecell',
    SPIDER: 'spider',
    PYRAMID: 'pyramid'
}

const FPS = 60;

var time = null;
var currentTime = null;

Game.prototype.start = function () {
    Solitaire.init();
    Solitaire.newGame(GAMES.KLONDIKE);
    Solitaire.mainLoop();
}

Game.prototype.init = function () {
    time = new Date().getTime();
    loadAssets();
    Dimension.calculateAll();
}

Game.prototype.newGame = function (type) {
    if (type == GAMES.KLONDIKE) {
        Solitaire.gameWorld = new Klondike();
    } else if (type == GAMES.FREECELL) {

    }
}

Game.prototype.mainLoop = function () {
    currentTime = new Date().getTime();
    var milliseconds = currentTime - time;
    if (milliseconds >= 1000 / FPS) {
        time = currentTime;
        if (loading < maxLoading) {
            Solitaire.render(SCENES.LOADING);
        } else {
            if (Solitaire.scene == SCENES.IN_GAME) {
                Solitaire.gameWorld.play();
                Solitaire.gameWorld.update();
                Solitaire.gameWorld.render();
            }
        }
    }

    requestAnimationFrame(Solitaire.mainLoop);
}

Game.prototype.render = function (scene) {
    if (scene == SCENES.LOADING) {
        Canvas.fill(COLORS.BACKGROUND.DARK_GREEN);
        Canvas.drawText("Loading", new Vector2(Canvas.width / 2, Canvas.height / 2), 200, COLORS.BACKGROUND.LIGHT_GRAY, TEXT_ALIGN.VERTICAL.CENTER, TEXT_ALIGN.HORIZONTAL.BOTTOM);
        var offset = Canvas.width / 300;
        Canvas.drawRect(new Vector2(Canvas.width / 3, Canvas.height * 0.55), Canvas.width / 3, Canvas.height / 15, COLORS.BACKGROUND.BLACK);
        Canvas.drawRect(new Vector2(Canvas.width / 3, Canvas.height * 0.55), (loading / maxLoading) * Canvas.width / 3, Canvas.height / 15, COLORS.BACKGROUND.LIGHT_GREEN);
    }
}

let Solitaire = new Game();