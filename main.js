var game = {
    money: 0,
    moneyPerClick: 1,
    prestigeCoins: 0,
    bonusPerPresCoin: 1,
    clickUpgradeCost: 10,
    clickAmountPerUpgrade: 1,
    clickUpgradeAmountTillNextUpgrade: 0
};

var upgradeMenu = document.getElementById("upgradesMenu");
var updateguiint = setInterval("updateGui()", 20);
var upgradeint = setInterval("update()", 50);

function init() {
    console.log("hi");
}

function updateGui() {
    document.getElementById("money").innerHTML = format(game.money);
    document.getElementById("presCoins").innerHTML = "Prestige Coins: " + game.prestigeCoins;
    document.getElementById("presBonus").innerHTML = "Prestige Bonus: " + game.prestigeCoins * bonusPerPresCoin / 100;
    document.getElementById("clickButton").innerHTML = "+" + format(getPrestigeBonus(game.moneyPerClick));
    document.getElementById("clickUpgrade").innerHTML = "+" + format(game.clickAmountPerUpgrade) + "/per click <br> Cost: " + format(game.clickUpgradeCost);
}

function update() {
}

function toggleVisibility(element) {
    if(element.style.visibility == "hidden") {
        element.style.visibility = "visible";
    } else{
        element.style.visibility = "hidden";
    }
}

function getPrestigeBonus(num) {
    if(game.prestigeCoins <= 100) {
        return (num * 1 + (game.prestigeCoins * game.bonusPerPresCoin / 100));
    } else {
        return (num * (game.prestigeCoins * game.bonusPerPresCoin / 100));
    }
}

function onClick() {
    if(game.prestigeCoins <= 100) {
        game.money = game.money + (game.moneyPerClick * 1 + (game.prestigeCoins * game.bonusPerPresCoin / 100));
    } else {
        game.money = game.money + (game.moneyPerClick * (game.prestigeCoins * game.bonusPerPresCoin / 100));
    }
}

function prestige() {
    game.prestigeCoins += Math.round(Math.round(game.money / 10));
    game.money = 0;
    game.moneyPerClick = 1;
    game.clickAmountPerUpgrade = 1;
    game.clickUpgradeAmountTillNextUpgrade = 0;
    game.clickUpgradeCost = 10;
}

function format(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function buyUpgrade(upgrade) {
    if(upgrade == "click") {   
        if(game.money >= game.clickUpgradeCost) {
            game.moneyPerClick += game.clickAmountPerUpgrade;
            game.money -= game.clickUpgradeCost;
            game.clickUpgradeAmountTillNextUpgrade += 1;
            if(game.clickUpgradeAmountTillNextUpgrade >= 5) {
                game.clickAmountPerUpgrade *= 2;
                game.clickUpgradeAmountTillNextUpgrade = 0;
            }
            game.clickUpgradeCost *= 1.50;
        }
    }
}

init();