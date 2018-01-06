/*global getTower DisplayHUD DisInsertTower makeGarbageTruck makeTruck makeSUV makeSportsCar makeSmartCar makeMotorcycle makeBike applyNumtoRoad createRoadArray displayHUD shopMenu addToQueue vehicleCount player preLoad InsertTower tower1 OffensiveTower cleanImages images dirtyImages updateRoad SPEEDVH numRoadEnd numVehicles City updateRoad STARTING_ENERGY STARTING_MONEY initializeHUD player gameScreen mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid TEST TESTsrc TESTclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/
//RUN GAME
xVehicleStart = 0;
yVehicleStart = 0;

SHOP_OPEN = false;
condition = false;
//change this depending on difficulty
STARTING_ENERGY = 100;
STARTING_MONEY = 1000;

//vehicleCount = 4; //for set intervals and variable names

function startGame(mapNum)
{
	player = new City(STARTING_ENERGY, STARTING_MONEY); //initializing the city
	populateGrid(mapNum);//make map
	//sortRoad();
	gameScreen.style.background = "white";
	levelCountBox.style.display = "block";
	levelNum.innerHTML = level;
	createRoadArray();
	applyNumtoRoad();
	document.getElementById("move").disabled = false ;
	document.getElementById("pause").disabled = false ;
	document.getElementById("quit").disabled = false ;
	
	//adds energy every second to the city based on the energyRate.
	
	
	//spawnVehicle(vehicleCount); //just the test vehicle for now
	//OffensiveTower(cost, range, damage, rate, efficiency, coordX, coordY, type, terrainType)
	//var tower1 = new OffensiveTower(500, 1, 10, 500 /*RATE*/, 100, 2, 5, "Test", "grass"); //for testing
	//spawnTower(2,5, tower1); //just test tower for now
	updateRoad();
	
	initializeHUD();
}

function populateGrid(mapNum)
{
	if(mapNum == 1)
		map1();
	else if(mapNum == 2)
		map2();
	else if(mapNum == 3)
		map3();
	else if(mapNum == 4)
		map4();
	
	for(var x = 0; x < LENGTH; x++)
	{
		for(var y = 0; y < HEIGHT; y++)
		{
			changeableGrid[x][y] = mapGrid[x][y];
			changeableGrid[x][y].xCoord = x;
			changeableGrid[x][y].yCoord = y;
			changeableGrid[x][y].roadNum = 0;
			
            var tdAtt = document.createAttribute('onclick');
            tdAtt.value = 'shopMenu.reloadShop(changeableGrid['+x+']['+y+'], '+x+','+y+');'; 
            tblElements[x][y].setAttributeNode(tdAtt);
		}
	}
	
	displayTerrain();
}

function spawnVehicle(num, vehicle)
{
	//Vehicles(hp, type, gains, loss, coordX, coordY, cityObject/*, vehicleNum*/)
	//var vehicle1 = new Vehicles(100, "TEST",10, 10, Scoordx, Scoordy, player);
	num--;
	//moveVehicles();
	
	if(num >= 0)
	{
		var VehicleNew;
		if(vehicle.type == "bike")
			VehicleNew = makeBike() ;
		if(vehicle.type == "motorcycle")
			VehicleNew = makeMotorcycle() ;
		if(vehicle.type == "smartCar")
			VehicleNew = makeSmartCar() ;
		if(vehicle.type == "sportsCar")
			VehicleNew = makeSportsCar() ;
		if(vehicle.type == "SUV")
			VehicleNew = makeSUV() ;
		if(vehicle.type == "truck")
			VehicleNew = makeTruck() ;
		if(vehicle.type == "garbageTruck")
			VehicleNew = makeGarbageTruck() ;
			
		//spawnVehicle(num, VehicleNew);
		player.vehicleArray.push(VehicleNew);
		updateRoad();
	}
	
	
		
	
}
function spawnTower(x,y, tower)
{
	//ref- OffensiveTower(cost, range, damage, rate, efficiency, upgrade, gridX, gridY, source, type, terrainType)
	// var tower1 = new OffensiveTower(500, 1, 10, 500 /*RATE*/, 100, 200, x, y, "offensiveTowers/tower.jpg", "test", "grass"); //for testing
	// player.towerArray.push(tower1);
	player.towerArray.push(tower);
	// tower1.placeTower();
	// tower.placeTower(); //in objects.js
	InsertTower(tower, tower.coordX, tower.coordY);
}
function sellTower(x, y)
{
	if(changeableGrid[x][y].containsTower)
	{
		var index = getTower(x, y) ;
		var tower = player.towerArray[index] ;
		//NEED TO HAVE GRID THAT CONTAINS TOWERS TO PASS IN HERE
		player.towerArray.splice(index, 1) ; //NEED TO KNOW WHICH INDEX THE TOWER IS AT TO REMOVE IT
		DisInsertTower(tower, x, y);
		player.money += tower.sell ;
		if(tower.source.indexOf("production") >= 0)
		{
			player.energyRate -= tower.rate ;
		}
		displayHUD() ;
		shopMenu.reloadShop(changeableGrid[x][y],x,y);
	}
}
function getTower(x, y)
{
	for(var i = 0 ; i < player.towerArray.length ; i++)
	{
		if(player.towerArray[i].coordX == x && player.towerArray[i].coordY == y)
		{
			return i ;
		}
	}
}


function start(button)
{
	
	//var yes = setInterval( function(){spawnVehicle(1);}, 1000);
	//var whichShoot = 0;
	button.disabled = true;
	levelCountBox.style.display = "block" ;
	levelRun();
	levelNum.innerHTML = level;
	var interval = setInterval(
		function()
		{
			player.power();
			
			if(vehicleQueue.length > 0) //spawns the vehicles from the vehicle queue one at a time at the same rate they move
			{
				spawnVehicle(vehicleQueue[0].count, vehicleQueue[0].type);
				vehicleQueue[0].remaining--;
				if(vehicleQueue[0].remaining <= 0)
					vehicleQueue.shift();
			}
			
			moveVehicles();
			updateRoad();
			shootVehicle();
			//Figured it out check Levels.js
			if(condition)
			{
				clearInterval(interval);
				button.disabled = false;
				condition = false;
				
				//maybe delay this or something to make it more obvious that it's a end-level bonus
				player.money+=(150 + level*20); //can change this around if desired
				displayHUD();
				//start(this);
			}
			//ends the interval once all cars are gone
			// 	
				
		}, 500);//SPEEDVH); 
		
}
function shootVehicle()
{
	for(var j = 0; j < player.towerArray.length; j++)
	{
		for(var i = 0; i < player.vehicleArray.length; i++)
		{
			if(player.vehicleArray[i].condition == "dirty" && player.towerArray[j].source.indexOf("offensiveTowers") >= 0 && player.energy >= player.towerArray[j].efficiency)
			// && 
			{
				var xPos = player.vehicleArray[i].coordX;
				var yPos = player.vehicleArray[i].coordY;
				for(var a = 0 ; a < player.towerArray[j].roadInRange.length; a++)
				{
					if(player.towerArray[j].roadInRange[a].containsVehicle && xPos == player.towerArray[j].roadInRange[a].xCoord && yPos == player.towerArray[j].roadInRange[a].yCoord)
					{
						player.towerArray[j].shoot(player.vehicleArray[i]);
				
						if(j == player.towerArray.length-1)
						{
							return;
						}
					}
					
				}
				
			}		// break B ;
		}		// break A ;						// return ;
	}
	
}

function moveVehicles() //goes through vehicle array and moves all vehicles
{
	
	for(var i = 0; i < player.vehicleArray.length; i++)
	{
		if(player.vehicleArray[i].coordY > 9)
		{
			if(player.vehicleArray[i].condition == "clean")
			{
				player.vehicleArray[i].reachEndClean(player);
			}
			if(player.vehicleArray[i].condition == "dirty")
			{
				player.vehicleArray[i].reachEndDirty(player);
			}
			displayHUD();
			
			player.vehicleArray.shift();
		}
		if(player.vehicleArray.length > 0)
		{
			player.vehicleArray[i].move();
			updateRoad();
		}
		else
		{
			condition = true;
			
		}
		
		
	};
}

//this doesn't actually stop the game
//the way we've written the game thus far, we'd either just have to refresh the page
//or build in a way for us to get rid of all vehicles and towers and all that
function quitPrompt(confirmQuit)
{
	if(confirmQuit)
		var quit = confirm("Are you sure you want to quit?") ;
	else
		var quit = true ; //THIS IS SO THIS FUNCTION CAN BE CALLED UPON GAME LOSS
		//SO THAT THE GAME CAN AUTO-QUIT IF LOSS, AND PROMPT ONLY IF THE QUIT BUTTON WAS CLICKED
	if(quit)
	{
		//make sure to also make the HUD and the levelNum display:none in your quit function
		
		document.getElementById("move").disabled = true ;
		document.getElementById("pause").disabled = true ;
		document.getElementById("quit").disabled = true ;
		gameScreen.style.background = "cornflowerblue";
		gameScreen.display = "none" ;
		mainMenu.display();
		gameScreen.removeChild(document.getElementById("gridTable"));
		document.body.removeChild(document.getElementById("HUD_CONTAINER"));
		levelCountBox.style.display = "none" ;
		//shopMenu.hide(true);
		document.getElementById("shop").style.display = "none";
		
		/*while(player.vehicleArray.length > 0)
		{
			delete player.vehicleArray[0] ;
		}*///Very ineffiecent
		
		player.vehicleArray.length = 0;// this is much better
		SHOP_OPEN = false;
		condition = false;
		level = 0 ;
		numVehicles = 0 ;
		numTowers = 0;
		var id = window.setTimeout(function() {}, 0);

		while (id--) {
		    window.clearTimeout(id); // will do nothing if no timeout with id is present
		}
		
		//TEMPORARY
		// location.reload();
	}
}


//for dropdown menus
function listDTowers()
{
	document.getElementById("defenseDropdown").classList.toggle("show");
	
	window.onclick = function(event) 
	{
		if (!event.target.matches('.defenseDropdownBtn')) 
		{
			var dropdowns = document.getElementsByClassName("dropdownContent");
			for (var i = 0; i < dropdowns.length; i++) 
			{
				var openDropdown = dropdowns[i];
   				if (openDropdown.classList.contains('show')) 
   					openDropdown.classList.remove('show');
  			}
  		}
	}
}
function listPTowers()
{
	document.getElementById("productionDropdown").classList.toggle("show");
	
	window.onclick = function(event) 
	{
		if (!event.target.matches('.productionDropdownBtn')) 
		{
			var dropdowns = document.getElementsByClassName("dropdownContent");
			for (var i = 0; i < dropdowns.length; i++) 
			{
				var openDropdown = dropdowns[i];
   				if (openDropdown.classList.contains('show')) 
   					openDropdown.classList.remove('show');
  			}
  		}
	}
}
function listUpgrades()
{
	document.getElementById("upgradesDropdown").classList.toggle("show");
	
	window.onclick = function(event) 
	{
		if (!event.target.matches('.upgradesDropdownBtn')) 
		{
			var dropdowns = document.getElementsByClassName("dropdownContent");
			for (var i = 0; i < dropdowns.length; i++) 
			{
				var openDropdown = dropdowns[i];
   				if (openDropdown.classList.contains('show')) 
   					openDropdown.classList.remove('show');
  			}
  		}
	}
}