var game = {
    money: new Decimal(0),
    moneyPerClick: new Decimal(1)
};

function init() {
    console.log("hi");
}

function onClick() {
    game.money = game.money.plus(moneyPerClick);
    console.log(game.money.toString());
}




init();