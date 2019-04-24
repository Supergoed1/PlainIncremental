var game = {
    money: new Decimal(0),
    moneyPerClick: 1
};

function init() {

}

function click() {
    game.money.plus(game.moneyPerClick);
}