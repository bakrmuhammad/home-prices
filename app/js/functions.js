'use strict';
		
	// SET GLOBAL LAYERS TO NULL
	var income,
		$zipData,
        $houseLayer 	    		= null,
        $condoLayer 	    		= null,
        $percentHouseLayer 			= null,
        $percentCondoLayer 			= null,
        $crimeLayer 				= null,
        $schoolLayer 				= null,
        $defaultHouseLayer  		= null,
        $defaultCondoLayer  		= null,
        $defaultPercentHouseLayer 	= null,
        $defaultPercentCondoLayer 	= null,
        $defaultCrimeLayer  		= null,
        $defaultSchoolLayer 		= null;

	// MAKE TILE LAYER FOR ZOOMED IN VIEW
	var tiles = new L.StamenTileLayer('toner-lite');


	// WIDTHS
	var mobile = 400;
	var w = window.innerWidth;

	function fixPosition () {
		if (w > mobile) {
			return [25.82, -79.85];
		}

		else {
			return [25.50, -80.20];
		}
	}

	function fixZoom () {

		if (w > mobile) {
			return 9.5
		}

		else {
			return 8.5
		}
	}

	var coordinates = fixPosition();
	var lat = coordinates[0];
	var lon = coordinates[1];

	// BUILD MAP
	var map = new L.Map('map-container', {
		center: new L.LatLng(lat,lon),
		zoom: fixZoom(),
		minZoom: 7,
		maxZoom: 16,
		zoomControl: false,
		doubleClickZoom: false,
		VML: true,
		scrollWheelZoom: false
	}).addLayer(tiles);






	// ADD CONTROLS
	var control = L.control.zoom({'position' : 'topleft'});

	control.addTo(map);

	// ========================
	// BUILD DEFAULT HOUSE MAP
	// ========================

	// SET DEFAULT HOUSE LAYER COLORS
	function getDefaultHouseColor (d) {

		if ((d >= 416325 ) && (d <= 3229000 )) {
			return '#006d2c';
		}
		else if ((d >= 274250 ) && (d <= 416324)) {
			return '#31a354';
		}
		else if ((d >= 191975 ) && (d <= 274249)) {
			return '#74c476';
		}
		else if ((d >= 1  ) && (d <= 191974)) {
			return '#bae4b3';
		}
		else {
			// return '#edf8e9';
			return '#ccc'
		}
	}

	// SET DEFAULT HOUSE STYLES
	function defaultHouseStyle (features, layer) {
	    return {
	        fillColor: getDefaultHouseColor(features.properties.housePriceFifteen),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	// CREATE DEFAULT HOUSE VARIABLE
	var $defaultHouseLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultHouseStyle });

	// ADD DEFAULT LAYER TO MAP
	// THIS IS FIRST LAYER USERS WILL SEE
	map.addLayer($defaultHouseLayer);

	// ========================
	// BUILD DEFAULT CONDO MAP
	// ========================

	function getDefaultCondoColor (d) {

		if ((d >= 203975 ) && (d <= 3102400)) {
			return '#006d2c';
		}
		else if  ((d >= 114150 ) && (d <= 203974)) {
			return '#31a354';
		}
		else if ((d >= 55575  ) && (d <= 114159)){
			return '#74c476';
		}
		else if  ((d >= 1  ) && (d <= 55574)) {
			return '#bae4b3';
		}
		else {
			// return '#edf8e9';
			return '#ccc'
		}
	}

	function defaultCondoStyle (features, layer) {
	    return {
	        fillColor: getDefaultCondoColor(features.properties.condoPriceFifteen),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	var $defaultCondoLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultCondoStyle });

	// ===============================
	// BUILD DEFAULT HOUSE PERCENT MAP
	// ===============================

	function getDefaultHousePercentColor (d) {

		if ((d >= 0.11 ) && (d <= 0.27 )) {
			return '#08519c';
		}
		else if ((d >= 0.08 ) && (d < 0.11)) {
			return '#3182bd';
		}
		else if ((d >= 0.04 ) && (d < 0.08)) {
			return '#6baed6';
		}
		else if ((d >= 0.00  ) && (d < 0.04)) {
			return '#bdd7e7';
		}
		else {
			// return '#eff3ff';
			return '#ccc'
		}
	}

	function defaultHousePercentStyle (features, layer) {
	    return {
	        fillColor: getDefaultHousePercentColor(features.properties.housePercent),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	// SET DEFAULT LAYER
	var $defaultPercentHouseLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultHousePercentStyle });


	// ===============================
	// BUILD DEFAULT CONDO PERCENT MAP
	// ===============================
	function getDefaultCondoPercentColor (d) {

		if ((d >= 0.080 ) && (d <= 0.250 )) {
			return '#08519c';
		}
		else if ((d >= 0.057 ) && (d <= 0.079)) {
			return '#3182bd';
		}
		else if ((d >= 0.000 ) && (d <= 0.056)) {
			return '#6baed6';
		}
		else if ((d >= -0.03  ) && (d <= -0.01)) {
			return '#bdd7e7';
		}
		else {
			// return '#eff3ff';
			return '#ccc'
		}
	}

	function defaultCondoPercentStyle (features, layer) {
	    return {
	        fillColor: getDefaultCondoPercentColor(features.properties.condoPercent),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	var $defaultPercentCondoLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultCondoPercentStyle });


	// ========================
	// BUILD DEFAULT CRIME MAP
	// ========================

	function getDefaultCrimeColor (d) {

		if ((d >= 202 ) && (d <= 400)) {
			return '#a50f15';
		}
		else if  ((d >= 143 ) && (d <= 201)) {
			return '#de2d26';
		}
		else if ((d >= 98  ) && (d <= 142)){
			return '#fb6a4a';
		}
		else if  ((d >= 1  ) && (d <= 97)) {
			return '#fcae91';
		}
		else {
			// return '#fee5d9';
			return '#ccc'
		}
	}

	function defaultCrimeStyle (features, layer) {
	    return {
	        fillColor: getDefaultCrimeColor(features.properties.crime),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	var $defaultCrimeLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultCrimeStyle });

	// ========================
	// BUILD DEFAULT SCHOOL MAP
	// ========================

	function getDefaultSchoolColor (d) {

		if (d >= 4 ) {
			return '#f2f0f7';
		}
		else if  ((d >= 3 ) && (d <= 3.9)) {
			return '#f2f0f7';
		}
		else if ((d >= 2  ) && (d <= 2.9)){
			return '#9e9ac8';
		}
		else if  ((d > 1  ) && (d <= 1.9)) {
			return '#756bb1';
		}
		else if  ((d > 0.1  ) && (d <= 0.9)) {
			return '#54278f';
		}
		else {
			return '#ccc';
		}
	}

	function defaultSchoolStyle (features, layer) {
	    return {
	        fillColor: getDefaultSchoolColor(features.properties.schoolGrade),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	var $defaultSchoolLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultSchoolStyle });


	// ================
	// BUILD HOUSE MAP
	// ================
	function getHouseColor (d) {

		if (income > d) {
			return '#006d2c';
		}

		else {
			return '#ccc';
		}
	}

	// function getHouseOpacity(d) {
	// 	if (income > d) {
	// 		return 0.7;
	// 	}
	// 	else {
	// 		return 0
	// 	}
	// }

	// function getHouseDashColor(d) {
	// 	if (income > d) {
	// 		return 'white';
	// 	}
	// 	else {
	// 		return 'none'
	// 	}
	// }

	function houseStyle (features, layer) {
	    return {
	        fillColor: getHouseColor(features.properties.housePriceFifteen),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        // color: getHouseDashColor(features.properties.housePriceFifteen),
	        dashArray: '3',
	        fillOpacity:0.7
	        // fillOpacity: getHouseOpacity(features.properties.housePriceFifteen)
	    };
	}

	// ========================
	// BUILD DEFAULT CONDO MAP
	// ========================
	function getCondoColor (d) {

		if (income > d) {
			return '#006d2c';
		}
		
		else {
			return '#ccc';
		}
	}

	// function getCondoOpacity(d) {
	// 	if (income > d) {
	// 		return 0.7;
	// 	}
	// 	else {
	// 		return 0
	// 	}
	// }

	// function getCondoDashColor(d) {
	// 	if (income > d) {
	// 		return 'white';
	// 	}
	// 	else {
	// 		return 'none'
	// 	}
	// }

	function condoStyle (features, layer) {
	    return {
	        fillColor: getCondoColor(features.properties.condoPriceFifteen),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        // color: getCondoDashColor(features.properties.condoPriceFifteen),
	        dashArray: '3',
	        fillOpacity: 0.7
	        // fillOpacity: getCondoOpacity(features.properties.condoPriceFifteen)
	    };
	}

	// ========================
	// BUILD HOUSE PERCENT MAP
	// ========================

	function getHousePercentColor (price, d) {

		if ((income >= price) && (d >= 0.27 )) {
			return '#08519c';
		}
		else if ((income >= price) && ((d >= 0.12 ) && (d <= 0.26 ))) {
			return '#3182bd';
		}
		else if ((income >= price)&& ((d >= 0.084 ) && (d <= 0.11))) {
			return '#6baed6';
		}
		else if ((income >= price) && ((d >= 0.044 ) && (d <= 0.083))) {
			return '#bdd7e7';
		}
		else if ((income >= price) && ((d > 0.0  ) && (d <= 0.043))) {
			return '#eff3ff';
		}
		else {
			return '#ccc';
		}
	}

	function housePercentStyle (features, layer) {
	    return {
	        fillColor: getHousePercentColor(features.properties.housePriceFifteen,features.properties.housePercent),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	// ========================
	// BUILD CONDO PERCENT MAP
	// ========================

	function getCondoPercentColor (price, d) {

		if ((income >= price) && (d >= 0.25 )) {
			return '#08519c';
		}
		else if ((income >= price) && ((d >= 0.08 ) && (d <= 0.24  ))) {
			return '#3182bd';
		}
		else if ((income >= price) && ((d >= 0.06 ) && (d <= 0.08))) {
			return '#6baed6';
		}
		else if ((income >= price) && ((d >= 0.0 ) && (d <= 0.06))) {
			return '#bdd7e7';
		}
		else if ((income >= price) && ((d >= -0.03 ) && (d <= -0.01))) {
			return '#bdd7e7';
		}
		else {
			return '#ccc';
		}
	}

	function condoPercentStyle (features, layer) {
	    return {
	        fillColor: getCondoPercentColor(features.properties.condoPriceFifteen,features.properties.condoPercent),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	// ================
	// BUILD CRIME MAP
	// ================

	function getCrimeColor (crime, house, condo) {

		// SET VARIBLES TO GET CRIME
		var incomeInput    = $('.income-box').val(),
      houseCheckbox  = $('.house:checkbox'),
      condoCheckbox  = $('.condo:checkbox'),
      houseCheck 	   = (houseCheckbox.is(':checked')),
      condoCheck 	   = (condoCheckbox.is(':checked')),
      inputEmpty 	   = (incomeInput === '');

		// CEHCK IF HOUSE OR CONDO IS CHECKED 	
		if ((houseCheck === true) && ((condoCheck === false) && (inputEmpty === false))) {

			
			if ((income >= house) && ((crime >= 202 ) && (crime <= 400)))  {
				return '#a50f15';
			
			}

			else if ((income >= house) && ((crime >= 143 ) && (crime <= 201))) {
				return '#de2d26';
			}

			else if ((income >= house) && ((crime >= 98 ) && (crime <= 142))) {
				return '#fb6a4a';
			}

			else if ((income >= house) && ((crime >= 1 ) && (crime <= 97))) {
				return '#fcae91';
			}

			else {
				return '#ccc';
			}

		}

		else if ((houseCheck === false) && ((condoCheck === true) && (inputEmpty === false))) {

			if ((income >= condo) && ((crime >= 202 ) && (crime <= 400)))  {
				return '#a50f15';
			
			}

			else if ((income >= condo) && ((crime >= 143 ) && (crime <= 201))) {
				return '#de2d26';
			}

			else if ((income >= condo) && ((crime >= 98 ) && (crime <= 142))) {
				return '#fb6a4a';
			}

			else if ((income >= condo) && ((crime >= 1 ) && (crime <= 97))) {
				return '#fcae91';
			}

			else {
				return '#ccc';
			}
		}
	}

	function crimeStyle (features, layer) {
	    return {
	        fillColor: getCrimeColor(features.properties.crime,features.properties.housePriceFifteen, features.properties.condoPriceFifteen),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}

	// ========================
	// BUILD DEFAULT SCHOOL MAP
	// ========================
	function getSchoolColor (school, house, condo) {

		var incomeInput    = $('.income-box').val(),
			houseCheckbox  = $('.house:checkbox'),
			condoCheckbox  = $('.condo:checkbox'),
			houseCheck 	   = (houseCheckbox.is(':checked')),
			condoCheck 	   = (condoCheckbox.is(':checked')),
			inputEmpty 	   = (incomeInput === '');

		if ((houseCheck === true) && ((condoCheck === false) && (inputEmpty === false))) {

			if ((income >= house) && (school === 4))  {
				return '#f2f0f7';
			}
			else if ((income >= house) && ((school >= 3.0 ) && (school <= 3.9))) {
				return '#cbc9e2';
			}

			else if ((income >= house) && ((school >= 2.0 ) && (school <= 2.9))) {
				return '#9e9ac8';
			}
			else if ((income >= house) && ((school > 1 ) && (school <= 1.9))) {
				return '#756bb1';
			}
			else if ((income >= house) && ((school >= 0.1 ) && (school <= 0.9))) {
				return '#54278f';
			}
			else {
				return '#ccc';
			}
		}

		else if ((houseCheck === false) && ((condoCheck === true) && (inputEmpty === false))) {

			if ((income >= condo) && (school === 4))  {
				return '#f2f0f7';
			}
			else if ((income >= condo) && ((school >= 3.0 ) && (school <= 3.9))) {
				return '#cbc9e2';
			}
			else if ((income >= condo) && ((school >= 2.0 ) && (school <= 2.9))) {
				return '#9e9ac8';
			}
			else if ((income >= condo) && ((school > 1 ) && (school <= 1.9))) {
				return '#756bb1';
			}
			else if ((income >= condo) && ((school >= 0.1 ) && (school <= 0.9))) {
				return '#54278f';
			}
			else {
				return '#ccc';
			}
		}			
	}

	function schoolStyle (features, layer) {
	    return {
	        fillColor: getSchoolColor(features.properties.schoolGrade,features.properties.housePriceFifteen, features.properties.condoPriceFifteen),
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.7
	    };
	}


	//====================================
	// 				HOVER BOX
	//====================================

	// SET POSITION OF HOVER BOX ON MOUSEMOVE
	function getPos (event) {
		var w = $('#map-container').width(),
			h = $('#map-container').height(),
			posX = event.pageX + 20,
			posY = event.pageY - 150,
			x = 0,
			y = 0;

		// HORIZONTAL CONDITIONS
		if (posX < w) {
			x = posX - 150;
		}
		else {
			x = posX - ($('#hover-box').outerWidth(true) + 100);
		}

		// VERTICAL CONDITIONS
		if (posY > h) {
			y = (posY - $('#hover-box').outerHeight(true) - 375);
		}
		else {
			y = posY;
		}

		// HOVER BOX CSS	
		$('#hover-box').css({
			'left': x,
			'top': y + 150
		});
	}

	// ACTIVATE HOVER
	function initHover () {
		$('#hover-box').show();
		$(document).bind('mousemove', getPos);
	}

	// END HOVER
	function endHover () {
		$('#hover-box').hide();
		$(document).unbind('mousemove', getPos);
	}

	//====================================
	// 				NUMBERS
	//====================================

	// Get money that can be spent on housing
	function getIncome (num) {
		var income = parseFloat(num.replace(',','') * 3.5);

		$('.income').html('$' + num);
		
		return income;
	}

	// Change number to dollar
	function numberChange (number) {
		if (number === 'N/A') {
			return 'N/A';
		}
		else {
			return '$' + $.number(number);
		}
	}

	// Format increase/decrease percentage
	function percentChange (number) {

		if ((number < 1) && (number >=0)) {		
			var percent = Math.floor(number * 100);
			if (percent > 0) {
				return '+' + percent + '%';
			}
			else if (number === 'N/A') {		
				return 'N/A';
			}
			else if (percent === 0) {
				return 0 + '%';
			}
			else {
				return percent + '%';				
			}
		}

		else {
			var percent = Math.floor(number);
			if (percent > 0) {
				return '+' + percent + '%';
			}
			else if (number === 'N/A') {
				return 'N/A';				
			}
			else if (percent === 0) {
				return 0 + '%';
			}
			else {
				return percent + '%';
			}
		}
	}

	//====================================
	// INCOME INPUT AND HOUSING SELECTION
	// 			ERROR HANDLING
	//====================================

	function flagError () {
		$('.error').slideDown('fast');
		$('.alert').html('<i class=\'fa fa-info-circle\'></i> Error: Please enter a valid number');
	}

	function flagSelectionError () {
		$('.error').slideDown('fast');
		$('.alert').html('<i class=\'fa fa-info-circle\'></i> Error: Please choose a housing type');
	}

	function removeError () {
		$('.error').slideUp('fast');
	}

	function removeSelectionError () {
		$('.error').slideUp('fast');
	}

	//====================================
	// INCOME INPUT AND HOUSING SELECTION
	//====================================

	function checkInput (income) {

		var incomeInput 	= $('.income-box').val(),
			houseCheckbox 	= $('.house:checkbox'),
			condoCheckbox 	= $('.condo:checkbox'),
			inputBoxError 	= (isNaN(income)) || (incomeInput === ''),
			houseCheck 		= (houseCheckbox.is(':checked')),
			condoCheck 		= (condoCheckbox.is(':checked'));

		// ERROR HANDLING
		if ((inputBoxError === false) && (houseCheck === true ) && (condoCheck === false)) {
			buildHouseMap(income);
			removeError();
		}
		else if (((inputBoxError === true) && ((houseCheck === true) || condoCheck === true ))) {
			flagError();
		}
		else if (((inputBoxError === true) && ((houseCheck === false) && condoCheck === false ))) {
			flagSelectionError();
		}
		else if ((inputBoxError === false) && (houseCheck === false ) && (condoCheck === true)) {
			buildCondoMap(income);
			removeError();
		}
	}

	//=============
	//	MAPS TOOLS
	//=============

	// BUILD KEY
	function buildKey (housing) {

		$('.legend-block').remove();

		if (housing === 'price') {
			var green = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'];
			for (var i = 0; i < green.length; i++) {	
				$('.key').append('<div class=\'legend-block\' style=\'color:' + green[i] + '\'</div>');
			}
			console.log('Build price key');
		}
		else if (housing === 'percent') {
			var blue = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];
			for (var i = 0; i < blue.length; i++) {
				
				$('.key').append('<div class=\'legend-block\' style=\'color:' + blue[i] + '\'</div>');
			}
			console.log('Build percent key');
		}
		else if (housing === 'crime') {
			var red = ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15'];
			for (var i = 0; i < red.length; i++) {
				
				$('.key').append('<div class=\'legend-block\' style=\'color:' + red[i] + '\'</div>');
			}
		}
		else {
			var purple = ['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f'];
			for (var i = 0; i < purple.length; i++) {
				
				$('.key').append('<div class=\'legend-block\' style=\'color:' + purple[i] + '\'</div>');
			}
		}
	}

	function showExplainer () {
		$('.explainer')
			.slideDown('fast')
			.find('span')
			.each(function() {
				$(this).css({
					'color': '#006d2c',
					'font-weight': 'bold'
				});
			});
	}

	function hideExplainer () {
		$('.explainer').slideUp('fast');
	}

	function clearDefaultLayers () {
		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer);		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);
		
		console.log('Clear defaults!');
	}

	function clearAllLayers () {
		map.removeLayer($houseLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($percentCondoLayer);
		map.removeLayer($percentHouseLayer);
		map.removeLayer($crimeLayer);
		map.removeLayer($schoolLayer);
		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer);		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);
		
		console.log('Clear everything!');
	}

	// SECTION FOR EACH ZIP CODE EVENT
	function onEachFeature (feature, layer) {
			
		layer.on({

			mouseover: function(e) {
				var layer = e.target;
				
				layer.setStyle({
					'color': '#666'
				});

				layer.bringToFront();

				initHover();
				
				var zip 				= parseInt(layer.feature.properties.zipcode),
					city 				= layer.feature.properties.cities,
					housePriceFourteen 	= layer.feature.properties.housePriceFourteen,
					housePriceFifteen 	= layer.feature.properties.housePriceFifteen,
					housePercent 		= layer.feature.properties.housePercent,
					condoPriceFourteen 	= layer.feature.properties.condoPriceFourteen,
					condoPriceFifteen 	= layer.feature.properties.condoPriceFifteen,
					condoPercent 		= layer.feature.properties.condoPercent,
					schoolData = layer.feature.properties.school;


				// CHANGE COLOR OF HOUSE AND 
				// CONDO VALUES BY PERCENT

				// CHANGO CONDO 2014 COLOR
				if (condoPriceFourteen === 'N/A') {
					$('.condo-price-fourteen').css('color', '#ccc');
				}

				else {
					$('.condo-price-fourteen').css('color', 'black');
				}

				// CHANGO CONDO 2015 COLOR			
				if (condoPriceFifteen === 'N/A') {
					$('.condo-price-fifteen').css('color', '#ccc');
				}

				else {
					$('.condo-price-fifteen').css('color', 'black');
				}

				// CHANGE HOUSE 2014 COLOR
				if (housePriceFourteen === 'N/A') {
					$('.house-price-fourteen').css('color', '#ccc');
				}

				else {
					$('.house-price-fourteen').css('color', 'black');
				}

				// CHANGE HOUSE 2015 COLOR
				if (housePriceFifteen === 'N/A') {
					$('.house-price-fifteen').css('color', '#ccc');
				}

				else {
					$('.house-price-fifteen').css('color', 'black');
				}

				// CHANGE CONDO PERCENT COLOR
				if (condoPercent > 0) {
					$('.condo-percent').css('color', 'green');
				}

				else if (condoPercent < 0) {
					$('.condo-percent').css('color', 'red');
				}

				else if (condoPercent === 0) {
					$('.condo-percent').css('color', 'black');
				}

				else {
					$('.condo-percent').css('color', '#ccc');
				}

				// CHANGE CONDO PERCENT COLOR
				if (housePercent > 0) {
					$('.house-percent').css('color', 'green');
				}

				else if (housePercent < 0) {
					$('.house-percent').css('color', 'red');
				}

				else if (housePercent === 0) {
					$('.house-percent').css('color', 'black');
				}

				else {
					$('.house-percent').css('color', '#ccc');
				}

				// WRITE DATA FROM GEOJSON FILE
				$('.zip-code').html(zip);
				$('.city').html(city);
				$('.house-price-fourteen').html(numberChange(housePriceFourteen));
				$('.house-price-fifteen').html(numberChange(housePriceFifteen));
				$('.house-percent').html(percentChange(housePercent));
				$('.condo-price-fourteen').html(numberChange(condoPriceFourteen));
				$('.condo-price-fifteen').html(numberChange(condoPriceFifteen));
				$('.condo-percent').html(percentChange(condoPercent));



				if (schoolData === 'N/A') {

					$('.no-school').show();
					$('.school-table').hide()
				}

				else {
					for (var i = 0; i < schoolData.length; i++) {
						$('.no-school').hide();
						$('.school-head').after('<tr class=\'schools-row\'><td class=\'name\'>' + schoolData[i].name + '</td><td>'+ schoolData[i].grade2015 +'</td><td>' + schoolData[i].grade2014 +'</td><td>' + schoolData[i].grade2013+'</td></tr>')
					};

					$('.school-table').show()	
				}

			

			},

			mouseout: function(e) {
				var layer = e.target;
				layer.setStyle({
					color: '#fff'
				});
				endHover();

				$('.schools-row').empty()

			},

			mousemove: function(e){},
			click: function(e) {},
			tap: function(e) {}
		});
	}

	//=============
	//	BUILD MAPS
	//=============

	// START HOUSE MAP ON PAGE LOAD
	function setDefaultMap() {
		buildDefaultHouse();
	}

	function buildDefaultHouse() {
		
		$('.price-select').addClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');

		var price 			= 'price',
			houseCheckbox 	= $('.house:checkbox'),
			houseCheck 		= (houseCheckbox.is(':checked'));

		buildKey(price);

		$('.housing-type')
			.html('Price of single-family houses')
			.css({
				'color': '#006d2c',
				'font-weight': 'bold'
			});
		$('.housing-explainer').html(' in Miami-Dade and Broward counties.');
		$('.percent-year').css('display', 'none');

		// TOGGLE HOVER PRICE TABLES
		if (houseCheck === false) {
			$('#house-price').css({
				'float': 'left',
				'width' : '50%',
				'border-right': '1px dashed #ccc'
			});
			$('#condo-price').css('display', 'block');
		}
		else {
			$('#house-price').css({
					'float': 'none',
					'border': 'none',
					'width' : '100%'
				});
			$('#condo-price').css('display', 'none');
		}

		$('.label-left').html('Least Expensive');
		$('.label-right').html('Most Expensive');

		clearDefaultLayers();
		map.addLayer($defaultHouseLayer);					
	}

	function buildDefaultCondo() {
		$('.price-select').addClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		
		var price = 'price';
		
		buildKey(price);

		$('.housing-type')
			.html('Price of condos')
			.css({
				'color': '#006d2c',
				'font-weight': 'bold'
			});
		$('.housing-explainer').html(' in Miami-Dade and Broward counties.');
		$('.percent-year').css('display', 'none');		
		$('.label-left').html('Least Expensive');
		$('.label-right').html('Most Expensive');

		clearDefaultLayers();
		map.addLayer($defaultCondoLayer);				
	}


	function buildDefaultPercentHouse() {
		
		$('.percent-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');

		var percent 		= 'percent',
			houseCheckbox 	= $('.house:checkbox'),
			houseCheck 		= (houseCheckbox.is(':checked'));

		buildKey(percent);

		// TOGGLE HOVER TABLE PRICE
		if (houseCheck === false) {
			$('#house-price').css({
				'float': 'left',
				'width' : '50%',
				'border-right': '1px dashed #ccc'
			});
			$('#condo-price').css('display', 'block');
		}
		else {
			$('#house-price').css({
					'float': 'none',
					'border': 'none',
					'width' : '100%'
				});
			$('#condo-price').css('display', 'none');
		}

		$('.housing-type')
			.html('Price change of single-family houses')
			.css({
				'color': '#08519c',
				'font-weight': 'bold'
			});
		$('.housing-explainer').html(' in Miami-Dade and Broward counties');
		$('.percent-year').css('display', 'inline');
		$('.label-left').html('0%');
		$('.label-right').html('28%');

		clearDefaultLayers();
		map.addLayer($defaultPercentHouseLayer);					
	}

	function buildDefaultPercentCondo() {
		
		$('.percent-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');

		var percent 		= 'percent',
			condoCheckbox 	= $('.condo:checkbox'),
			condoCheck 		= (condoCheckbox.is(':checked'));

		buildKey(percent);

		if (condoCheck === false) {
			$('#condo-price').css({
				'float': 'right',
				'width' : '50%',
				'border': 'none'
			});
			$('#house-price').css('display', 'block');
		}
		else {
			$('#condo-price').css({
					'float': 'none',
					'border': 'none',
					'width' : '100%'
				});
			$('#house-price').css('display', 'none');
		}

		$('.housing-type')
			.html('Price change of condos')
			.css({
				'color': '#08519c',
				'font-weight': 'bold'
			});

		$('.housing-explainer').html(' in Miami-Dade and Broward counties');
		$('.percent-year').css('display', 'inline');
		$('.label-left').html('-3%');
		$('.label-right').html('25%');

		clearDefaultLayers();
		map.addLayer($defaultPercentCondoLayer);					
	}


	function buildDefaultCrime() {
		
		$('.crime-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');

		var crime = 'crime';
		buildKey(crime);

		$('.label-left').html('Less Crime');
		$('.label-right').html('More Crime');
		$('.housing-type')
			.html('Crime rates ')
			.css({
				'color': '#a50f15',
				'font-weight': 'bold'
			});

		$('.housing-explainer').html(' by ZIP code.');
		$('.percent-year').css('display', 'none');

		clearDefaultLayers();
		map.addLayer($defaultCrimeLayer);					
	}


	function buildDefaultSchool() {
		
		$('.school-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');

		var school = 'school';
		buildKey(school);

		$('.housing')
			.html('School rates')
			.css({
				'color': '#54278f',
				'font-weight': 'bold'
			});
		$('.label-left').html('A');
		$('.label-right').html('F');
		$('.housing-type')
			.html('Average school grade ')
			.css({
				'color': '#54278f',
				'font-weight': 'bold'
			});
		$('.housing-explainer').html(' by ZIP code.');
		$('.percent-year').css('display', 'none');
		
		clearDefaultLayers();
		map.addLayer($defaultSchoolLayer);					
	}


	// BUILD HOUSE MAP
	function buildHouseMap() {

		var incomeInput  = $('.income-box').val(),
			income 		 = getIncome(incomeInput);
			
		$('.income-button').attr('disabled','disabled');
		$('.price-select').addClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');

		d3.csv('../js/libs/data/zips.csv', function(data) {
	  	
			var count = 0;

	  		data.forEach(function(d) {
	  			if (income >= d.housePrice) {		
	  				return count++;
	  			}
	  		});

	  		console.log('Houses:' + count);

	  		$('.income').html('$' + $.number(income));
	  		$('.housing').html('house');
	  		$('.zip-count').html(count);
		});

		$('#interface-container').show();
		$('.key-holder').css('display', 'block');		
		$('.legend-block').remove();
		$('.housing-type')
			.html('Affordable ')
			.css({
				'color': '#006d2c',
				'font-weight': 'bold'
			});
		$('.housing-explainer').html(' single-family houses by ZIP codes.');
		$('.percent-year').css('display', 'none');
		$('.label-left').empty();
		$('.label-right').empty();

		showExplainer();
		clearAllLayers();
		map.addLayer($houseLayer);
	}

	// BUILD CONDO MAP
	function buildCondoMap () {

		var incomeInput = $('.income-box').val(),
			income 		= getIncome(incomeInput);

		$('.income-button').attr('disabled','disabled');
		$('.percent-select').removeClass('selected-interface');
		$('.price-select').addClass('selected-interface');
		$('.key-holder').css('display', 'block');
		$('.legend-block').remove();
		$('.housing-type')
			.html('Affordable ')
			.css({
				'color': '#006d2c',
				'font-weight': 'bold'
			});
		$('.housing-explainer').html(' condos by ZIP codes.');
		$('.percent-year').css('display', 'none');
		$('.label-left').empty();
		$('.label-right').empty();
		
		d3.csv('../js/libs/data/zips.csv', function(data) {
			var count = 0;

	  		data.forEach(function(d) {
	  			if (income >= d.condoPrice) {		
	  				return count++;
	  			}
	  		});

	  		$('#interface-container').show();
	  		$('.income').html('$' + $.number(income));
	  		$('.housing').html('condo');
	  		$('.zip-count').html(count);

	  		console.log('Condos: ' + count);
		});

		clearAllLayers();
		showExplainer();
		map.addLayer($condoLayer);
	}

	function buildHousePercentMap () {

		// var incomeInput = $('.income-box').val(),
		// 	income 		 = getIncome(incomeInput),
		var legendColors = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];

		$('.income-button').attr('disabled','disabled');
		$('.percent-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');
		$('.key-holder').css('display', 'block');
		$('.legend-block').remove();
		$('.housing-type')
			.html('Price change ')
			.css({
				'color': '#08519c',
				'font-weight': 'bold'
			});
		$('.housing-explainer').html(' for single-family houses since 2014 in the ZIP codes you can afford.');
		$('.percent-year').css('display', 'none');
		$('.label-left').html('0%');
		$('.label-right').html('27%');

		for (var i = 0; i < legendColors.length; i++) {	
			$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
		}

		showExplainer();
		clearAllLayers();
		map.addLayer($percentHouseLayer);
	}


	function buildCondoPercentMap () {

		// var incomeInput = $('.income-box').val(),
		// 	income 		= getIncome(incomeInput),
		var	legendColors = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];

		$('.income-button').attr('disabled','disabled');
		$('.percent-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');
		$('.key-holder').css('display', 'block');
		$('.legend-block').remove();
		$('.housing-type')
			.html('Price change ')
			.css({
				'color': '#08519c',
				'font-weight': 'bold'
			});
		$('.housing-explainer').html(' for condos since 2014 in the ZIP codes you can afford.');
		$('.percent-year').css('display', 'none');
		$('.label-left').html('0%');
		$('.label-right').html('27%');

		for (var i = 0; i < legendColors.length; i++) {	
			$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
		}

		clearAllLayers();
		showExplainer();
		map.addLayer($percentCondoLayer);
	}


	function buildCrimeMap () {

		// var incomeInput = $('.income-box').val(),
		// 	income 		= getIncome(incomeInput),
		var	legendColors = ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15'];
		
		$('.income-button').attr('disabled','disabled');
		$('.crime-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');
		$('.key-holder').css('display', 'block');
		$('.legend-block').remove();
		$('.housing-type')
			.html('Crime rates ')
			.css({
				'color': '#a50f15',
				'font-weight': 'bold'
			});
		$('.housing-explainer').html(' for ZIP codes you can afford.');
		$('.percent-year').css('display', 'none');
		$('.label-left').html('Less crime');
		$('.label-right').html('More crime');

		for (var i = 0; i < legendColors.length; i++) {	
			$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
		}

		clearAllLayers();
		map.addLayer($crimeLayer);
	}


	function buildSchoolMap () {

		// var incomeInput = $('.income-box').val(),
		// 	income 		= getIncome(incomeInput),
		var legendColors = ['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f'];

		$('.income-button').attr('disabled','disabled');
		$('.crime-select').removeClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');
		$('.school-select').addClass('selected-interface');
		$('.key-holder').css('display', 'block');
		$('.legend-block').remove();
		$('.housing-type')
			.html('Average school grade ')
			.css({
				'color': '#54278f',
				'font-weight': 'bold'
			});
		$('.housing-explainer').html(' for ZIP codes you can afford.');
		$('.percent-year').css('display', 'none');
		$('.label-left').html('A');
		$('.label-right').html('F');

		for (var i = 0; i < legendColors.length; i++) {	
			$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
		}

		clearAllLayers();
		map.addLayer($schoolLayer);
	}


	//====================================
	// 			MAP LIST
	//====================================

	function buildZipList () {
		d3.json('../js/libs/data/zipcode_test.json', function(data) {

			$.each(data, function(i, val) {

				$('#zip-list ul').append('<li class=\'listing\' data-index=' + i + ' data-zipcode=\''+ data[i].zipcode + '\' data-house-fourteen=\''+data[i].housePriceFourteen+'\' data-house-fifteen=\''+data[i].housePriceFifteen+'\' data-house-percent=\''+data[i].housePercent+'\' data-condo-fourteen=\''+data[i].condoPriceFourteen+'\' data-condo-fifteen=\''+data[i].condoPriceFifteen+'\' data-condo-percent=\''+data[i].condoPercent+'\'><span class =\'hed\'>' + data[i].zipcode + ' – ' + data[i].city + '</span></li>');
				 
				
				$('#zip-list').on('click', '.listing', function(event) {

					if ( $(this).hasClass('active-listing') ) {
						return false;
					}

					$('.hed').css('text-align', 'center');

					var houseFourteen = $(this).attr('data-house-fourteen'),
						houseFifteen  = $(this).attr('data-house-fifteen'),
						housePercent  = $(this).attr('data-house-percent'),
						condoFourteen = $(this).attr('data-condo-fourteen'),
						condoFifteen  = $(this).attr('data-condo-fifteen'),
						condoPercent  = $(this).attr('data-condo-percent');

					$('.listing .inner').remove();
					
					$('.listing').removeClass('active-listing');
					
					$(this).addClass('active-listing');
					
					$(this).append('<div class="inner">' +
					'<div id=\'prices-container\'>'+
					'<div class=\'price col-sm-12 col-xs-12\'>' +
					'<span class=\'hed\'>Average Home Prices</span>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>2014</span>' +
					'<span class=\'price-num\'>'+ numberChange(houseFourteen) +'</span></div>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>2015</span>' +
					'<span class=\'price-num\'>'+ numberChange(houseFifteen) + '</span></div>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>Pct.</span>' +
					'<span class=\'price-num\'>' + percentChange(housePercent) + '</span></div></div>'+
					'<div class=\'price col-sm-12 col-xs-12\'>' +
					'<span class=\'hed\'>Average Condo Prices</span>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>2014</span>' +
					'<span class=\'price-num\'>'+ numberChange(condoFourteen) + '</span></div>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>2015</span>' +
					'<span class=\'price-num\'>'+ numberChange(condoFifteen) + '</span></div>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>Pct.</span>' +
					'<span class=\'price-num\'>'+ percentChange(condoPercent) + '</span></div></div></div>'+'<table class=\'school-list\'><tr class= \'table-head\'><th class=\'name\'>School</th><th>2014-15</th><th>2013-14</th><th>2012-13</th></tr></table>'+'</div>'
					);

					var q = $(this).attr('data-index'),
						schoolData = data[q].school;

					for (var i = 0; i < schoolData.length; i++) {
						
						$('.table-head').after('<tr><td class=\'name\'>' + schoolData[i].name + '</td><td>'+ schoolData[i].grade2015 +'</td><td>' + schoolData[i].grade2014 +'</td><td>' + schoolData[i].grade2013+'</td></tr>');
					}
				});
	  		});

			$('#srcbox').quicksearch('.listing', '.hed');
	
			
			$('#reset').click(function() {
				$('#srcbox').val('');
				$('.listing').removeClass('selected-interface');
			});
		});
	}


