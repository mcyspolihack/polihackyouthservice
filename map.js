
function uploadFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file,  false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {	                
                console.log('Uploaded:' + file);	               
            }
        }
    }
    rawFile.send();
    return JSON.parse(rawFile.responseText);
}



function pickPoints(pointsLayer, value)
{
	console.log("click!")
	console.log(points.features.length)
	
	mymap.eachLayer(function (layer) 
	{
    	mymap.removeLayer(layer);
	});

	pointsSlice = [];
	for (i = 0; i < points.features.length; i++)
	{
		
		console.dir(points.features[i].properties[value] == 1)
		if(points.features[i].properties[value] == 1)
		{
			pointsSlice.push(points.features[i])
		}
		
	}
	console.log(pointsSlice);
	L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFja2VuemllbiIsImEiOiJjaW1pbTZmMWwwMGU1dTFrcW0wenNiNGZ0In0.ys8ti05bu3iKf06cK9r82Q', {
                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                id: 'mapbox.light',
                accessToken: 'pk.eyJ1IjoibWFja2VuemllbiIsImEiOiJjaW1pbTZmMWwwMGU1dTFrcW0wenNiNGZ0In0.ys8ti05bu3iKf06cK9r82Q'
            }).addTo(mymap);

	var pointsLayer = L.geoJson(pointsSlice).addTo(mymap)
}

function onEachFeature(feature, layer)
{
	layer.bindPopup("<h4>Desired Outcomes of Youth Programs in this FSA: <span style = color:red>"+feature.properties.CFSAUID +  "</span></h4><p> <b>Outcome 1: </b><br>"+feature.properties.polydat_CAT1.split(",")[0]+"</p>"+ "<p> <b>Outcome 2: </b><br>"+feature.properties.polydat_CAT2.split(",")[0]+"</p>"+ "<p> <b>Outcome 3: </b><br>"+feature.properties.polydat_CAT3.split(",")[0]+"</p>")
}


