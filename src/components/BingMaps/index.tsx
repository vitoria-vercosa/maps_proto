import { useEffect } from 'react';
import { fadedMap, blackWhiteMap, earthquakeData, US_State_Literacy } from './conf';
import { loadBingApi, Microsoft } from './loaderBingMaps';
// import { Search, getBoundary } from './BoundaryFunctions';
import colorscale from './colorscale.json';
import styles from './styles.module.scss';

export function BingMaps(props){

    var searchManager;

    // Returns a single rgb color interpolation between given rgb color
    // based on the factor given; via https://codepen.io/njmcode/pen/axoyD?editors=0010
    const interpolateColor = (color1, color2, factor) => {
        // if (arguments.length < 3) { 
        //     factor = 0.5; 
        // }
        var result = color1.slice();
        for (var i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return result;
    };
    // My function to interpolate between two colors completely, returning an array
    const interpolateColors = (color1, color2, steps) => {
        var stepFactor = 1 / (steps - 1),
            interpolatedColorArray = [];

        color1 = color1.match(/\d+/g).map(Number);
        color2 = color2.match(/\d+/g).map(Number);

        for(var i = 0; i < steps; i++) {
            interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
        }

        return interpolatedColorArray;
    }

    var colors = interpolateColors(colorscale.inferno[0],colorscale.inferno[1], 5);

    const initMap = () => {
        
        // const map = new Microsoft.Maps.Map('#myMap', {mapTypeId: Microsoft.Maps.MapTypeId.grayscale})
        // return map.setOptions({ customMapStyle: fadedMap });

        const map = new Microsoft.Maps.Map('#myMap', { 
            // customMapStyle: fadedMap, 
            // customMapStyle: blackWhiteMap, 
            mapTypeId: Microsoft.Maps.MapTypeId.canvasLight,
            // center: new Microsoft.Maps.Location(0, 0),
            // center: new Microsoft.Maps.Location(-3.71722, -38.54306),
            // center: new Microsoft.Maps.Location(-3.7, -38),
            zoom: 3 
        });

        const dataLayer = new Microsoft.Maps.EntityCollection();
        map.entities.push(dataLayer);
        
        const infoboxLayer = new Microsoft.Maps.EntityCollection();
        map.entities.push(infoboxLayer);

        var objLayers = {
            'layer_Boundary' : new Microsoft.Maps.Layer(),
            'layer_Choropleth' : new Microsoft.Maps.Layer(),
            'layer_infobox': new Microsoft.Maps.Layer()
        }

        // how to use a layer
        {
            /*
                //Create a layer.
                var layer = new Microsoft.Maps.Layer();

                //Add some data to it.
                layer.add(Microsoft.Maps.TestDataGenerator.getPushpins(5, map.getBounds()));
                layer.add(Microsoft.Maps.TestDataGenerator.getPolygons(2, map.getBounds()));
                layer.add(Microsoft.Maps.TestDataGenerator.getPolylines(2, map.getBounds()));

                //Add layer to map.
                map.layers.insert(layer);
            */
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

                    // doc GeoDataRequestOptions 
                    {
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
                    }
                    var geoDataRequestOptions = {
                        lod : 1, 
                        getAllPolygons: true,
                        // entityType: "PopulatedPlace"
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
                    
                    /*
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
                    */
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
                    // color = 'rgba(215, 25, 28, 0.5)';
                    color = 'rgba('+colors[0]+',0.5)';
                } else if (value >= 160) {
                    // color = 'rgba(235, 140, 14, 0.5)';
                    color = 'rgba('+colors[1]+',0.5)';
                } else if (value >= 120) {
                    // color = 'rgba(255, 255, 0, 0.5)';
                    color = 'rgba('+colors[2]+',0.5)';
                } else if (value >= 80) {
                    // color = 'rgba(140, 202, 32, 0.5)';
                    color = 'rgba('+colors[3]+',0.5)';
                } else if (value >= 40) {
                    // color = 'rgba(25, 150, 65, 0.5)';
                    color = 'rgba('+colors[4]+',0.5)';
                }
                return color;
            }
        
        }

        const plotChoropleth = () => {
           
            //Create an array of locations to get the boundaries of
            var zipCodes = ['98116', '98136', '98106', '98126', '98108', '98118'];

            // var colors = interpolateColors(rocket[0],rocket[1], 5);
            // var colors = interpolateColors(colorscale.rocket[0],colorscale.rocket[1], 5);

            var states = [];
            US_State_Literacy.forEach(function(dict, i) {
                states.push(dict['stateName']);
            });

            var infobox = new Microsoft.Maps.Infobox(
                new Microsoft.Maps.Location(0,0), 
                {visible: false}
            );
            
            // infoboxLayer.push(infobox);
            objLayers.layer_infobox.add(infobox);
            map.layers.insert(objLayers.layer_infobox);

            var geoDataRequestOptions = {
                entityType: 'AdminDivision1',
                getAllPolygons: true
            };

            const displayInfobox = (e) => {
                if (e.target){
                    var point = new Microsoft.Maps.Point(e.getX(), e.getY());

                    console.log("O LOCAL QUE EU CLIQUEI ", [e.getX(),e.getY()]);
                    var loc = map.tryPixelToLocation(point);

                    infobox.setLocation(loc);

                    var opt = e.target.metadata;

                    if(opt){

                        // if(e.target.getIcon){ //is pushpin
                        //     opt.offset = new Microsoft.Maps.Point(0,20);
                        // }else{
                        //     opt.offset = new Microsoft.Maps.Point(0,0);
                        // }

                        opt.visible = true;
                        infobox.setOptions(opt);
                    }
                }
            }

            const createLegend = () => {
                //Create HTML for legend
                var legendHtml = [],
                    max = 20,
                    increment = 5;
        
                for (var i = max; i >= 0; i -= increment) {
                    legendHtml.push('<svg width="12" height="12"><rect width="12" height="12" style="fill:');
                    legendHtml.push(getLegendColor(i), '"></rect></svg> ');
                    legendHtml.push((i == max) ? i + '+' : i + '-' + (i + increment), '<br/>');
                }
        
                document.getElementById('legend').innerHTML = legendHtml.join('');
            }


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
                                // console.log('info ', info[0]);

                                var polygon = data.results[0].Polygons;
                                // console.log('polygons ',polygon[0]["geometry"]["boundingBox"]["center"]);

                                polygon.metadata = {
                                    title: info[0].stateName,
                                    description: "Lacking Literacy : " + info[0].lackingLiteracy
                                }

                                // data.results[0].Polygons.setOptions({fillcolor: '#84D361', strokeColor: 'black'});
                                for (var i = 0; i < data.results[0].Polygons.length; i++) {
                                    // console.log("location ", data.results[0].Polygons[i].getLocations());
                                    // middle= calcMiddlePoint(data.results[0].Polygons[i].getLocations());

                                    data.results[0].Polygons[i].setOptions({
                                            fillColor: getLegendColor(parseInt(info[0]['lackingLiteracy'])),//'#84D361',
                                            strokeColor: 'black'
                                    })
                                    
                                }

                                // dataLayer.push(polygon)
                                objLayers.layer_Choropleth.add(polygon);
                                map.layers.insert(objLayers.layer_Choropleth);

                                                                
                                // Microsoft.Maps.Events.addHandler(data.results[0].Polygons, 'click', displayInfobox);
                                // Microsoft.Maps.Events.addHandler(polygon, 'click', () => {alert("OTARIA")});

                                {/*
                                const pushPolygonClicked = (e) => {
                                    //Make sure the infobox has metadata to display.
                                    if (e.target.metadata) {
                                        //Set the infobox options with the metadata of the pushpin.
                                        infobox.setOptions({
                                            location: e.target.getLocation(),
                                            title: e.target.metadata.title,
                                            description: e.target.metadata.description,
                                            visible: true
                                        });
                                    }
                                }

                                // Microsoft.Maps.Events.addHandler(polygon, 'click', pushPolygonClicked);
                                    
                                // map.entities.push(data.results[0].Polygons);
                                // map.entities.push(polygon);
                                    // infobox.setMap(map);
                                */}
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
                    // return '#00bc25';//'rgba(189,0,38,0.6)'; //#bc0025 #2500bc #00bc25
                    return 'rgba('+colors[0]+',0.5)'
                }else if(val >= 15){
                    // return '#19e31b';//'rgba(227,26,28,0.6)'; //#e3191b #191be3 #19e31b
                    return 'rgba('+colors[1]+',0.5)'
                }else if(val >= 10){
                    // return '#3cfd8c';//'rgba(253,141,60,0.6)'; //#fd8c3c #3c8cfd #3cfd8c
                    return 'rgba('+colors[2]+',0.5)'
                }else if(val >= 5){
                    // return '#75fdd9';//'rgba(254,217,118,0.6)'; //#fdd975 #75d9fd #75fdd9
                    return 'rgba('+colors[3]+',0.5)'
                }else {
                    // return '#cbffdd';//'rgba(255,255,204,0.6)'; //#ffffcb #cbffff #cbffdd
                    return 'rgba('+colors[4]+',0.5)'
                }
            }

            // createLegend();

        }

        if (props.localBoundary != ''){
            searchAndLoadGeometry();
        }
        // if (props.visibleContourLayer){
        loadContour();
            // objLayers['layer_Contour'].setVisible(false);
        // }
        plotChoropleth();
        // searchBoundariesAndLoadChoropleth();

        return map;
    }

    useEffect( () => {
        loadBingApi("AjMWCAtX2R3I4Pk26FRpsm6_SALJxWdGOjIy80CG0uSPdkpzbp3ps9wD6MZ_Hdh7").then( () => {
            initMap();
        })

    });


    return (
            <div id="myMap" className={styles.mapContainer}></div>
    )
    
}