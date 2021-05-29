import { useEffect } from 'react';
import { fadedMap, earthquakeData } from './conf';
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
            'layer_Contour' : new Microsoft.Maps.Layer()
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

            var contourLine1, contourLine2, contourLine3, contourLine4, contourLine5, contourLine6;
            var layer;
            Microsoft.Maps.loadModule(['Microsoft.Maps.Contour', 'Microsoft.Maps.GeoJson'], function () {
                // Earthquake intensity contours of M7.0 – 1km WSW of Kumamoto-shi, Japan (GeoJson source from usgs.gov: http://earthquake.usgs.gov/archive/product/shakemap/us20005iis/us/1467057010522/download/cont_psa03.json)
                var featureCollection = Microsoft.Maps.GeoJson.read(earthquakeData, { polygonOptions: { fillColor: 'rgba(0, 255, 255, 0.3)' } });
                var contourLines = [];
                for (var i = 0; i < featureCollection.length; i++) {
                    contourLines.push(new Microsoft.Maps.ContourLine(featureCollection[i].getLocations(), featureCollection[i].metadata.value));
                }
                layer = new Microsoft.Maps.ContourLayer(contourLines,
                    { colorCallback: assignContourColor, polygonOptions: { strokeColor: 'rgba(255, 255, 255, 0)' } });
                map.layers.insert(layer);
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
            /*
            var earthquakeIntensity = require('../../../public/earthquake_usgs_gov_cont_psa03.json');
            console.log(earthquakeIntensity);

            //Load the Contour and GeoJson modules.
            Microsoft.Maps.loadModule(['Microsoft.Maps.Contour', 'Microsoft.Maps.GeoJson'], function () {
                //Download the contour data from the USGS. Parse the GeoJson earthquake intensity contour data and create contour lines out of them.
                Microsoft.Maps.GeoJson.readFromUrl(earthquakeIntensity, function (data) {

                    var contourLines = [];
                    for (var i = 0; i < data.length; i++) {
                        contourLines.push(new Microsoft.Maps.ContourLine(data[i].getLocations(), data[i].metadata.value));
                    }

                    //Add the contour lines to a contour layer.
                    var contourlayer = new Microsoft.Maps.ContourLayer(contourLines, {
                        colorCallback: assignContourColor,
                        polygonOptions: {
                            //Make the outlines of the contour area transparent.
                            strokeColor: 'rgba(0, 0, 0, 0)'
                        }
                    });

                    //Add the contour layer to the map.
                    map.layers.insert(contourlayer);
                    // objLayers.layer_Contour.add(contourlayer);
                    // map.layers.insert(objLayers.layer_Contour);
                });
            });

            const assignContourColor = (value) => {
                var color = 'rgba(25, 150, 65, 0.5)';
        
                if (value >= 200) {
                    color = 'rgba(215, 25, 28, 0.5)';
                }
                else if (value >= 160) {
                    color = 'rgba(235, 140, 14, 0.5)';
                }
                else if (value >= 120) {
                    color = 'rgba(255, 255, 0, 0.5)';
                }
                else if (value >= 80) {
                    color = 'rgba(140, 202, 32, 0.5)';
                }
        
                return color;
            }
            */
        
        }

        if (props.localBoundary){
            searchAndLoadGeometry();
        }
        loadContour();

        return map;
    }

    useEffect( () => {
        loadBingApi("AjMWCAtX2R3I4Pk26FRpsm6_SALJxWdGOjIy80CG0uSPdkpzbp3ps9wD6MZ_Hdh7").then( () => {
            initMap();

            console.log("Microsoft = ", Microsoft)
        })
    });


    return (
        <div id="myMap"></div>
    )
    
}