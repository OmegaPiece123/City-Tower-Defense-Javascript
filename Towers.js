/*global infoS1 infoBox getTower displayHUD OffensiveTower ProductionTower  spawnTower addToQueue vehicleCount player preLoad InsertTower tower1 OffensiveTower cleanImages images dirtyImages updateRoad SPEEDVH numRoadEnd numVehicles City updateRoad STARTING_ENERGY STARTING_MONEY initializeHUD player gameScreen mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid TEST TESTsrc TESTclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/
//UPGRADE TYPES
function upgradeDamage(x, y)
{
  var index = getTower(x, y) ;
  var towerObject = player.towerArray[index] ;
  if(towerObject != null)
  {
    if(towerObject.source.indexOf("offensive") >= 0 && player.money >= parseInt(towerObject.cost*.25))
    {
      player.money -= parseInt(towerObject.cost*.25) ;
      towerObject.cost += parseInt(towerObject.cost*.25) ;
      towerObject.damage += parseInt(towerObject.damage*.15) ;
      towerObject.sell += parseInt(towerObject.sell+.2) ;
      displayHUD() ;
    }
    else if(player.money < parseInt(towerObject.cost*.25))
      alert("Insufficient Funds!");
    else
      alert("Invalid Upgrade!");
  }
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}

// function upgradeFireRate(x, y)
// {
//   var index = getTower(x, y) ;
//   var towerObject = player.towerArray[index] ;
//   if(towerObject != null)
//   {
//     if(towerObject.source.indexOf("offensive") >= 0 && player.money >= parseInt(towerObject.cost*.2))
//     {
//       player.money -= parseInt(towerObject.cost*.2) ;
//       towerObject.cost += parseInt(towerObject.cost*.2) ;
//       towerObject.rate += parseInt(towerObject.rate*.15) ;
//       towerObject.sell += parseInt(towerObject.sell+.15) ;
//       displayHUD() ;
//     }
//     else if(player.money < parseInt(towerObject.cost*.2))
//       alert("Insufficient Funds!");
//   }
//   shopMenu.reloadShop(changeableGrid[x][y],x,y);
// }

function upgradeProduction(x, y)
{
  var index = getTower(x, y) ;
  var towerObject = player.towerArray[index] ;
  if(towerObject != null)
  {
    if(towerObject.source.indexOf("production") >= 0 && player.money >= parseInt(towerObject.cost*.75))
    {
      player.money -= parseInt(towerObject.cost*.75) ;
      towerObject.cost += parseInt(towerObject.cost*.75) ;
      towerObject.rate += parseInt(towerObject.damage*.5) ;
      towerObject.sell += parseInt(towerObject.sell+.5) ;
      displayHUD() ;
    }
    else if(player.money < parseInt(towerObject.cost*.75))
      alert("Insufficient Funds!");
    else
      alert("Invalid Upgrade!");
  }
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function upgradeRange(x, y)
{
  var index = getTower(x, y) ;
  var towerObject = player.towerArray[index] ;
  if(towerObject != null)
  {
    if(towerObject.source.indexOf("offensive") >= 0 && player.money >= parseInt(towerObject.cost*.65))
    {
      player.money -= parseInt(towerObject.cost*.65) ;
      towerObject.cost += parseInt(towerObject.cost*.65) ;
      towerObject.range += 1 ;
      towerObject.sell += parseInt(towerObject.sell+.2) ;
      towerObject.lowerLims = towerObject.getLowerLims() ;
    	towerObject.upperLims = towerObject.getUpperLims() ;
    	towerObject.roadInRange = towerObject.getRoadRange() ;
      displayHUD() ;
    }
    else if(player.money < parseInt(towerObject.cost*.65))
      alert("Insufficient Funds!");
    else
      alert("Invalid Upgrade!");
  }
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}

//PRODUCTION TOWERS
//ProductionTower(rate, cost, sell, coordX, coordY, type, terrainType, cityObject)
function makeHydroPower(x, y)
{
      var hydro = new ProductionTower(5, 2000, x, y, "hydro", "water"/*, player*/) ;
  if(!changeableGrid[x][y].containsTower && player.money >= hydro.cost)
  {
    if(changeableGrid[x][y].type == "water")
    {
      player.energyRate += hydro.rate ;
      spawnTower(x, y, hydro) ;
      player.money -= hydro.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(hydro.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeSolarPower(x, y)
{
      var solar = new ProductionTower(3, 1750, x, y, "solar", "grass"/*, player*/) ;
  if(!changeableGrid[x][y].containsTower && player.money >= solar.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      player.energyRate += solar.rate ;
      spawnTower(x, y, solar) ;
      player.money -= solar.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(solar.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeOilPower(x, y)
{
      var oil = new ProductionTower(15, 4500, x, y, "oil", "oil"/*, player*/) ;
  if(!changeableGrid[x][y].containsTower && player.money >= oil.cost && player.cleanliness > 5)
  {
    if(changeableGrid[x][y].type == "oil")
    {
      player.energyRate += oil.rate ;
      spawnTower(x, y, oil) ;
      player.money -= oil.cost ;
      player.cleanliness -= 5 ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(oil.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeNuclearPower(x, y)
{
      var nuclear = new ProductionTower(30, 8500, x, y, "nuclear", "grass"/*, player*/) ;
  if(!changeableGrid[x][y].containsTower && player.money >= nuclear.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      player.energyRate += nuclear.rate ;
      spawnTower(x, y, nuclear) ;
      player.money -= nuclear.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(nuclear.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}


//DEFENSIVE TOWERS
//ref: (cost, range, damage, rate, efficiency, coordX, coordY, type, terrainType)
function makeSprinklerOne(x, y)
{
      var sprinkler = new OffensiveTower(200, 1, 5, 2, 1, x, y, "sprinklerI", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= sprinkler.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, sprinkler) ;
      player.money -= sprinkler.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(sprinkler.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeWaterTowerOne(x, y)
{
      var waterTower = new OffensiveTower(700, 1, 20, 3, 3, x, y, "waterTowerI", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= waterTower.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, waterTower) ;
      player.money -= waterTower.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(waterTower.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeFireHydrantOne(x, y)
{
      var fireHydrant = new OffensiveTower(1400, 3, 50, 4, 8, x, y, "fireHydrantI", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= fireHydrant.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, fireHydrant) ;
      player.money -= fireHydrant.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(fireHydrant.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeMechGeyserOne(x, y)
{
      var geyser = new OffensiveTower(2200, 2, 100, 1, 15, x, y, "geyserI", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= geyser.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, geyser) ;
      player.money -= geyser.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(geyser.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}

//MAKE STATS BETTER
function makeSprinklerTwo(x, y)
{
      var sprinkler = new OffensiveTower(375, 1, 10, 2, 2, x, y, "sprinklerII", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= sprinkler.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, sprinkler) ;
      player.money -= sprinkler.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(sprinkler.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeWaterTowerTwo(x, y)
{
      var waterTower = new OffensiveTower(1350, 1, 35, 3, 4, x, y, "waterTowerII", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= waterTower.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, waterTower) ;
      player.money -= waterTower.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(waterTower.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeFireHydrantTwo(x, y)
{
      var fireHydrant = new OffensiveTower(2600, 3, 90, 4, 17, x, y, "fireHydrantII", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= fireHydrant.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, fireHydrant) ;
      player.money -= fireHydrant.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(fireHydrant.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeMechGeyserTwo(x, y)
{
      var geyser = new OffensiveTower(2400, 2, 175, 1, 29, x, y, "geyserII", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= geyser.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, geyser) ;
      player.money -= geyser.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(geyser.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}

//MAKE STATS EVEN BETTER
function makeSprinklerThree(x, y)
{
      var sprinkler = new OffensiveTower(700, 1, 15, 2, 3, x, y, "sprinklerIII", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= sprinkler.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, sprinkler) ;
      player.money -= sprinkler.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(sprinkler.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeWaterTowerThree(x, y)
{
      var waterTower = new OffensiveTower(2600, 1, 65, 3, 8, x, y, "waterTowerIII", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= waterTower.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, waterTower) ;
      player.money -= waterTower.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(waterTower.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeFireHydrantThree(x, y)
{
      var fireHydrant = new OffensiveTower(4000, 3, 160, 4, 29, x, y, "fireHydrantIII", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= fireHydrant.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, fireHydrant) ;
      player.money -= fireHydrant.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(fireHydrant.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
function makeMechGeyserThree(x, y)
{
      var geyser = new OffensiveTower(5000, 2, 350, 1, 55, x, y, "geyserIII", "grass") ;
  if(!changeableGrid[x][y].containsTower && player.money >= geyser.cost)
  {
    if(changeableGrid[x][y].type == "grass")
    {
      
      spawnTower(x, y, geyser) ;
      player.money -= geyser.cost ;
      displayHUD() ;
    }
  }
  else if(player.money < parseInt(geyser.cost))
      alert("Insufficient Funds!");
  shopMenu.reloadShop(changeableGrid[x][y],x,y);
}
//(cost, terrain, range, damage, efficiency)
infoS1 = new defensiveTowerInfo(200, "grass", 1, 5, 1) ;
infoS2 = new defensiveTowerInfo(375, "grass", 1, 10, 2) ;
infoS3 = new defensiveTowerInfo(700, "grass", 1, 15, 3) ;
infoF1 = new defensiveTowerInfo(1400, "grass", 3, 50, 8) ;
infoF2 = new defensiveTowerInfo(2600, "grass", 3, 90, 17) ;
infoF3 = new defensiveTowerInfo(4000, "grass", 3, 160, 29) ;
infoW1 = new defensiveTowerInfo(700, "grass", 1, 20, 3) ;
infoW2 = new defensiveTowerInfo(1350, "grass", 1, 35, 4) ;
infoW3 = new defensiveTowerInfo(2600, "grass", 1, 65, 8) ;
infoG1 = new defensiveTowerInfo(1200, "grass", 2, 100, 15) ;
infoG2 = new defensiveTowerInfo(2400, "grass", 2, 175, 29) ;
infoG3 = new defensiveTowerInfo(5000, "grass", 2, 300, 55) ;

//(cost, terrain, rate)
infoHY = new productionTowerInfo(2000, "water", 5) ;
infoOI = new productionTowerInfo(4500, "oil", 15) ;
infoSO = new productionTowerInfo(1750, "grass", 3) ;
infoNU = new productionTowerInfo(8500, "grass", 30) ;


//NO MORE THIS CRAP
//cost, range, damage, rate, efficiency, coordX, coordY, type, terrainType
//rate, cost, coordX, coordY, type, terrainType
// infoS1 = new defensiveTowerInfo(200, 1, 5, 2, 1, null, null, "sprinklerI", "grass") ;
// infoS2 = new defensiveTowerInfo(375, 1, 10, 2, 2, null, null, "sprinklerII", "grass") ;
// infoS3 = new defensiveTowerInfo(700, 1, 15, 2, 3, null, null, "sprinklerIII", "grass") ;
// infoF1 = new defensiveTowerInfo(1400, 3, 50, 4, 8, null, null, "fireHydrantI", "grass") ;
// infoF2 = new defensiveTowerInfo(2600, 3, 90, 4, 17, null, null, "fireHydrantII", "grass") ;
// infoF3 = new defensiveTowerInfo(4000, 3, 160, 4, 29, null, null, "fireHydrantIII", "grass") ;
// infoW1 = new defensiveTowerInfo(700, 1, 20, 3, 3, null, null, "waterTowerI", "grass") ;
// infoW2 = new defensiveTowerInfo(1350, 1, 35, 3, 4, null, null, "waterTowerII", "grass") ;
// infoW3 = new defensiveTowerInfo(2600, 1, 65, 3, 8, null, null, "waterTowerIII", "grass") ;
// infoG1 = new defensiveTowerInfo(1200, 2, 100, 1, 15, null, null, "geyserI", "grass") ;
// infoG2 = new defensiveTowerInfo(2400, 2, 175, 1, 29, null, null, "geyserII", "grass") ;
// infoG3 = new defensiveTowerInfo(5000, 2, 350, 1, 55, null, null, "geyserIII", "grass") ;
// infoHY = new productionTowerInfo(5, 800, null, null, "hydro", "water") ;
// infoOI = new productionTowerInfo(15, 2000, null, null, "oil", "oil") ;
// infoSO = new productionTowerInfo(3, 700, null, null, "solar", "grass") ;
// infoNU = new productionTowerInfo(30, 3500, null, null, "nuclear", "grass") ;
infoBox = document.getElementById("infoBox") ;
function hoverTowerInfo(tower)
{
  var info = "Cost: " + tower.cost + "</br>"
  + "Requires Terrain: " + tower.terrainType + "</br>"
  + "Sell Price: " + tower.sell + "</br>" ;
  if(tower.source.indexOf("offensive") >= 0)
  {
    info += "Range: " + tower.range + "</br>"
    + "Damage: " + tower.damage + "</br>"
    + "Energy Usage: " + tower.efficiency ;
  }
  else
  {
    info += "Energy Production: " + tower.rate ;
    if(tower.source.indexOf("oil") >= 0)
    {
      info += "</br>" + "Cleanliness Penalty: 5" ;
    }
  }
  //Have info be diplayed in whatever element I choose as a tooltip
  infoBox.innerHTML = info ;
  infoBox.style.display = "block" ;
}
function hoverSellInfo(x, y)
{
  var index = getTower(x, y) ;
  var tower = player.towerArray[index] ;
  var info = "Sell For: " + tower.sell ;
  //Have info be diplayed in whatever element I choose as a tooltip
  infoBox.innerHTML = info ;
  infoBox.style.display = "block" ;
}
function hoverUpgradeInfo(x, y, type)
{
  var index = getTower(x, y) ;
  var tower = player.towerArray[index] ;
  var cost ;
  var damage ;
  // var fireRate ;
  var range ;
  var production ;
  var upgrade ;
  if(tower != null)
  {
    if(type == "damage")
    {
      cost = parseInt(tower.cost*.25) ;
      damage = parseInt(towert.damage*.15)
      upgrade = "Damage Increase: " + damage ;
    }
    // if(type == "fireRate")
    // {
    //   cost = parseInt(tower.cost*.2) ;
    //   fireRate = parseInt(tower.rate*.15) ;
    //   upgrade = "Firing Rate Increase: " + fireRate ;
    // }
    if(type = "range")
    {
      cost = parseInt(tower.cost*.65) ;
      range = 1 ;
      upgrade = "Range Increase: " + range ;
    }
    if(type = "production")
    {
      cost = parseInt(tower.cost*.75) ;
      production = parseInt(tower.damage*.5) ;
      upgrade = "Production Increase: " + production ;
    }
    var info = "Upgrade Cost: " + cost + "</br>" + upgrade ;
    //Have info be diplayed in whatever element I choose as a tooltip
    infoBox.innerHTML = info ;
    infoBox.style.display = "block" ;
  }
}


//Sprinkler
//Water Tower
//Fire Hydrant
//Mechanical Geyser