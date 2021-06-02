var game = {
    dataversion: 0.1,
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
    offlineTimeCost: 1000,
    maxOfflineTime: 0.5,
    prestigeBonusUpgradeCost: 500
};
var market = {
    appleprice: 10,
    apples: 0
}

var dataversion = 0.1;

var defaultGame = game;

var upgradeMenu = document.getElementById("upgradesMenu");
var updateguiint = setInterval("updateGui()", 20);
var upgradeint = setInterval("update()", 50);

//DOM elements
var moneyDOM = document.getElementById("money");
var presBonusDOM = document.getElementById("presBonus");
var clickButtonDOM = document.getElementById("clickButton");
var clickUpgradeDOM = document.getElementById("clickUpgrade");
var perSecUpgradeDOM = document.getElementById("perSecUpgrade");
var offlineTimeUpgradeDOM = document.getElementById("offlineTimeUpgrade");
var apriceDOM = document.getElementById("aprice");
var aamountDOM = document.getElementById("aamount");
var moneyPsDisplayDOM = document.getElementById("moneyPsDisplay");

function init() {
    if(localStorage.getItem("game") == null || localStorage.getItem("market") == null) {
        save();
    }
    load();
    if(game.dataversion == undefined || game.dataversion < dataversion) {
        reset();
    }
    //Calculate offline time
    var date1 = new Date(game.lastLoginDate);
    var date2 = new Date(Date.now());
    var secondBetweenTwoDate = Math.round(Math.abs((date2.getTime() - date1.getTime()) / 1000));
    if(secondBetweenTwoDate >= game.maxOfflineTime * 3600) {
        secondBetweenTwoDate = game.maxOfflineTime * 3600
    }
    alert("Away for " + secondBetweenTwoDate + "/" + game.maxOfflineTime * 3600 + " seconds" + "   You Earned: " + (game.moneyPerSec * secondBetweenTwoDate));
    game.money += (game.moneyPerSec * secondBetweenTwoDate);
    //Setup intervals
    setInterval(() => {
        game.money += (getPrestigeBonus(game.moneyPerSec) / 100);
    }, 10) //Money gain interval
    setInterval(() => {
        market.appleprice += getRandomInt(-1,1);
        if(market.appleprice <= 0) {
            market.appleprice = 1;
        }
    }, 2000) //Market price change interval
    console.log("Initialized");
}

function reset() {
    game = defaultGame;
}

function save() {
    localStorage.setItem("game", JSON.stringify(game));
    localStorage.setItem("market", JSON.stringify(market));
    console.log("Data saved");
}

function load() {
    game = JSON.parse(localStorage.getItem("game"));
    market = JSON.parse(localStorage.getItem("market"));
    console.log("Data loaded");
}

function updateGui() {
    moneyDOM.innerText = format(game.money);
    presBonusDOM.innerText = "Prestige Bonus: " + game.prestigeCoins * game.bonusPerPresCoin + "%";
    clickButtonDOM.innerText = "+" + format(getPrestigeBonus(game.moneyPerClick));
    clickUpgradeDOM.innerHTML = "+" + format(game.clickAmountPerUpgrade) + "/click <br> Cost: " + format(game.clickUpgradeCost);
    perSecUpgradeDOM.innerHTML = "+" + format(game.perSecAmountPerUpgrade) + "/per sec <br> Cost: " + format(game.perSecUpgradeCost);
    offlineTimeUpgradeDOM.innerHTML = "+0.5 hours offline time <br> Cost: " + format(game.offlineTimeCost);
    apriceDOM.innerText = "Apple Price: " + format(market.appleprice);
    aamountDOM.innerText = "Apples: " + market.apples;
    moneyPsDisplayDOM.innerText = "+" + format(getPrestigeBonus(game.moneyPerSec)) + "/s";
}

function update() {
    if(game.money == undefined || Number.isNaN(game.money)) {
        alert("Money glitched resetting to 1. Sorry for the inconvenience");
        game.money = 1;
    }
}

function toggleVisibility(element) {
    if(element.style.visibility == "hidden") {
        element.style.visibility = "visible";
    } else {
        element.style.visibility = "hidden";
    }
}

function buyMarket(type) {
    if(type == "apple") {
        var amounttobuy = parseInt(document.getElementById("applebuyamount").value);
        var cost = amounttobuy * market.appleprice;
        if(game.money < cost) return;
        game.money -= cost;
        market.apples += amounttobuy;
        console.log(market.apples);
    }
}

function sellMarket(type) {
    if(type == "apple") {
        var amounttosell = parseInt(document.getElementById("applesellamount").value);
        var appleearn = amounttosell * market.appleprice;
        if(market.apples < amounttosell) return;
        market.apples -= amounttosell;
        game.money += appleearn;
        console.log(market.apples);
    }
}

function getPrestigeBonus(num) {
    return (num * (1 + (game.prestigeCoins * game.bonusPerPresCoin / 100)));
}

function onClick() {
    game.money = game.money + getPrestigeBonus(game.moneyPerClick);
}

function prestige() {
    var bonus = Math.round(game.money / 100);
    var newBonus = game.prestigeCoins + bonus;
    if(confirm("If you prestige now you will have a prestige bonus of " + newBonus + "% (+" + bonus + "%)") == false) {
        return;
    }
    document.getElementById("applesellamount").value = market.apples;
    for(var i = 0; i < market.apples; i++) {
        sellMarket("apple");
    }
    document.getElementById("applesellamount").value = 1;

    game.prestigeCoins += Math.round(Math.round(game.money / 100));
    game.money = 0;
    game.moneyPerClick = 1;
    game.moneyPerSec = 0;
    game.clickAmountPerUpgrade = 1;
    game.clickUpgradeAmountTillNextUpgrade = 0;
    game.clickUpgradeCost = 10;
    game.perSecAmountPerUpgrade = 1;
    game.perSecUpgradeAmountTillNextUpgrade = 0;
    game.perSecUpgradeCost = 25;
    game.offlineTimeCost = 1000;
    game.maxOfflineTime = 0.5;
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
    if(upgrade == "offlineTime") {
        if(game.money >= game.offlineTimeCost) {
            game.maxOfflineTime += 0.5;
            game.money -= game.offlineTimeCost;
            game.offlineTimeCost *= 4;
        }
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
window.onbeforeunload = function (){
    game.lastLoginDate = new Date();
    save();
};

init();
