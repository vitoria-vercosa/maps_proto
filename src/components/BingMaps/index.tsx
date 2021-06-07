import { useEffect } from 'react';
import { fadedMap, earthquakeData, US_State_Literacy } from './conf';
import { loadBingApi, Microsoft } from './loaderBingMaps';
// import { Search, getBoundary } from './BoundaryFunctions';

export function BingMaps(props){

    var searchManager;

    const initMap = () => {
        
        // const map = new Microsoft.Maps.Map('#myMap', {mapTypeId: Microsoft.Maps.MapTypeId.grayscale})
        // return map.setOptions({ customMapStyle: fadedMap });

        const map = new Microsoft.Maps.Map('#myMap', { customMapStyle: fadedMap });

        var objLayers = {
            'layer_Boundary' : new Microsoft.Maps.Layer(),
            'layer_Choropleth' : new Microsoft.Maps.Layer(),
        }

        const searchBoundariesAndLoadChoropleth = () => {

            //Create the request options.
            var geoDataRequestOptions = {
                entityType: 'AdminDivision1',
                getAllPolygons: true
            };

            var states = [];
            US_State_Literacy.forEach(function(dict, i) {
                states.push(dict['stateName']);
            })
            
            Microsoft.Maps.loadModule(
                ['Microsoft.Maps.SpatialDataService', 'Microsoft.Maps.Search'],
                function () {
                    var searchManager = new Microsoft.Maps.Search.SearchManager(map);
                    var geocodeRequest = {
                        where: props.localBoundary,
                        // callback: getBoundary,
                    };
                    searchManager.geocode(geocodeRequest);
                }
            );

            //Use the GeoData API manager to get the state boundaries.
            Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(
                states,
                geoDataRequestOptions,
                map,
                function (data) {
                    //This callback function will be called once for each state.
                    //Add the polygons to the map.
                    if (data.results && data.results.length > 0) {
                        var info = US_State_Literacy[data.location];

                        for (var i = 0; i < data.results[0].Polygons.length; i++) {
                            data.results[0].Polygons[i].setOptions({
                                fillColor: getLegendColor(parseInt(info.lackingLiteracy)),
                                strokeColor: 'black'
                            });
                        }

                        map.entities.push(data.results[0].Polygons);
                    }
                }
            );

            const getLegendColor = (val) => {
                if(val >= 20){
                    return 'rgba(189,0,38,0.8)';
                }else if(val >= 15){
                    return 'rgba(227,26,28,0.8)';
                }else if(val >= 10){
                    return 'rgba(253,141,60,0.8)';
                }else if(val >= 5){
                    return 'rgba(254,217,118,0.8)';
                }else {
                    return 'rgba(255,255,204,0.8)';
                }
            }
            
        }

        const searchAndLoadGeometry = () => {

            Microsoft.Maps.loadModule(
                ['Microsoft.Maps.SpatialDataService', 'Microsoft.Maps.Search'],
                function () {
                    var searchManager = new Microsoft.Maps.Search.SearchManager(map);
                    var geocodeRequest = {
                        where: props.localBoundary,
                        callback: getBoundary,
                    };
                    searchManager.geocode(geocodeRequest);
                }
            );
    
            const getBoundary = (geocodeResult) => {
    
                //Add the first result to the map and zoom into it.
                if (geocodeResult && geocodeResult.results && geocodeResult.results.length > 0) {
                    
                    //Zoom into the location.
                    map.setView({ bounds: geocodeResult.results[0].bestView });
    
                    //Create the request options for the GeoData API.
                    //
                    // lod : The level of detail for the boundary polygons returned. 
                    //       An integer between 0 and 3, where 0 specifies 
                    //       the coarsest level of boundary detail and 3 specifies the best. 
                    //       Default: 0
                    //
                    // getAllPolygons : Specifies whether the response should include 
                    //                  all of the boundary polygons for the requested 
                    //                  entity or just return a single polygon that 
                    //                  represents the main outline of the entity. 
                    //                  Default: false
                    //
                    // entityType :	The entity type to return. Default: CountryRegion
                    //
                    var geoDataRequestOptions = {
                        lod : 1, 
                        getAllPolygons: true
                    };
    
                    //Verify that the geocoded location has a supported entity type.
                    switch (geocodeResult.results[0].entityType) { 
                        case "CountryRegion":
                        case "AdminDivision1":
                        case "AdminDivision2":
                        case "Postcode1":
                        case "Postcode2":
                        case "Postcode3":
                        case "Postcode4":
                        case "Neighborhood":
                        case "PopulatedPlace":
                            geoDataRequestOptions['entityType'] = geocodeResult.results[0].entityType;
                            break;
                        default:
                            //Display a pushpin if GeoData API does not support EntityType.
                            var pin = new Microsoft.Maps.Pushpin(geocodeResult.results[0].location);
                            map.entities.push(pin);
                            return;
                    }
                    
                    //Use the GeoData API manager to get the boundary of the zip codes
                    Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(
                        geocodeResult.results[0].location,
                        geoDataRequestOptions,
                        map,
                        function (data) {
                            //Add the polygons to the map.
                            if (data.results && data.results.length > 0) {
                                // map.entities.push(data.results[0].Polygons);
                                objLayers.layer_Boundary.add(data.results[0].Polygons);
                                map.layers.insert(objLayers.layer_Boundary);
                            }
                        },
                        null,
                        function errCallback(networkStatus, statusMessage) {
                            console.log(networkStatus);
                            console.log(statusMessage);
                        }
                    );
                }
                
            }
        }

        const loadContour = () => {

            // var contourLine1, contourLine2, contourLine3, contourLine4, contourLine5, contourLine6;
            var layer;
            Microsoft.Maps.loadModule(['Microsoft.Maps.Contour', 'Microsoft.Maps.GeoJson'], function () {
                // Earthquake intensity contours of M7.0 – 1km WSW of Kumamoto-shi, Japan (GeoJson source from usgs.gov: http://earthquake.usgs.gov/archive/product/shakemap/us20005iis/us/1467057010522/download/cont_psa03.json)
                var featureCollection = Microsoft.Maps.GeoJson.read(earthquakeData, { polygonOptions: { fillColor: 'rgba(0, 255, 255, 0.3)' } });
                var contourLines = [];
                for (var i = 0; i < featureCollection.length; i++) {
                    contourLines.push(new Microsoft.Maps.ContourLine(featureCollection[i].getLocations(), featureCollection[i].metadata.value));
                }
                layer = new Microsoft.Maps.ContourLayer(contourLines,
                    { 
                        colorCallback: assignContourColor, 
                        polygonOptions: { strokeColor: 'rgba(255, 255, 255, 0)' } 
                    });
                // /* Apparently, it is not possible to insert a ContourLayer into a Layer */ //
                // objLayers.layer_Contour.add(layer);
                // map.layers.insert(objLayers.layer_Contour);
                objLayers['layer_Contour'] = layer;
                map.layers.insert(objLayers['layer_Contour']);
            });

            function assignContourColor(value) {
                var color;
                if (value >= 200) {
                    color = 'rgba(215, 25, 28, 0.5)';
                } else if (value >= 160) {
                    color = 'rgba(235, 140, 14, 0.5)';
                } else if (value >= 120) {
                    color = 'rgba(255, 255, 0, 0.5)';
                } else if (value >= 80) {
                    color = 'rgba(140, 202, 32, 0.5)';
                } else if (value >= 40) {
                    color = 'rgba(25, 150, 65, 0.5)';
                }
                return color;
            }
        
        }

        const testSDK = () => {

            var heatGradientData;
            var maxPopulation: number = 10000000;

            Microsoft.Maps.loadModule(
                'Microsoft.Maps.SpatialDataService',
                () => {
                    var worldBounds = Microsoft.Maps.LocationRect.fromEdges(90, -180, -90, 180);
                    //Get all states by doing an intersection test against a bounding box of the world and have up to 52 results returned.
                    var queryOptions = {
                        queryUrl: 'https://spatial.virtualearth.net/REST/v1/data/755aa60032b24cb1bfb54e8a6d59c229/USCensus2010_States/States',
                        spatialFilter: {
                            spatialFilterType: 'intersects',
                            intersects: worldBounds
                        },
                        top: 52
                    };
                    console.log("queryOptions => ", queryOptions);
                    Microsoft.Maps.SpatialDataService.QueryAPIManager.search(
                        queryOptions,
                        map,
                        (data) => {
                            //Loop through results and set the fill color of the polygons based on the population property.
                            for (var i = 0; i < data.length; i++) {
                                data[i].setOptions({
                                    fillColor: '#84D361'//getLegendColor(data[i].metadata.Population, maxPopulation)
                                });
                                //Add a click event to each polygon and display metadata.
                                Microsoft.Maps.Events.addHandler(data[i], 'click', function (e) {
                                    alert(e.target.metadata.Name + '\r\nPopulation: ' + e.target.metadata.Population);
                                });
                            }
                            //Add results to the map.
                            map.entities.push(data);
                        }
                    );
                }
            );

            // function createLegend(maxValue) {
            //     var canvas = document.getElementById('legendCanvas');
            //     var ctx = canvas.getContext('2d');
            //     //Create a linear gradient for the legend.
            //     var colorGradient = {
            //         '0.00': 'rgba(0,255,0,255)',    // Green
            //         '0.50': 'rgba(255,255,0,255)',  // Yellow
            //         '1.00': 'rgba(255,0,0,255)'     // Red
            //     };
            //     var grd = ctx.createLinearGradient(0, 0, 256, 0);
            //     for (var c in colorGradient) {
            //         grd.addColorStop(c, colorGradient[c]);
            //     }
            //     ctx.fillStyle = grd;
            //     ctx.fillRect(0, 0, canvas.width, canvas.height);
            //     //Store the pixel information from the legend.
            //     heatGradientData = ctx.getImageData(0, 0, canvas.width, 1);
            // }
            function getLegendColor(value, maxValue): string {
                value = (value > maxValue) ? maxValue : value;
                //Calculate the pixel data index from the ratio of value/maxValue.
                var idx = Math.round((value / maxValue) * 256) * 4 - 4;
                if (idx < 0) {
                    idx = 0;
                }
                //Create an RGBA color from the pixel data at the calculated index.
                return 'rgba(' + heatGradientData.data[idx] + ',' + heatGradientData.data[idx + 1] + ',' + heatGradientData.data[idx + 2] + ',' + '0.5)';
            }
            
        }

        const plotStates = () => {

            //Create an array of locations to get the boundaries of
            var zipCodes = ['98116', '98136', '98106', '98126', '98108', '98118'];

            var states = [];
            US_State_Literacy.forEach(function(dict, i) {
                states.push(dict['stateName']);
            });

            var geoDataRequestOptions = {
                entityType: 'AdminDivision1',
                getAllPolygons: true
            };
            
            Microsoft.Maps.loadModule(
                'Microsoft.Maps.SpatialDataService',
                function () {
                    //Use the GeoData API manager to get the boundary
                    Microsoft.Maps.SpatialDataService.GeoDataAPIManager.getBoundary(
                        states,
                        geoDataRequestOptions,
                        map,
                        function (data) {
                            if (data.results && data.results.length > 0) {
                                // var info = US_State_Literacy.indexOf(data['location']) ;
                                var info = US_State_Literacy.filter( obj => {
                                    return obj["stateName"] === data["location"]
                                })
                                console.log('info ', info[0]);

                                var polygon = data.results[0].Polygons;
                                console.log('polygons ',polygon);
                                // data.results[0].Polygons.setOptions({fillcolor: '#84D361', strokeColor: 'black'});
                                for (var i = 0; i < data.results[0].Polygons.length; i++) {
                                    // console.log("info do polygon", info[0]);
                                    data.results[0].Polygons[i].setOptions({
                                            fillColor: getLegendColor(parseInt(info[0]['lackingLiteracy'])),//'#84D361',
                                            strokeColor: 'black'
                                    })
                                }
                                map.entities.push(data.results[0].Polygons);
                            }
                        },
                        null,
                        function errCallback(callbackState, networkStatus, statusMessage) {
                            console.log(callbackState);
                            console.log(networkStatus);
                            console.log(statusMessage);
                        }
                    );
                }
            );

            const getLegendColor = (val) => {
                if(val >= 20){
                    return 'rgba(189,0,38,0.8)';
                }else if(val >= 15){
                    return 'rgba(227,26,28,0.8)';
                }else if(val >= 10){
                    return 'rgba(253,141,60,0.8)';
                }else if(val >= 5){
                    return 'rgba(254,217,118,0.8)';
                }else {
                    return 'rgba(255,255,204,0.8)';
                }
            }
  

        }

        // if (props.localBoundary){
        //     searchAndLoadGeometry();
        // }
        if (props.visibleContourLayer){
            loadContour();
            // objLayers['layer_Contour'].setVisible(false);

        }
        plotStates();
        // searchBoundariesAndLoadChoropleth();

        return map;
    }

    useEffect( () => {
        console.log("from bingmaps ",props.visibleContourLayer)
        loadBingApi("AjMWCAtX2R3I4Pk26FRpsm6_SALJxWdGOjIy80CG0uSPdkpzbp3ps9wD6MZ_Hdh7").then( () => {
            initMap();

            console.log("Microsoft = ", Microsoft)
        })

    });


    return (
        <div id="myMap"></div>
    )
    
}