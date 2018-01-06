/*global player towerPlacement towerPlacementsrc towerPlacementclass player numTowers BLANK preLoad cleanImages images dirtyImages updateRoad SPEEDVH numRoadEnd numVehicles gameScreen mapGrid Terrain LENGTH HEIGHT tbl tblAtt changeableGrid tblElements tdAtt towerGrid terrainGrid carPlacement carPlacementsrc carPlacementclass map1 map2 map3 map4 Vehicles vehicle1 InsertVehicle displayTerrain xVehicleStart yVehicleStart Scoordx Scoordy*/

var LENGTH = 10;
var HEIGHT = 10;
numVehicles = 0 ;
numTowers = 0;
BLANK = "blank.png";

function makeTerrainGrid() 
{
	var tbl = document.createElement('table');
	var tblAtt = document.createAttribute('id');
	tblAtt.value = "gridTable";
	tbl.setAttributeNode(tblAtt);
	
    changeableGrid = new Array();
    tblElements = new Array();

    for(var x = 0; x < LENGTH; x++)
    {
        var tr = tbl.insertRow();

        changeableGrid[x] = new Array();
        tblElements[x] = new Array();

        for(var y = 0; y < HEIGHT; y++)
        {
             var td = tr.insertCell();
             var tdImage = document.createElement('img');
             var tdImageSrc = document.createAttribute('src');
             tdImageSrc.value = BLANK;
             tdImage.setAttributeNode(tdImageSrc);
             td.appendChild(tdImage);

             tblElements[x][y] = tbl.getElementsByTagName('tr')[x].getElementsByTagName('td')[y];
        }
    }
    gameScreen.appendChild(tbl);
	transposeTable();
}

//this uses JQuery because this is the easiest way to do this tbh
function transposeTable() //switches rows and columns of the table because of how dumb tables are to generate
{
	$("table").each(function() {
        var $this = $(this);
        var newrows = [];
        $this.find("tr").each(function(){
            var i = 0;
            $(this).find("td").each(function(){
                i++;
                if(newrows[i] === undefined) { newrows[i] = $("<tr></tr>"); }
                newrows[i].append($(this));
            });
        });
        $this.find("tr").remove();
        $.each(newrows, function(){
            $this.append(this);
        });
    });

    return false;
}

function InsertTower(towerObject, x, y)
{
	tblElements[x][y].children[0].src = towerObject.source;
	changeableGrid[x][y].containsTower = true;
	numTowers++;
}
function DisInsertTower(towerObject, x, y)
{
    tblElements[x][y].children[0].src = "blank.png";
	changeableGrid[x][y].containsTower = false;
	numTowers--;
}

function InsertVehicle(vehicleObject, x, y)
{
	tblElements[x][y].children[0].src = vehicleObject.source;
	changeableGrid[x][y].containsVehicle = true;
	numVehicles++;
}