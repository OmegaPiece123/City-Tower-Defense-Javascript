/*global player preLoad cleanImages images dirtyImages updateBoard SPEEDVH numRoadEnd numVehicles moneyCounter energyCounter energyRateCounter cleanlinessCounter player gameScreen mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid TEST TESTsrc TESTclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/
//preLoad All Images Here
//Call onLoad in html file
function preLoad()
{
     // // create object
     // cleanImages = new Image();
     
     // dirtyImages = new Image();
     
     // // set image list
     // images = new Array();
     // images[0] = "TEST" ;
     // images[1] = "TEST45" ;
     // images[2] = "TEST90" ;
     // images[3] = "TEST135" ;
     // images[4] = "TEST180" ;
     // images[5] = "TEST225" ;
     // images[6] = "TEST270" ;
     // images[7] = "TEST315" ;
     // /*
     // for(i = 0; i < 7; i++)
     // {
     //      if(i = 0)
     //      {
     //           images[i] = "TEST";
     //      }
     //      else
     //      {
     //           images[i] = "TEST" + 45*i;
     //      }
     // }
     // */
     // // start preloading
     // for(var i = 0 ; i < images.length ; i++) 
     // {
     //      cleanImages.src = "clean/" + images[i] + ".png" ;
     //      dirtyImages.src = "dirty/" + images[i] + ".png" ;
     // }
//     <!--//--><![CDATA[//><!--
			var images = new Array()
			function preload() {
				for (var i = 0; i < preload.arguments.length; i++) {
					images[i] = new Image() ;
					images[i].src = preload.arguments[i] ;
				}
			}
			preload(
				"clean/TEST.png",
				"clean/TEST45.png",
				"clean/TEST90.png",
				"clean/TEST135.png",
				"clean/TEST180.png",
				"clean/TEST225.png",
				"clean/TEST270.png",
				"clean/TEST315.png",
				"clean/smartCar.png",
				"clean/smartCar45.png",
				"clean/smartCar90.png",
				"clean/smartCar135.png",
				"clean/smartCar180.png",
				"clean/smartCar225.png",
				"clean/smartCar270.png",
				"clean/smartCar315.png",
				"clean/sportsCar.png",
				"clean/sportsCar45.png",
				"clean/sportsCar90.png",
				"clean/sportsCar135.png",
				"clean/sportsCar180.png",
				"clean/sportsCar225.png",
				"clean/sportsCar270.png",
				"clean/sportsCar315.png",
				"clean/SUV.png",
				"clean/SUV45.png",
				"clean/SUV90.png",
				"clean/SUV135.png",
				"clean/SUV180.png",
				"clean/SUV225.png",
				"clean/SUV270.png",
				"clean/SUV315.png",
				"clean/truck.png",
				"clean/truck45.png",
				"clean/truck90.png",
				"clean/truck135.png",
				"clean/truck180.png",
				"clean/truck225.png",
				"clean/truck270.png",
				"clean/truck315.png",
				"clean/bike.png",
				"clean/bike45.png",
				"clean/bike90.png",
				"clean/bike135.png",
				"clean/bike180.png",
				"clean/bike225.png",
				"clean/bike270.png",
				"clean/bike315.png",
				"clean/motorcycle.png",
				"clean/motorcycle45.png",
				"clean/motorcycle90.png",
				"clean/motorcycle135.png",
				"clean/motorcycle180.png",
				"clean/motorcycle225.png",
				"clean/motorcycle270.png",
				"clean/motorcycle315.png",
				"clean/garbageTruck.png",
				"clean/garbageTruck45.png",
				"clean/garbageTruck90.png",
				"clean/garbageTruck135.png",
				"clean/garbageTruck180.png",
				"clean/garbageTruck225.png",
				"clean/garbageTruck270.png",
				"clean/garbageTruck315.png",
				
				
				"dirty/TEST.png",
				"dirty/TEST45.png",
				"dirty/TEST90.png",
				"dirty/TEST135.png",
				"dirty/TEST180.png",
				"dirty/TEST225.png",
				"dirty/TEST270.png",
				"dirty/TEST315.png",
				"dirty/smartCar.png",
				"dirty/smartCar45.png",
				"dirty/smartCar90.png",
				"dirty/smartCar135.png",
				"dirty/smartCar180.png",
				"dirty/smartCar225.png",
				"dirty/smartCar270.png",
				"dirty/smartCar315.png",
				"dirty/sportsCar.png",
				"dirty/sportsCar45.png",
				"dirty/sportsCar90.png",
				"dirty/sportsCar135.png",
				"dirty/sportsCar180.png",
				"dirty/sportsCar225.png",
				"dirty/sportsCar270.png",
				"dirty/sportsCar315.png",
				"dirty/SUV.png",
				"dirty/SUV45.png",
				"dirty/SUV90.png",
				"dirty/SUV135.png",
				"dirty/SUV180.png",
				"dirty/SUV225.png",
				"dirty/SUV270.png",
				"dirty/SUV315.png",
				"dirty/truck.png",
				"dirty/truck45.png",
				"dirty/truck90.png",
				"dirty/truck135.png",
				"dirty/truck180.png",
				"dirty/truck225.png",
				"dirty/truck270.png",
				"dirty/truck315.png",
				"dirty/bike.png",
				"dirty/bike45.png",
				"dirty/bike90.png",
				"dirty/bike135.png",
				"dirty/bike180.png",
				"dirty/bike225.png",
				"dirty/bike270.png",
				"dirty/bike315.png",
				"dirty/motorcycle.png",
				"dirty/motorcycle45.png",
				"dirty/motorcycle90.png",
				"dirty/motorcycle135.png",
				"dirty/motorcycle180.png",
				"dirty/motorcycle225.png",
				"dirty/motorcycle270.png",
				"dirty/motorcycle315.png",
				"dirty/garbageTruck.png",
				"dirty/garbageTruck45.png",
				"dirty/garbageTruck90.png",
				"dirty/garbageTruck135.png",
				"dirty/garbageTruck180.png",
				"dirty/garbageTruck225.png",
				"dirty/garbageTruck270.png",
				"dirty/garbageTruck315.png"
			) ;
		//--><!]]>

} 