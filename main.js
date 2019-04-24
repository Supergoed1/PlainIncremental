var game = {
    money: new Decimal(1),
    moneyPerClick: new Decimal(1)
};

function init() {
    console.log("hi");
}

function test() {
    game.money = game.money.plus(moneyPerClick);
    console.log(game.money.toString());
}




init();