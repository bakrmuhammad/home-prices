'use strict';

// SET GLOBAL LAYERS TO NULL
var income;
var $zipData;
var $houseLayer = null;
var $condoLayer = null;
var $percentHouseLayer = null;
var $percentCondoLayer = null;
var $crimeLayer = null;
var $schoolLayer = null;
var $defaultLayer = null;
var $defaultHouseLayer = null;
var $defaultCondoLayer = null;
var $defaultPercentHouseLayer = null;
var $defaultPercentCondoLayer = null;
var $defaultCrimeLayer = null;
var $defaultSchoolLayer = null;

// MAKE TILE LAYER FOR ZOOMED IN VIEW
var tiles = new L.StamenTileLayer('toner-lite');

// MOBILE WIDTHS
var mobile = 843;
var w = window.innerWidth;

// FUNCTIONS TO FIX MAP POSITION
// AND ZOOM ON PAGE LOAD
function fixPosition() {
	if (w >= mobile) {
		return [25.82, -79.85];
	} else {
		return [25.50, -80.20];
	}
}

function fixZoom() {
	if (w > mobile) {
		return 9.5
	} else {
		return 8.75
	}
}

function controlZoom() {
	if (w > mobile) {
		return true;
	} else {
		return false;
	}
}

var coordinates = fixPosition();
var lat = coordinates[0];
var lon = coordinates[1];

// BUILD MAP
var map = new L.Map('map-container', {
	center: new L.LatLng(lat, lon),
	zoom: fixZoom(),
	minZoom: 7,
	maxZoom: 16,
	zoomControl: false,
	doubleClickZoom: false,
	VML: true,
	scrollWheelZoom: controlZoom()
}).addLayer(tiles);

// ADD CONTROLS
var control = L.control.zoom({
	'position': 'topleft'
});
control.addTo(map);

// ========================
// BUILD DEFAULT  GRAY MAP
// ========================

// SET DEFAULT HOUSE STYLES
function defaultLayerColor(features, layer) {
	return {
		fillColor: '#ccc',
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

// CREATE DEFAULT HOUSE VARIABLE
var $defaultLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultLayerColor
});



// ========================
// BUILD DEFAULT HOUSE MAP
// ========================

function getDefaultHouseColor(d) {

	if ((d >= 416325) && (d <= 3229000)) {
		return '#238443';
	} else if ((d >= 274250) && (d <= 416324)) {
		return '#78c679';
	} else if ((d >= 191975) && (d <= 274249)) {
		return '#c2e699';
	} else if ((d >= 1) && (d <= 191974)) {
		return '#ffffcc';
	} else {
		// return '#edf8e9';
		return '#ccc'
	}
}

// SET DEFAULT HOUSE STYLES
function defaultHouseStyle(features, layer) {
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
var $defaultHouseLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultHouseStyle
});

// ADD DEFAULT LAYER TO MAP
// THIS IS FIRST LAYER USERS WILL SEE
map.addLayer($defaultHouseLayer);

// ========================
// BUILD DEFAULT CONDO MAP
// ========================

function getDefaultCondoColor(d) {

	if ((d >= 203975) && (d <= 3102400)) {
		return '#238443';
	} else if ((d >= 114150) && (d <= 203974)) {
		return '#78c679';
	} else if ((d >= 55575) && (d <= 114159)) {
		return '#c2e699';
	} else if ((d >= 1) && (d <= 55574)) {
		return '#ffffcc';
	} else {
		return '#ccc'
	}
}

function defaultCondoStyle(features, layer) {
	return {
		fillColor: getDefaultCondoColor(features.properties.condoPriceFifteen),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

var $defaultCondoLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultCondoStyle
});

// ===============================
// BUILD DEFAULT HOUSE PERCENT MAP
// ===============================

function getDefaultHousePercentColor(d) {

	if ((d >= 0.11) && (d <= 0.27)) {
		return '#2171b5';
	} else if ((d >= 0.08) && (d < 0.11)) {
		return '#6baed6';
	} else if ((d >= 0.04) && (d < 0.08)) {
		return '#bdd7e7';
	} else if ((d >= 0.00) && (d < 0.04)) {
		return '#eff3ff';
	} else {
		return '#ccc'
	}
}

function defaultHousePercentStyle(features, layer) {
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
var $defaultPercentHouseLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultHousePercentStyle
});

// ===============================
// BUILD DEFAULT CONDO PERCENT MAP
// ===============================
function getDefaultCondoPercentColor(d) {

	if ((d >= 0.080) && (d <= 0.250)) {
		return '#2171b5';
	} else if ((d >= 0.057) && (d <= 0.079)) {
		return '#6baed6';
	} else if ((d >= 0.000) && (d <= 0.056)) {
		return '#bdd7e7';
	} else if ((d >= -0.03) && (d <= -0.01)) {
		return '#eff3ff';
	} else {
		return '#ccc'
	}
}

function defaultCondoPercentStyle(features, layer) {
	return {
		fillColor: getDefaultCondoPercentColor(features.properties.condoPercent),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

var $defaultPercentCondoLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultCondoPercentStyle
});

// ========================
// BUILD DEFAULT CRIME MAP
// ========================

function getDefaultCrimeColor(d) {

	if (d > 200) {
		return '#de2d26';
	} else if ((d > 100) && (d < 200)) {
		return '#fc9272';
	} else if ((d > 0) && (d < 100)) {
		return '#fee0d2';
	} else {
		return '#ccc';
	}
}

function defaultCrimeStyle(features, layer) {
	return {
		fillColor: getDefaultCrimeColor(features.properties.crime),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

var $defaultCrimeLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultCrimeStyle
});

// ========================
// BUILD DEFAULT SCHOOL MAP
// ========================

function getDefaultSchoolColor(d) {

	if (d >= 4) {
		return '#54278f';
	} else if ((d >= 3) && (d <= 3.9)) {
		return '#756bb1';
	} else if ((d >= 2) && (d <= 2.9)) {
		return '#9e9ac8';
	} else if ((d > 1) && (d <= 1.9)) {
		return '#cbc9e2';
	} else if ((d > 0.1) && (d <= 0.9)) {
		return '#f2f0f7';
	} else {
		return '#ccc';
	}
}

function defaultSchoolStyle(features, layer) {
	return {
		fillColor: getDefaultSchoolColor(features.properties.schoolGrade),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

var $defaultSchoolLayer = L.geoJson($zipData, {
	onEachFeature: onEachFeature,
	style: defaultSchoolStyle
});

// ====================
// 	BUILD HOUSE MAP
// 
//	Layers appear later
// ====================

// COLORS, OPACITY AND DASH
function getHouseColor(d) {

	if ((d >= 416325) && (d <= 3229000)) {

		if (income >= d) {
			return '#006d2c';
		}

		else {
			return '#ccc';
		}
	} 

	else if ((d >= 274250) && (d <= 416324)) {
		
		if (income >= d) {
			return '#31a354';
		}

		else {
			return '#ccc';
		}
		
	} 

	else if ((d >= 191975) && (d <= 274249)) {
		
		if (income >= d) {
			return '#74c476';
		}

		else {
			return '#ccc';
		}
	} 


	else if ((d >= 1) && (d <= 191974)) {
		
		if (income >= d) {
			return '#bae4b3';
		}

		else {
			return '#ccc';
		}	
	} 

	else {
		return '#ccc'
	}
}


function houseStyle(features, layer) {
	return {
		fillColor: getHouseColor(features.properties.housePriceFifteen),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.7
	};
}

// ========================
// BUILD DEFAULT CONDO MAP
// ========================

function getCondoColor(d) {

	if ((d >= 203975) && (d <= 3102400)) {

		if (income >= d) {
			return '#238443';
		}

		else {
			return '#ccc';
		}
	} 

	else if ((d >= 114150) && (d <= 203974)) {
		
		if (income >= d) {
			return '#78c679';
		}

		else {
			return '#ccc';
		}
		
	} 

	else if ((d >= 55575) && (d <= 114159)) {
		
		if (income >= d) {
			return '#c2e699';
		}

		else {
			return '#ccc';
		}
	} 

	else if ((d >= 1) && (d <= 55574)) {
		
		if (income >= d) {
			return '#ffffcc';
		}
		else {
			return '#ccc';
		}	
	}

	else {
		return '#ccc'
	}
}

function condoStyle(features, layer) {
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

function getHousePercentColor(price, d) {

	if ((income >= price) && (d >= 0.27)) {
		return '#08519c';
	} else if ((income >= price) && ((d >= 0.12) && (d <= 0.26))) {
		return '#3182bd';
	} else if ((income >= price) && ((d >= 0.084) && (d <= 0.11))) {
		return '#6baed6';
	} else if ((income >= price) && ((d >= 0.044) && (d <= 0.083))) {
		return '#bdd7e7';
	} else if ((income >= price) && ((d > 0.0) && (d <= 0.043))) {
		return '#eff3ff';
	} else {
		return '#ccc';
	}
}

function housePercentStyle(features, layer) {
	return {
		fillColor: getHousePercentColor(features.properties.housePriceFifteen, features.properties.housePercent),
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

function getCondoPercentColor(price, d) {

	if ((income >= price) && (d >= 0.25)) {
		return '#08519c';
	} else if ((income >= price) && ((d >= 0.08) && (d <= 0.24))) {
		return '#3182bd';
	} else if ((income >= price) && ((d >= 0.06) && (d <= 0.08))) {
		return '#6baed6';
	} else if ((income >= price) && ((d >= 0.0) && (d <= 0.06))) {
		return '#bdd7e7';
	} else if ((income >= price) && ((d >= -0.03) && (d <= -0.01))) {
		return '#bdd7e7';
	} else {
		return '#ccc';
	}
}

function condoPercentStyle(features, layer) {
	return {
		fillColor: getCondoPercentColor(features.properties.condoPriceFifteen, features.properties.condoPercent),
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

function getCrimeColor(crime, house, condo) {

	// SET VARIBLES TO GET CRIME
	var incomeInput = $('.income-box').val();
	var houseCheckbox = $('.house:checkbox');
	var condoCheckbox = $('.condo:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));
	var condoCheck = (condoCheckbox.is(':checked'));
	var inputEmpty = (incomeInput === '');

	// CEHCK IF HOUSE OR CONDO IS CHECKED 	
	if ((houseCheck === true) && ((condoCheck === false) && (inputEmpty === false))) {

		if ((income >= house) && ((crime > 200))) {
			return '#de2d26';
		} else if ((income >= house) && ((crime > 100) && (crime < 200))) {
			return '#fc9272';
		} else if ((income >= house) && ((crime > 0) && (crime < 100))) {
			return '#fee0d2';
		} else {
			return '#ccc';
		}

	} else if ((houseCheck === false) && ((condoCheck === true) && (inputEmpty === false))) {

		if ((income >= condo) && ((crime > 200))) {
			return '#de2d26';
		} else if ((income >= condo) && ((crime > 100) && (crime < 200))) {
			return '#fc9272';
		} else if ((income >= condo) && ((crime > 0) && (crime < 100))) {
			return '#fee0d2';
		} else {
			return '#ccc';
		}
	}
}

function crimeStyle(features, layer) {
	return {
		fillColor: getCrimeColor(features.properties.crime, features.properties.housePriceFifteen, features.properties.condoPriceFifteen),
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

function getSchoolColor(school, house, condo) {

	var incomeInput = $('.income-box').val();
	var houseCheckbox = $('.house:checkbox');
	var condoCheckbox = $('.condo:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));
	var condoCheck = (condoCheckbox.is(':checked'));
	var inputEmpty = (incomeInput === '');

	if ((houseCheck === true) && ((condoCheck === false) && (inputEmpty === false))) {

		if ((income >= house) && (school === 4)) {
			return '#54278f';
		} else if ((income >= house) && ((school >= 3.0) && (school <= 3.9))) {
			return '#756bb1';
		} else if ((income >= house) && ((school >= 2.0) && (school <= 2.9))) {
			return '#9e9ac8';
		} else if ((income >= house) && ((school > 1) && (school <= 1.9))) {
			return '#cbc9e2';
		} else if ((income >= house) && ((school >= 0.1) && (school <= 0.9))) {
			return '#f2f0f7';
		} else {
			return '#ccc';
		}
	} else if ((houseCheck === false) && ((condoCheck === true) && (inputEmpty === false))) {

		if ((income >= condo) && (school === 4)) {
			return '#54278f';
		} else if ((income >= condo) && ((school >= 3.0) && (school <= 3.9))) {
			return '#756bb1';
		} else if ((income >= condo) && ((school >= 2.0) && (school <= 2.9))) {
			return '#9e9ac8';
		} else if ((income >= condo) && ((school > 1) && (school <= 1.9))) {
			return '#cbc9e2';
		} else if ((income >= condo) && ((school >= 0.1) && (school <= 0.9))) {
			return '#f2f0f7';
		} else {
			return '#ccc';
		}
	}
}

function schoolStyle(features, layer) {
	return {
		fillColor: getSchoolColor(features.properties.schoolGrade, features.properties.housePriceFifteen, features.properties.condoPriceFifteen),
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
function getPos(event) {
	var w = $('#map-container').width();
	var h = $('#map-container').height();
	var posX = event.pageX + 20;
	var posY = event.pageY - 150;
	var x = 0;
	var y = 0;

	// HORIZONTAL CONDITIONS
	if (posX < w) {
		x = posX - 150;
	} else {
		x = posX - ($('#hover-box').outerWidth(true) + 100);
	}

	// VERTICAL CONDITIONS
	if (posY > h) {
		y = (posY - $('#hover-box').outerHeight(true) - 375);
	} else {
		y = posY;
	}

	// HOVER BOX CSS	
	$('#hover-box').css({
		'left': x,
		'top': y + 150
	});
}

// ACTIVATE HOVER
function initHover() {
	$('#hover-box').show();
	$(document).bind('mousemove', getPos);
}

// END HOVER
function endHover() {
	$('#hover-box').hide();
	$(document).unbind('mousemove', getPos);
}

//====================================
// 				NUMBERS
//====================================

// GET MONEY THAT CAN BE SPENT ON HOUSING
function getIncome(num) {

	var incomeCheckbox = $('.income:checkbox');
	var savingsCheckbox = $('.savings:checkbox');
	var incomeCheck = (incomeCheckbox.is(':checked'));
	var savingsCheck = (savingsCheckbox.is(':checked'));

	if (incomeCheck === true && savingsCheck === false) {
		var income = numeral().unformat(num) * 3.5;
		return income;
	} else if (incomeCheck === false && savingsCheck === true) {
		var income = numeral().unformat(num);
		return income;
	}
	$('.income').html('$' + num);
}

// CHANGE NUMBER TO DOLLAR
function numberChange(number) {
	if (number === 'No data') {
		return 'No data';
	} else {
		return '$' + numeral(number).format('0,0');
	}
}

// FORMAT INCREASE/DECREASE PERCENTAGE
function percentChange(number) {

	if ((number < 1) && (number >= 0)) {
		var percent = Math.floor(number * 100);
		if (percent > 0) {
			return '+' + percent + '%';
		} else if (number === 'No data') {
			return 'No data';
		} else if (percent === 0) {
			return 0 + '%';
		} else {
			return percent + '%';
		}
	} else {
		var percent = Math.floor(number);
		if (percent > 0) {
			return '+' + percent + '%';
		} else if (number === 'No data') {
			return 'No data';
		} else if (percent === 0) {
			return 0 + '%';
		} else {
			return percent + '%';
		}
	}
}


// START DAY

// OBJECTIVE:
// FIGURE OUT HOW TO CALCULATE AFFORDABILITY
// FOR MAP SHADING
function getPricePercent(price, percent) {
	var percentage = price * percent;
	var result;
}

//====================================
// INCOME INPUT AND HOUSING SELECTION
// 			ERROR HANDLING
//====================================

function flagError() {
	$('.error').slideDown('fast');
	$('.alert').html('<i class=\'fa fa-info-circle\'></i> Error: Please enter a valid number.');
}

function flagSelectionError() {
	$('.error').slideDown('fast');
	$('.alert').html('<i class=\'fa fa-info-circle\'></i> Error: Please choose house or condo.');
}

function flagMoneyError() {
	$('.error').slideDown('fast');
	$('.alert').html('<i class=\'fa fa-info-circle\'></i> Error: Please choose income or price.');
}

function removeError() {
	$('.error').slideUp('fast');
}

//====================================
// INCOME INPUT AND HOUSING SELECTION
//====================================

function checkInput(income) {

	var incomeInput = $('.income-box').val();
	var houseCheckbox = $('.house:checkbox');
	var condoCheckbox = $('.condo:checkbox');
	var incomeCheckbox = $('.income:checkbox');
	var savingsCheckbox = $('.savings:checkbox');
	var inputBoxError = (isNaN(income)) || (incomeInput === '');
	var houseCheck = (houseCheckbox.is(':checked'));
	var condoCheck = (condoCheckbox.is(':checked'));
	var incomeCheck = (incomeCheckbox.is(':checked'));
	var savingsCheck = (savingsCheckbox.is(':checked'));

	condoCheckbox.attr('disabled', true);
	houseCheckbox.attr('disabled', true);

	// ERROR HANDLING

	// NO ERRORS
	if ((inputBoxError === false) && (houseCheck === true) && (condoCheck === false) && ((incomeCheck === true) || (savingsCheck === true))) {
		buildHouseMap(income);
		removeError();
	}

	// IF NOTHING'S SELECTED. THROW SELECTION ERROR
	else if ((inputBoxError === true) && ((houseCheck === false) && condoCheck === false) && ((incomeCheck === false) && (savingsCheck === false))) {

		condoCheckbox.attr('disabled', false);
		houseCheckbox.attr('disabled', false);

		flagSelectionError();
	}

	// IF PAYMENT AND HOUSING ARE CHECKED, BUT INPUT IS EMPTY
	// THROW NUMBER ERROR
	else if ((inputBoxError === true) && ((houseCheck === true) || condoCheck === true) && ((incomeCheck === true) || (savingsCheck === true))) {
		flagError();
	}

	// IF PAYMENT IS SELECTED AND INPUT IS FILLED, 
	// BUT PAYMENT IS NOT CHECKED, THROW MONEY ERROR
	else if ((inputBoxError === false) && ((houseCheck === true) || condoCheck === true) && ((incomeCheck === false) && (savingsCheck === false))) {
		flagMoneyError();
	}

	// IF ONLY HOUSING IS SELECTED, THROW MONEY ERROR
	else if ((inputBoxError === true) && ((houseCheck === true) || condoCheck === true) && ((incomeCheck === false) && (savingsCheck === false))) {
		flagMoneyError();
	}

	// IF INCOME IS CHECKED AND INPUT IS FILLED,
	// THROW SELECTION ERROR
	else if ((inputBoxError === false) && ((houseCheck === false) && (condoCheck === false)) && ((incomeCheck === true) || (savingsCheck === true))) {
		flagSelectionError();
	}

	// IF ONLY PAYMENT IS SELECTED, THROW SELECTION ERROR
	else if ((inputBoxError === true) && ((houseCheck === false) && (condoCheck === false)) && ((incomeCheck === true) || (savingsCheck === true))) {
		flagSelectionError();
	} else if ((inputBoxError === false) && (houseCheck === false) && (condoCheck === true) && ((incomeCheck === true) || (savingsCheck === true))) {
		buildCondoMap(income);
		removeError();
	}

	var income = getIncome(incomeInput);
	return income;
}

//=============
//	MAPS TOOLS
//=============

// BUILD KEY
function buildKey(housing) {

	$('.legend-block').remove();

	if (housing === 'price') {
		var green = ['#ffffcc', '#c2e699', '#78c679', '#238443'];
		for (var i = 0; i < green.length; i++) {
			$('.key').append('<div class=\'legend-block\' style=\'color:' + green[i] + '\'</div>');
		}
		console.log('Build price key');
	} else if (housing === 'percent') {
		var blue = ['#eff3ff', '#bdd7e7', '#6baed6', '#2171b5'];
		for (var i = 0; i < blue.length; i++) {

			$('.key').append('<div class=\'legend-block\' style=\'color:' + blue[i] + '\'</div>');
		}
		console.log('Build percent key');
	} else if (housing === 'crime') {
		var red = ['#fee0d2', '#fc9272', '#de2d26'];
		for (var i = 0; i < red.length; i++) {

			$('.key').append('<div class=\'legend-block\' style=\'color:' + red[i] + '\'</div>');
		}

		$('.legend-block').css('width', '33%');


	} else {
		var purple = ['#f2f0f7', '#cbc9e2', '#9e9ac8', '#756bb1', '#54278f'];
		for (var i = 0; i < purple.length; i++) {

			$('.key').append('<div class=\'legend-block\' style=\'color:' + purple[i] + '\'</div>');
			$('.legend-block').css('width', '20%');
		}
	}
}

function showExplainer() {
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

function hideExplainer() {
	$('.explainer').slideUp('fast');
}

function clearDefaultLayers() {
	map.removeLayer($defaultLayer);
	map.removeLayer($defaultHouseLayer);
	map.removeLayer($defaultCondoLayer);
	map.removeLayer($defaultPercentHouseLayer);
	map.removeLayer($defaultPercentCondoLayer);
	map.removeLayer($defaultCrimeLayer);
	map.removeLayer($defaultSchoolLayer);
	console.log('Clear defaults!');
}

function clearAllLayers() {
	map.removeLayer($houseLayer);
	map.removeLayer($condoLayer);
	map.removeLayer($percentCondoLayer);
	map.removeLayer($percentHouseLayer);
	map.removeLayer($crimeLayer);
	map.removeLayer($schoolLayer);
	map.removeLayer($defaultLayer);
	map.removeLayer($defaultHouseLayer);
	map.removeLayer($defaultCondoLayer);
	map.removeLayer($defaultPercentHouseLayer);
	map.removeLayer($defaultPercentCondoLayer);
	map.removeLayer($defaultCrimeLayer);
	map.removeLayer($defaultSchoolLayer);
	console.log('Clear everything!');
}



function writeHoverBox (feature,layer) {
	initHover();
	var zip = parseInt(layer.feature.properties.zipcode);
	var city = layer.feature.properties.cities;
	var housePriceFourteen = layer.feature.properties.housePriceFourteen;
	var housePriceFifteen = layer.feature.properties.housePriceFifteen;
	var housePercent = layer.feature.properties.housePercent;
	var condoPriceFourteen = layer.feature.properties.condoPriceFourteen;
	var condoPriceFifteen = layer.feature.properties.condoPriceFifteen;
	var condoPercent = layer.feature.properties.condoPercent;
	var schoolData = layer.feature.properties.school;
	var neighborhoodNames = layer.feature.properties.neighborhoods;
	var crimeRate = layer.feature.properties.crime;
	var schoolGrade = layer.feature.properties.schoolGrade;

	var	crimeRateButton = $('.crime-rate');
	var	schoolTable = $('#school-list');

	// CHANGE COLOR OF HOUSE AND 
	// CONDO VALUES BY PERCENT

	// CHANGE CONDO 2014 COLOR
	if (condoPriceFourteen === 'No data') {
		$('.condo-price-fourteen').css('color', '#ccc');
	} else {
		$('.condo-price-fourteen').css('color', 'black');
	}
	// CHANGE CONDO 2015 COLOR			
	if (condoPriceFifteen === 'No data') {
		$('.condo-price-fifteen').css('color', '#ccc');
	} else {
		$('.condo-price-fifteen').css('color', 'black');
	}

	// CHANGE HOUSE 2014 COLOR
	if (housePriceFourteen === 'No data') {
		$('.house-price-fourteen').css('color', '#ccc');
	} else {
		$('.house-price-fourteen').css('color', 'black');
	}
	// CHANGE HOUSE 2015 COLOR
	if (housePriceFifteen === 'No data') {
		$('.house-price-fifteen').css('color', '#ccc');
	} else {
		$('.house-price-fifteen').css('color', 'black');
	}
	// CHANGE CONDO PERCENT COLOR
	if (condoPercent > 0) {
		$('.condo-percent').css('color', 'green');
	} else if (condoPercent < 0) {
		$('.condo-percent').css('color', 'red');
	} else if (condoPercent === 0) {
		$('.condo-percent').css('color', 'black');
	} else {
		$('.condo-percent').css('color', '#ccc');
	}
	// CHANGE CONDO PERCENT COLOR
	if (housePercent > 0) {
		$('.house-percent').css('color', 'green');
	} else if (housePercent < 0) {
		$('.house-percent').css('color', 'red');
	} else if (housePercent === 0) {
		$('.house-percent').css('color', 'black');
	} else {
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
	$('.hoods').html(neighborhoodNames);

	if ((crimeRate > 0) && (crimeRate < 100)) {
		$('.crime-rate')
			.css('background', '#fee0d2')
			.html('Low crime');

		}

	else if ((crimeRate > 100) && (crimeRate < 200)) {
		$('.crime-rate')
			.css('background', '#fc9272')
			.html('Medium crime');
	}

	else {
		$('.crime-rate')
			.css('background', '#de2d26')
			.html('High crime');
	}

	var mobile = 843;
	var w = window.innerWidth;


	if (mobile > w) {

		$('.school-table').hide();

		if (schoolGrade === 'No data') {
			$('.average-grade').html("no grade available")
		}

		else {
			
			var schoolCount = 0;

			for (var i = 0; i < schoolData.length; i++) {
				schoolCount++
			};

			if ((schoolCount === 0) || (schoolCount > 1) ) {
				$('.school-number').html(schoolCount+ ' schools');
			} 

			else if (schoolCount === 1) {
				$('.school-number').html(schoolCount + ' school')
			}

		}
		
		if (schoolGrade >= 4) {
			$('.average-grade').html('A')
		}
		else if ((schoolGrade >= 3) && (schoolGrade < 4)){
			$('.average-grade').html('B')
		}

		else if ((schoolGrade >= 2) && (schoolGrade < 3)){
			$('.average-grade').html('C')
		}

		else if ((schoolGrade >= 1) && (schoolGrade < 2)){
			$('.average-grade').html('D')
		}

		else if ((schoolGrade >= 0) && (schoolGrade < 1)){
			$('.average-grade').html('F')
		}

		else {
			$('.average-grade').html('no grade available')
			$('.school-number').html('0 schools')
		}

		$('#hover-box').on('click', '.hover-box-close', function(event) {
			$('#hover-box').hide();
		});
	}

	else {

		if (schoolData === 'No data') {
			$('.no-school').show();
			$('.school-table').hide()
		} 

		else {
			// LOOP THROUGH SCHOOL LIST AND BUILD TABLE
			for (var i = 0; i < schoolData.length; i++) {
				$('.no-school').hide();
				$('.school-head').after('<tr class=\'schools-row\'><td class=\'name\'>' + schoolData[i].name + '</td><td>' + schoolData[i].grade2015 + '</td><td>' + schoolData[i].grade2014 + '</td><td>' + schoolData[i].grade2013 + '</td></tr>')
			};
			$('.school-table').show()
		}
	}
	crimeRateButton.show();
	schoolTable.show();
}




// SECTION FOR EACH ZIP CODE EVENT
function onEachFeature(feature, layer) {

	layer.on({

		mouseover: function(e) {
			var layer = e.target;

			layer.setStyle({
				'color': '#666'
			});

			layer.bringToFront();

			var mobile = 843;
			var w = window.innerWidth;

			if (mobile < w) {
				writeHoverBox(feature,layer);
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
		
		mousemove: function(e) {},
		

		click: function(e) {

			var mobile = 843;
			var w = window.innerWidth;

			if (mobile > w) {
				
				$('#hover-box').css({
					'margin': 'auto',
  					'position': 'absolute',
  					'top': 0, 
  					'left': 0, 
  					'bottom': '23%', 
  					'right': 0,
  					'height': '245px',
					'width': '275px'
				});

				writeHoverBox(feature,layer);
			};

		},
		tap: function(e) {

			var mobile = 843;
			var w = window.innerWidth;

			if (mobile > w) {
				
				$('#hover-box').css({
					'margin': 'auto',
  					'position': 'absolute',
  					'top': 0, 
  					'left': 0, 
  					'bottom': '23%', 
  					'right': 0,
  					'height': '245px',
					'width': '275px'
				});

				writeHoverBox(feature,layer);
			};

		}
	});
}

//=============
//	BUILD MAPS
//=============

// START HOUSE MAP ON PAGE LOAD
function setDefaultMap() {
	buildDefaultHouse();
}



function buildDefaultLayer() {

	$('#house-price').css({
		'float': 'left',
		'width' : '50%',
		'border-right': '1px dashed #ccc'
	});

	$('#condo-price').css({
		'float': 'left',
		'width' : '50%'
	});

	$('#interface-container').hide();
	$('#map-info').css('bottom', '20%')

	$('.income:checkbox').removeAttr('checked')
	$('.savings:checkbox').removeAttr('checked')


	clearDefaultLayers();
	map.addLayer($defaultLayer);
}



function buildDefaultHouse() {

	$('.price-select').addClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');
	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	var price = 'price';
	var houseCheckbox = $('.house:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));

	buildKey(price);

	$('.housing-type')
		.html('Value of single-family homes')
		.css({
			'color': '#006d2c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' in South Florida.');
	$('.percent-year').css('display', 'none');


	// TOGGLE HOVER PRICE TABLES
	if (houseCheck === false) {
		$('#house-price').css({
			'float': 'left',
			'width': '50%',
			'border-right': '1px dashed #ccc',
			'border-right-style': 'dashed'
		});
		$('#condo-price').css('display', 'block');
	} else {
		$('#house-price').css({
			'float': 'none',
			'border': 'none',
			'width': '100%'
		});
		$('#condo-price').css('display', 'none');
	}

	$('.label-left')
		.html('Less Expensive')
		.css({
			'width': '50%',
			'text-align': 'left'
		})

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('More Expensive')
		.css({
			'width': '50%',
			'text-align': 'right'
		})

	$('.d-grade').css('display', 'none')
	$('.b-grade').css('display', 'none')

	clearDefaultLayers();
	map.addLayer($defaultHouseLayer);
}

function buildDefaultCondo() {
	$('.price-select').addClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');
	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	var price = 'price';

	buildKey(price);

	$('.housing-type')
		.html('Value of condos/townhomes')
		.css({
			'color': '#006d2c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' in South Florida.');
	$('.percent-year').css('display', 'none');

	$('.label-left')
		.html('Less Expensive')
		.css({
			'width': '50%',
			'text-align': 'left'
		})

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('More Expensive')
		.css({
			'width': '50%',
			'text-align': 'right'
		})

	$('.d-grade').css('display', 'none')
	$('.b-grade').css('display', 'none')


	clearDefaultLayers();
	map.addLayer($defaultCondoLayer);
}


function buildDefaultPercentHouse() {

	$('.percent-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	var percent = 'percent';
	var houseCheckbox = $('.house:checkbox');
	var houseCheck = (houseCheckbox.is(':checked'));

	buildKey(percent);

	// TOGGLE HOVER TABLE PRICE
	if (houseCheck === false) {
		$('#house-price').css({
			'float': 'left',
			'width': '50%',
			'border-right': '1px dashed #ccc',
			'border-right-style': 'dashed'
		});
		$('#condo-price').css('display', 'block');
	} else {
		$('#house-price').css({
			'float': 'none',
			'border': 'none',
			'width': '100%'
		});
		$('#condo-price').css('display', 'none');
	}

	$('.housing-type')
		.html('Value change of single-family homes')
		.css({
			'color': '#08519c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' in South Florida');
	$('.percent-year').css('display', 'inline');
	

	$('.label-left')
		.html('0%')
		.css({
			'width': '50%',
			'text-align': 'left'
		})

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('28%')
		.css({
			'width': '50%',
			'text-align': 'right'
		})

	$('.d-grade').css('display', 'none')
	$('.b-grade').css('display', 'none')

	clearDefaultLayers();
	map.addLayer($defaultPercentHouseLayer);
}

function buildDefaultPercentCondo() {

	$('.percent-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	var percent = 'percent';
	var condoCheckbox = $('.condo:checkbox');
	var condoCheck = (condoCheckbox.is(':checked'));

	buildKey(percent);

	if (condoCheck === false) {
		$('#condo-price').css({
			'float': 'right',
			'width': '50%',
			'border': 'none'
		});
		$('#house-price').css('display', 'block');
	} else {
		$('#condo-price').css({
			'float': 'none',
			'border': 'none',
			'width': '100%'
		});
		$('#house-price').css('display', 'none');
	}

	$('.housing-type')
		.html('Value change of condos/townhomes')
		.css({
			'color': '#08519c',
			'font-weight': 'bold'
		});

	$('.housing-explainer').html(' in South Florida');
	$('.percent-year').css('display', 'inline');
	

	$('.label-left')
		.html('-3%')
		.css({
			'width': '50%',
			'text-align': 'left'
		})

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('25%')
		.css({
			'width': '50%',
			'text-align': 'right'
		})

	clearDefaultLayers();
	map.addLayer($defaultPercentCondoLayer);
}


function buildDefaultCrime() {

	$('.crime-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');
	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	var crime = 'crime';
	buildKey(crime);

	$('.label-left')
		.html('Low')
		.css({
			'width': '33%',
			'text-align': 'left'

		});

	$('.label-middle')
		.html('Average')
		.css({
			'display': 'inline-block',
			'text-align': 'center',
			'width': '33%'
		});

	$('.label-right')
		.html('High')
		.css({
			'width': '33%',
			'text-align': 'right'

		});

	$('.d-grade').css('display', 'none')
	$('.b-grade').css('display', 'none')

	$('.housing-type')
		.html('Crime rates ')
		.css({
			'color': '#a50f15',
			'font-weight': 'bold'
		});

	$('.housing-explainer').html(' by ZIP code across South Florida.');
	$('.percent-year').css('display', 'none');

	clearDefaultLayers();
	map.addLayer($defaultCrimeLayer);
}


function buildDefaultSchool() {

	$('.school-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');
	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	var school = 'school';
	buildKey(school);

	$('.housing')
		.html('School rates')
		.css({
			'color': '#54278f',
			'font-weight': 'bold'
		});
	

	$('.label-left')
		.css({
			'width':'20%',
			'text-align':'center'
		})
		.html('F');


	$('.d-grade')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('D');


	$('.label-middle')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('C');


	$('.b-grade')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('B');

	$('.label-right')
		.css({
			'width':'20%',
			'text-align':'center'
		})
		.html('A');
	


	$('.housing-type')
		.html('Average school grade ')
		.css({
			'color': '#54278f',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' determined by the Florida Department of Education.');
	$('.percent-year').css('display', 'none');

	clearDefaultLayers();
	map.addLayer($defaultSchoolLayer);
}


// BUILD HOUSE MAP
function buildHouseMap() {

	var price = 'price';
	var incomeInput = $('.income-box').val();
	var income = getIncome(incomeInput);

	console.log(income)

	$('.income-button').attr('disabled', 'disabled');
	$('.price-select').addClass('selected-interface');
	$('.percent-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');
	
	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	d3.csv('../js/libs/data/zipcodes.csv', function(data) {

		var count = 0;

		data.forEach(function(d) {
			if (income >= d.housePrice) {
				return count++;
			}
		});

		if (count >= 1) {
			$('.no-data').hide();
		};

		console.log('Houses:' + count);

		// $('.income').html('$' + numeral(income).format('0,0'));
		$('.housing').html('house');
		$('.zip-count').html(count);
	});

	$('#interface-container').show();
	$('.key-holder').css('display', 'block');
	// $('.legend-block').remove();
	$('.housing-type')
		.html('Affordable ')
		.css({
			'color': '#006d2c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' single-family houses in South Florida.');
	$('.percent-year').css('display', 'none');
	
	$('.label-left')
		.html('Less expensive')
		.css({
			'width': '50%',
			'text-align': 'left'
	})

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('More expensive')
		.css({
			'width': '50%',
			'text-align': 'right'
	})

	$('.d-grade').css('display', 'none')
	$('.b-grade').css('display', 'none')


	buildKey(price);
	showExplainer();
	clearAllLayers();
	map.addLayer($houseLayer);
}

// BUILD CONDO MAP
function buildCondoMap() {

	var price = 'price';
	var incomeInput = $('.income-box').val();
	var income = getIncome(incomeInput);

	$('.income-button').attr('disabled', 'disabled');
	$('.percent-select').removeClass('selected-interface');
	$('.price-select').addClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');

	$('.key-holder').css('display', 'block');
	$('.housing-type')
		.html('Affordable ')
		.css({
			'color': '#006d2c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' condos in South Florida.');
	$('.percent-year').css('display', 'none');
	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');


	$('.label-left')
		.html('Less expensive')
		.css({
			'width': '50%',
			'text-align': 'left'
	})

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('More expensive')
		.css({
			'width': '50%',
			'text-align': 'right'
	})

	$('.d-grade').css('display', 'none')
	$('.b-grade').css('display', 'none')

	d3.csv('../js/libs/data/zipcodes.csv', function(data) {
		var count = 0;

		data.forEach(function(d) {
			if (income >= d.condoPrice) {
				return count++;
			}
		});

		if (count >= 1) {
			$('.no-data').hide();
		};

		$('#interface-container').show();
		$('.income').html('$' + numeral(income).format('0,0'));
		$('.housing').html('condo or townhome');
		$('.zip-count').html(count);

		console.log('Condos: ' + count);
	});

	buildKey(price);
	clearAllLayers();
	showExplainer();
	map.addLayer($condoLayer);
}

function buildHousePercentMap() {

	var legendColors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

	$('.income-button').attr('disabled', 'disabled');
	$('.percent-select').addClass('selected-interface');
	$('.price-select').removeClass('selected-interface');
	$('.school-select').removeClass('selected-interface');
	$('.crime-select').removeClass('selected-interface');
	$('.key-holder').css('display', 'block');
	$('.legend-block').remove();
	$('.housing-type')
		.html('Value change ')
		.css({
			'color': '#08519c',
			'font-weight': 'bold'
		});
	$('.housing-explainer').html(' of single-family houses since 2014 in the ZIP codes you can afford.');
	$('.percent-year').css('display', 'none');
	
	$('.label-left')
		.html('0%')
		.css({
			'width': '50%',
			'text-align': 'left'
		})

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('28%')
		.css({
			'width': '50%',
			'text-align': 'right'
		})

	$('.d-grade').css('display', 'none')
	$('.b-grade').css('display', 'none')

	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	for (var i = 0; i < legendColors.length; i++) {
		$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
	}

	showExplainer();
	clearAllLayers();
	map.addLayer($percentHouseLayer);
}

function buildCondoPercentMap() {

	var legendColors = ['#eff3ff', '#bdd7e7', '#6baed6', '#3182bd', '#08519c'];

	$('.income-button').attr('disabled', 'disabled');
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
	$('.housing-explainer').html(' for condos and townhouses since 2014 in the ZIP codes you can afford.');
	$('.percent-year').css('display', 'none');
	
	
	$('.label-left')
		.html('-3%')
		.css({
			'width': '50%',
			'text-align': 'left'
		})

	$('.label-middle')
		.empty()
		.css('display', 'none');

	$('.label-right')
		.html('25%')
		.css({
			'width': '50%',
			'text-align': 'right'
		})

	$('.d-grade').css('display', 'none')
	$('.b-grade').css('display', 'none')

	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	for (var i = 0; i < legendColors.length; i++) {
		$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
	}

	clearAllLayers();
	showExplainer();
	map.addLayer($percentCondoLayer);
}


function buildCrimeMap() {

	var legendColors = ['#fee0d2', '#fc9272', '#de2d26'];

	$('.income-button').attr('disabled', 'disabled');
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
	
	$('.label-left')
		.html('Low')
		.css({
			'width': '33%',
			'text-align': 'left'
		})

	$('.label-middle')
		.html('Average')
		.css({
			'display': 'inline-block',
			'width': '33%'
		});
	
	$('.label-right')
		.html('High')
		.css({
			'width': '33%',
			'text-align': 'right'
		})

	$('.d-grade').css('display', 'none')
	$('.b-grade').css('display', 'none')

	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	for (var i = 0; i < legendColors.length; i++) {
		$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
	}

	$('.legend-block').css('width', '33%');

	clearAllLayers();
	map.addLayer($crimeLayer);
}


function buildSchoolMap() {

	var legendColors = ['#f2f0f7', '#cbc9e2', '#9e9ac8', '#756bb1', '#54278f'];

	$('.income-button').attr('disabled', 'disabled');
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
	
	$('.label-left')
		.css({
			'width':'20%',
			'text-align':'center'
		})
		.html('F');

	$('.d-grade')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('D');


	$('.label-middle')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('C');


	$('.b-grade')
		.css({
			'width': '20%',
			'display': 'inline-block'
		})
		.html('B');

	$('.label-right')
		.css({
			'width':'20%',
			'text-align':'center'
		})
		.html('A');

	$('#interface-container').show();
	$('#map-info').css('bottom', '29%');

	for (var i = 0; i < legendColors.length; i++) {
		$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
	}

	clearAllLayers();
	map.addLayer($schoolLayer);
}


//====================================
// 			MAP LIST
//====================================

function buildZipList() {

	$('#list-container').show();
	d3.json('../js/libs/data/zipcodes.json', function(data) {

		function returnIncome() {
			var incomeInput = $('.income-box').val();
			var income = getIncome(incomeInput);
			return income;
		}

		$('#list-explainer .explainer').show();

		// TOGGLE CLICK ON LISTING
		var handlers = [

			// ON FIRST CLICK...
			function() {
				if ($(this).hasClass('active-listing')) {
					return false;
				}
				$('.hed').css('text-align', 'center');

				var zip = $(this).attr('data-zipcode');

				var houseFourteen = $(this).attr('data-house-fourteen');
				var houseFifteen = $(this).attr('data-house-fifteen');
				var housePercent = $(this).attr('data-house-percent');
				var condoFourteen = $(this).attr('data-condo-fourteen');
				var condoFifteen = $(this).attr('data-condo-fifteen');
				var condoPercent = $(this).attr('data-condo-percent');
				var neighborhoods = $(this).attr('data-neighborhoods');
				var crimeRate = $(this).attr('data-crime');

				

				$('.listing .inner').remove();

				$('.listing').removeClass('active-listing');

				$(this).addClass('active-listing');

				$(this).append('<div class="inner"><div class=\'small-info\'><i class="close-item fa fa-times"></i>' + 
					'<p class="hoods">Neighborhoods: ' + neighborhoods +'</p><p class=\'crime-rate\'>Crime rate: ' + crimeRate + '</p></div>' +
					'<div class=\'img-container col-xs-3\'><img class=\'img-responsive\' src=\'img/' + zip +'_Flat.jpg\'></div><div id=\'prices-container\' class=\'col-sm-6\'>' +
					'<div class=\'price col-sm-9 col-xs-9\'>' +
					'<span class=\'hed\'>Median Home Values</span>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>2014</span>' +
					'<span class=\'price-num\'>' + numberChange(houseFourteen) + '</span></div>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>2015</span>' +
					'<span class=\'price-num\'>' + numberChange(houseFifteen) + '</span></div>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>Pct.</span>' +
					'<span class=\'price-num\'>' + percentChange(housePercent) + '</span></div></div>' +
					'<div class=\'price col-sm-9 col-xs-9\'>' +
					'<span class=\'hed\'>Median Condo Values</span>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>2014</span>' +
					'<span class=\'price-num\'>' + numberChange(condoFourteen) + '</span></div>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>2015</span>' +
					'<span class=\'price-num\'>' + numberChange(condoFifteen) + '</span></div>' +
					'<div class=\'num col-sm-4 col-xs-4\'>' +
					'<span class=\'year\'>Pct.</span>' +
					'<span class=\'price-num\'>' + percentChange(condoPercent) + '</span></div></div></div>' + '<h3 class=\'schools-hed\'>School Grades</h3><table class=\'school-list\'><tr class= \'table-head\'><th class=\'name\'>School</th><th>14-15</th><th>13-14</th><th>12-13</th></tr></table>' + '</div>'
				);

				$('.close-item').css({
					'display': 'block',
					'cursor': 'pointer'
				});


				var index = $(this).attr('data-index');
				var schoolCheck = $(this).attr('data-school-check')
				var schoolData = data[index].school;

				console.log(schoolCheck)
		
				if (schoolCheck === "true") {
					for (var i = 0; i < schoolData.length; i++) {

						$('.table-head').after('<tr><td class=\'name\'>' + schoolData[i].name + '</td><td>' + schoolData[i].grade2015 + '</td><td>' + schoolData[i].grade2014 + '</td><td>' + schoolData[i].grade2013 + '</td></tr>');
					}

				}

				else {
					$('.table-head')
						.empty()
						.after('<h4 class=\'no-school-data\'>No school data</h4>')
				}



				
			},

			// ON SECOND CLICK...
			function() {
				$('.listing .inner').remove();
				$('.listing').removeClass('active-listing');
				$('.crime-rate').hide();
			}
		]

		var income = returnIncome();

		$.each(data, function(i, val) {

			$('#zip-list ul').append('<li class=\'listing\' data-index=' + i + ' data-zipcode=\'' + data[i].zipcode + '\' data-neighborhoods=\'' + data[i].neighborhoods + '\'data-crime=\'' + data[i].crime + '\' data-house-fourteen=\'' + data[i].housePriceFourteen + '\' data-house-fifteen=\'' + data[i].housePriceFifteen + '\' data-house-percent=\'' + data[i].housePercent + '\' data-condo-fourteen=\'' + data[i].condoPriceFourteen + '\' data-condo-fifteen=\'' + data[i].condoPriceFifteen + '\' data-condo-percent=\'' + data[i].condoPercent + '\' data-school-check = \''+ data[i].hasSchool+'\'><span class =\'hed\'>' + data[i].zipcode + ' – ' + data[i].city + '</span></li>');
			
			var counter = 0;

			$('#zip-list').on('click', '.listing', function(event) {
				handlers[counter++].apply(this, Array.prototype.slice.apply(arguments));
				counter %= handlers.length;
			});

		});

		var items = $('.listing');
		var houseCheckbox = $('.house:checkbox');
		var condoCheckbox = $('.condo:checkbox');
		var houseCheck = (houseCheckbox.is(':checked'));
		var condoCheck = (condoCheckbox.is(':checked'));

		$.each(items, function(i) {

			var houseFifteen = $(this).attr('data-house-fifteen');
			var condoFifteen = $(this).attr('data-condo-fifteen');

			if ((income >= houseFifteen) && ((houseCheck === true) && (condoCheck === false))) {
				$(this).addClass('match')
				console.log('match only houses')
			} else if ((income >= condoFifteen) && ((houseCheck === false) && (condoCheck === true))) {
				$(this).addClass('match')
				console.log('match only condos')
			} else {
				$(this).addClass('miss')
				console.log('add miss')
			}
		});
		
		$('#srcbox').quicksearch('.listing', '.hed');

		$('#reset').click(function() {
			$('#srcbox').val('');
			$('.listing').removeClass('selected-interface');
		});
	});
}