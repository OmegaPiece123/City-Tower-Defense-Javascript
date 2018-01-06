/*global player BLANK roadArray preLoad InsertTower cleanImages images dirtyImages updateRoad SPEEDVH numRoadEnd numVehicles moneyCounter energyCounter energyRateCounter cleanlinessCounter player gameScreen mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid TEST TESTsrc TESTclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/

var LENGTH = 10;
var HEIGHT = 10;

function updateRoad() //new shorter updateBoard() method 
{
    for(var currRoadSpace = 0; currRoadSpace < roadArray.length; currRoadSpace++)
        checkVehicles(roadArray[currRoadSpace].xCoord, roadArray[currRoadSpace].yCoord);
}

function checkVehicles(x,y)
{
    for(var currVehicle = 0; currVehicle < player.vehicleArray.length; currVehicle++)
        if(player.vehicleArray[currVehicle].coordX == x && player.vehicleArray[currVehicle].coordY == y && !changeableGrid[x][y].containsVehicle)
            InsertVehicle(player.vehicleArray[currVehicle], x, y);
    
    if(!changeableGrid[x][y].containsVehicle && tblElements[x][y].children[0].src != BLANK)
        tblElements[x][y].children[0].src = BLANK;
}

//only stores the changeableGrid terrain spaces that are marked as "road"
function createRoadArray() //creates the shorter array that would speed up runtime when we check the vehicle positions
{
    roadArray = new Array();
    for(var x = 0; x < LENGTH; x++)
        for(var y = 0; y < HEIGHT; y++)
            if(changeableGrid[x][y].type == "road")
                roadArray.push(changeableGrid[x][y]);
}

// function checkTowers(tower/*,x,y*/)
// {
// 	for(var currTower = 0; currTower < player.towerArray.length; currTower++)
        // if(tower.coordX == x && tower.coordY == y && !changeableGrid[x][y].containsTower)
            // InsertTower(/*player.towerArray[currTower]*/tower, /*x*/tower.coordX, /*y*/tower.coordY); // in grid.js
// }

function displayTerrain()
{
	for(var x = 0; x < LENGTH; x++)
        for(var y = 0; y < HEIGHT; y++)
			tblElements[x][y].style.backgroundImage = "url(" + changeableGrid[x][y].source + ")";
}

function initializeHUD() //MAKE MAIN MENU BUTTON
{
    var hudContainer = document.createElement("div");
    var hudId = document.createAttribute("id");
    hudId.value = "HUD_CONTAINER";
    hudContainer.setAttributeNode(hudId);
    
    var hudClass = document.createAttribute("class");
    hudClass.value = "HUD";
    
    moneyCounter = document.createElement("span");
    moneyCounter.setAttributeNode(hudClass);
    
    energyCounter = document.createElement("span");
    energyCounter.setAttributeNode(hudClass.cloneNode(true));
    
    energyRateCounter = document.createElement("span");
    energyRateCounter.setAttributeNode(hudClass.cloneNode(true));
    
    cleanlinessCounter = document.createElement("span");
    cleanlinessCounter.setAttributeNode(hudClass.cloneNode(true));
    
    hudContainer.appendChild(moneyCounter);
    hudContainer.appendChild(energyCounter);
    hudContainer.appendChild(energyRateCounter);
    hudContainer.appendChild(cleanlinessCounter);
    
    document.body.appendChild(hudContainer);
    
    displayHUD();
}
function displayHUD()
{
	moneyCounter.innerHTML = "<span class = 'bold'>Money:</span> $" + player.money;
	energyCounter.innerHTML = "<span class = 'bold'>Energy:</span> " + player.energy + " units";
	energyRateCounter.innerHTML = "<span class = 'bold'>Energy Rate:</span> " + player.energyRate + " units/second";
	cleanlinessCounter.innerHTML = "<span class = 'bold'>Cleanliness:</span> " + player.cleanliness + "%";
}

function debugMenu() //make a menu similar to main menu but with values we can change to test stuff?
{
    
}