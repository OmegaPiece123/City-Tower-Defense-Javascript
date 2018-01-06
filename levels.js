/*global movementArray Scoordx Scoordy makeGarbageTruck makeTruck makeSUV makeSportsCar makeSmartCar makeMotorcycle makeBike moveVehicles roadArray spawnVehicle level checkVehicles player preLoad cleanImages images dirtyImages updateRoad SPEEDVH numRoadEnd numVehicles gameScreen xPos yPos makeTerrainGrid mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid TEST TESTsrc TESTclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/
//DESIGN ON LEVELS FOR ORDER OF CARS COMING.
//HERE THE INSERT VEHICLE WILL BE CALLED, NOWHERE ELSE
level = 0;
movementArray = [];

var vehicleQueue = []; //array of queuedVehicle objects
  
function addToQueue(vehicleCount, vehicleType) //repurposing this as a function that just adds the vehicles to a queue that will be iterated in the main interval
{
  /*
  player.testLevelCount = vehicles;
  var vehicleCount = vehicles;
  queueCar = (player.testLevelCount)  * (roadArray.length+1) ;
	while(vehicleCount>0)
  {  
      var time = 1000 * player.spawnRate; //This is needed because setInterval is queueing these right after one another so I have to increase the delay each time you want one to be spawn
      player.spawnRate += 1;
      // var vehicles = 10 ;
      var spawnInterval = setTimeout(function(){spawnVehicle(vehicles, vehicleType);},time);
    
      vehicleCount--;
  }
  */
  
  vehicleQueue.push(new queuedVehicle(vehicleCount,vehicleType));
}

function levelRun() //dictates what vehicles spawn on what levels
{ 
  var bike = makeBike() ;
  var motorcycle = makeMotorcycle() ;
  var smartCar = makeSmartCar() ;
  var sportsCar = makeSportsCar() ;
  var SUV = makeSUV() ;
  var truck = makeTruck() ;
  var garbageTruck = makeGarbageTruck() ;
  
  level++ ;
  player.spawnRate = 1;
  if(level == 1)
  {
    //run with 10 bikes
    
    addToQueue(12, bike) ;
  }
  if(level == 2)
  {
    //run with 15 bikes and 1 motorcycle
    
    addToQueue(15, bike) ;
    addToQueue(1, motorcycle) ;
  }
  if(level == 3)
  {
    //run with 5 bikes and 5 motorcycles
    
    addToQueue(5, bike) ;
    addToQueue(5, motorcycle) ;
  }
  if(level == 4)
  {
    //run with 5 bikes and 10 motorcycles
    
    addToQueue(5, bike) ;
    addToQueue(10, motorcycle) ;
  }
  if(level == 5)
  {
    //run with 5 bikes and 5 motorcycles and 1 smartCar
    
    addToQueue(5, bike) ;
    addToQueue(5, motorcycle) ;
    addToQueue(1, smartCar) ;
  }
  if(level == 6)
  {
    //run with 5 bikes and 5 motorcycles and 5 smartCars
    
    addToQueue(5, bike) ;
    addToQueue(5, motorcycle) ;
    addToQueue(5, smartCar) ;
  }
  if(level == 7)
  {
    //run with 10 motorcycles and 5 smartCars
    
    addToQueue(10, motorcycle) ;
    addToQueue(5, smartCar) ;
  }
  if(level == 8)
  {
    //run with 10 motorcycles and 10 smartCars
   
    addToQueue(10, motorcycle) ;
    addToQueue(10, smartCar) ;
  }
  if(level == 9)
  {
    //run with 5 motorcycles and 20 smartCars
    
    addToQueue(5, motorcycle) ;
    addToQueue(20, smartCar) ;
  }
  if(level == 10)
  {
    //run with 25 smartCars
    
    addToQueue(25, smartCar) ;
  }
  if(level == 11)
  {
    //run with 20 smartCars and 1 sportsCar
    
    addToQueue(20, smartCar) ;
    addToQueue(1, sportsCar) ;
  }
  if(level == 12)
  {
    //run with 15 smartCars and 5 sportsCars
    
    addToQueue(15, smartCar) ;
    addToQueue(5, sportsCar) ;
  }
  if(level == 13)
  {
    //run with 10 smartCars and 10 sportsCars
    
    addToQueue(10, smartCar) ;
    addToQueue(10, sportsCar) ;
  }
  if(level == 14)
  {
    //run with 10 motorcycles and 5 smartCars and 15 sportsCars
    
    addToQueue(10, motorcycle) ;
    addToQueue(5, smartCar) ;
    addToQueue(15, sportsCar) ;
  }
  if(level == 15)
  {
    //run with 20 sportsCars
    
    addToQueue(20, sportsCar) ;
  }
  if(level == 16)
  {
    //run with 25 sportsCars
    
    addToQueue(25, sportsCar) ;
  }
  if(level == 17)
  {
    //run with 10 sportsCars and 1 SUV
    
    addToQueue(10, sportsCar) ;
    addToQueue(1, SUV) ;
  }
  if(level == 18)
  {
    //run with 5 sportsCars and 5 SUVs
    
    addToQueue(5, sportsCar) ;
    addToQueue(5, SUV);
  }
  if(level == 19)
  {
    //run with 10 smartCars and 10 SUVs
    
    addToQueue(10, smartCar) ;
    addToQueue(10, SUV);
  }
  if(level == 20)
  {
    //run with 10 smartCars and 5 sportsCars and 15 SUVs
    
    addToQueue(10, smartCar) ;
    addToQueue(5, sportsCar);
    addToQueue(15, SUV);
  }
  if(level == 21)
  {
    //run with 5 smartCars and 10 sportsCars and 15 SUVs
    
    addToQueue(5, smartCar) ;
    addToQueue(10, sportsCar);
    addToQueue(15, SUV);
  }
  if(level == 22)
  {
    //run with 20 SUVs and 1 truck
    
    addToQueue(20, SUV);
    addToQueue(1, truck);
  }
  if(level == 23)
  {
    //run with 20 SUVs and 5 trucks
    
    addToQueue(20, SUV) ;
    addToQueue(5, truck);
  }
  if(level == 24)
  {
    //run with 10 sportsCars and 5 SUVs and 10 trucks
    
    addToQueue(10, sportsCar) ;
    addToQueue(5, SUV);
    addToQueue(10, truck);
  }
  if(level == 25)
  {
    //run with 5 bikes and 5 motorcycles and 5 smartCars and 5 sportsCars and 5 SUVs and 5 trucks and 1 garbageTruck
    
    addToQueue(5, bike) ;
    addToQueue(5, motorcycle);
    addToQueue(5, smartCar);
    addToQueue(5, sportsCar) ;
    addToQueue(5, SUV) ;
    addToQueue(5, truck);
    addToQueue(5, garbageTruck);
  }
  if(level >= 26 )
  {
    var random = Math.random()*(level - 13);
    var random1 = Math.random()*(level - 13);
    var random2 = Math.random()*(level - 13);
    var random3 = Math.random()*(level - 13);
    var random4 = Math.random()*(level - 13);
    var random5 = Math.random()*(level - 13);
    var random6 = Math.random()*(level - 13);

    
    addToQueue(random, bike) ;
    addToQueue(random1, motorcycle);
    addToQueue(random2, smartCar);
    addToQueue(random3, sportsCar) ;
    addToQueue(random4, SUV) ;
    addToQueue(random5, truck);
    addToQueue(random6, garbageTruck);
  }
  //.... garbageTruck will be extremely strong, boss level...
}