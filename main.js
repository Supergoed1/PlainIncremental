var game = {
    money: 0,
    moneyPerClick: 1,
    moneyPerSec: 0,
    prestigeCoins: 0,
    bonusPerPresCoin: 1,
    clickUpgradeCost: 10,
    clickAmountPerUpgrade: 1,
    clickUpgradeAmountTillNextUpgrade: 0,
    perSecUpgradeCost: 25,
    perSecAmountPerUpgrade: 1,
    perSecUpgradeAmountTillNextUpgrade: 0,
    lastLoginDate: null
};

var upgradeMenu = document.getElementById("upgradesMenu");
var updateguiint = setInterval("updateGui()", 20);
var upgradeint = setInterval("update()", 50);
var everySec = setInterval(() => {
    game.money += getPrestigeBonus(game.moneyPerSec);
}, 1000);

function init() {
    if(localStorage.getItem("game") == null) {
        save();
    }
    load();
    var date1 = new Date(game.lastLoginDate);
    var date2 = new Date(Date.now());
    console.log(date1);
    console.log(date2);
    var secondBetweenTwoDate = Math.abs((date2.getTime() - date1.getTime()) / 1000);
    console.log
    console.log("Away for " + secondBetweenTwoDate + " seconds");
    console.log("Earned: " + (game.moneyPerSec * secondBetweenTwoDate))
    game.money += (game.moneyPerSec * secondBetweenTwoDate);
    console.log("Initialized");
}

function save() {
    localStorage.setItem("game", JSON.stringify(game));
    console.log("Data saved");
}

function load() {
    game = JSON.parse(localStorage.getItem("game"));
    console.log("Data loaded");
    
}

function updateGui() {
    document.getElementById("money").innerHTML = format(game.money);
    document.getElementById("presCoins").innerHTML = "Prestige Coins: " + game.prestigeCoins;
    document.getElementById("presBonus").innerHTML = "Prestige Bonus: " + game.prestigeCoins * game.bonusPerPresCoin + "%";
    document.getElementById("clickButton").innerHTML = "+" + format(getPrestigeBonus(game.moneyPerClick));
    document.getElementById("clickUpgrade").innerHTML = "+" + format(game.clickAmountPerUpgrade) + "/click <br> Cost: " + format(game.clickUpgradeCost);
    document.getElementById("perSecUpgrade").innerHTML = "+" + format(game.perSecAmountPerUpgrade) + "/sec <br> Cost: " + format(game.perSecUpgradeCost);
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
    return (num * (1 +  (game.prestigeCoins * game.bonusPerPresCoin / 100)));
}

function onClick() {
    game.money = game.money * 1 + getPrestigeBonus(game.moneyPerClick);
}

function prestige() {
    game.prestigeCoins += Math.round(Math.round(game.money / 50));
    game.money = 0;
    game.moneyPerClick = 1;
    game.moneyPerSec = 0;
    game.clickAmountPerUpgrade = 1;
    game.clickUpgradeAmountTillNextUpgrade = 0;
    game.clickUpgradeCost = 10;
    game.perSecAmountPerUpgrade = 1;
    game.perSecUpgradeAmountTillNextUpgrade = 0;
    game.perSecUpgradeCost = 25;
}

function format(number) {
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
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
    if(upgrade == "perSec") {   
        if(game.money >= game.perSecUpgradeCost) {
            game.moneyPerSec += game.perSecAmountPerUpgrade;
            game.money -= game.perSecUpgradeCost;
            game.perSecUpgradeAmountTillNextUpgrade += 1;
            if(game.perSecUpgradeAmountTillNextUpgrade >= 5) {
                game.perSecAmountPerUpgrade *= 2;
                game.perSecUpgradeAmountTillNextUpgrade = 0;
            }
            game.perSecUpgradeCost *= 1.50;
        }
    }
}
window.onbeforeunload = function (){
    game.lastLoginDate = new Date();
    save();
};

init();