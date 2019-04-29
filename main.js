var game = {
    money: 0,
    moneyPerClick: 1,
    prestigeCoins: 0,
    bonusPerPresCoin: 1,
    clickUpgradeCost: 10,
    clickAmountPerUpgrade: 1
};

var upgradeMenu = document.getElementById("upgradesMenu");
var updateguiint = setInterval("updateGui()", 20);

function init() {
    console.log("hi");
}

function updateGui() {
    document.getElementById("money").innerHTML = format(game.money);
}
function onClick() {
    upgradeMenu.style.display = "block";
    game.money += game.moneyPerClick;
}

function format(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function buyUpgrade(upgrade) {
    if(upgrade == "click") {   
        if(game.money >= game.clickUpgradeCost) {
            game.moneyPerClick += game.clickAmountPerUpgrade;
            game.money -= game.clickUpgradeCost;
            game.clickUpgradeCost *= 2;
        }
    }
}

init();