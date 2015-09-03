'use strict';

		var income,
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

		// BUILD MAP
		var map = new L.Map('map-container', {
			center: new L.LatLng(25.82, -79.85),
			zoom: 9.5,
			minZoom: 9.5,
			maxZoom: 16,
			zoomControl: false,
			doubleClickZoom: false,
			VML: true,
			scrollWheelZoom: false
		}).addLayer(tiles);

		// ADD CONTROLS
		var control = L.control.zoom({'position' : 'topleft'});

		control.addTo(map);

		// BUILD DEFAULT MAP
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
				return '#edf8e9';
			}
		}

		// SET DEFAULT STYLES
		function defaultHouseStyle (features, layer) {
		    return {
		        fillColor: getDefaultHouseColor(features.properties.house_price_fifteen),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}

		// SET DEFAULT LAYER
		var $defaultHouseLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultHouseStyle });

		// ADD DEFAULT LAYER TO MAP
		map.addLayer($defaultHouseLayer);


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
				return '#edf8e9';
			}
		}

		// SET DEFAULT STYLES
		function defaultCondoStyle (features, layer) {
		    return {
		        fillColor: getDefaultCondoColor(features.properties.condo_price_fifteen),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}

		// SET DEFAULT LAYER
		var $defaultCondoLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultCondoStyle });


		function getDefaultHousePercentColor (d) {

			if ((d >= 0.12 ) && (d <= 0.27 )) {
				return '#006d2c';
			}

			else if ((d >= 0.84 ) && (d <= 0.1147)) {
				return '#31a354';
			}

			else if ((d >= 0.44 ) && (d <= 0.83)) {
				return '#74c476';
			}

			else if ((d > 0.0  ) && (d <= 0.043)) {
				return '#bae4b3';
			}

			else {
				return '#edf8e9';
			}
		}

		// SET DEFAULT STYLES
		function defaultHousePercentStyle (features, layer) {
		    return {
		        fillColor: getDefaultHousePercentColor(features.properties.house_pct),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}

		// SET DEFAULT LAYER
		var $defaultPercentHouseLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultHousePercentStyle });



		function getDefaultCondoPercentColor (d) {

			if ((d >= 0.080 ) && (d <= 0.250 )) {
				return '#006d2c';
			}

			else if ((d >= 0.057 ) && (d <= 0.079)) {
				return '#31a354';
			}

			else if ((d >= 0.000 ) && (d <= 0.056)) {
				return '#74c476';
			}

			else if ((d >= -0.03  ) && (d <= -0.01)) {
				return '#bae4b3';
			}

			else {
				return '#edf8e9';
			}
		}


		// SET DEFAULT STYLES
		function defaultCondoPercentStyle (features, layer) {
		    return {
		        fillColor: getDefaultCondoPercentColor(features.properties.condo_pct),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}

		// SET DEFAULT LAYER
		var $defaultPercentCondoLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultCondoPercentStyle });


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
				return '#fee5d9';
			}
		}

		// SET DEFAULT STYLES
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

		// SET DEFAULT LAYER
		var $defaultCrimeLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultCrimeStyle });


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

		// SET DEFAULT STYLES
		function defaultSchoolStyle (features, layer) {
		    return {
		        fillColor: getDefaultSchoolColor(features.properties.school_grade),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}

		// SET DEFAULT LAYER
		var $defaultSchoolLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: defaultSchoolStyle });


		// ADD DEFAULT LAYER crimeTO MAP
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
		        fillColor: getHouseColor(features.properties.house_price_fifteen),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        // color: getHouseDashColor(features.properties.house_price_fifteen),
		        dashArray: '3',
		        fillOpacity:0.7
		        // fillOpacity: getHouseOpacity(features.properties.house_price_fifteen)
		    };
		}


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
		        fillColor: getCondoColor(features.properties.condo_price_fifteen),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        // color: getCondoDashColor(features.properties.condo_price_fifteen),
		        dashArray: '3',
		        fillOpacity: 0.7
		        // fillOpacity: getCondoOpacity(features.properties.condo_price_fifteen)
		    };
		}

		function getHousePercentColor (price, d) {

			if ((income > price) && (d >= 0.27 )) {
				return '#006d2c';
			}

			if ((income > price) && ((d >= 0.12 ) && (d <= 0.26 ))) {
				return '#31a354';
			}

			else if ((income > price)&& ((d >= 0.084 ) && (d <= 0.1147))) {
				return '#74c476';
			}

			else if ((income > price) && ((d >= 0.044 ) && (d <= 0.083))) {
				return '#bae4b3';
			}

			else if ((income > price) && ((d > 0.01  ) && (d <= 0.043))) {
				return '#edf8e9';
			}

			else {
				return '#ccc';
			}
		}

		// SET DEFAULT STYLES
		function housePercentStyle (features, layer) {
		    return {
		        fillColor: getHousePercentColor(features.properties.house_price_fifteen,features.properties.house_pct),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}


		function getCondoPercentColor (price, d) {

			if ((income > price) && (d >= 0.25 )) {
				return '#006d2c';
			}

			if ((income > price) && ((d >= 0.080 ) && (d <= 0.24  ))) {
				return '#31a354';
			}

			else if ((income > price) && ((d >= 0.057 ) && (d <= 0.079))) {
				return '#74c476';
			}

			else if ((income > price) && ((d >= 0.0 ) && (d <= 0.056))) {
				return '#bae4b3';
			}

			else if ((income > price) && ((d > -0.03 ) && (d <= -0.01))) {
				return '#edf8e9';
			}

			else {
				return '#ccc';
			}
		}

		// SET DEFAULT STYLES
		function condoPercentStyle (features, layer) {
		    return {
		        fillColor: getCondoPercentColor(features.properties.condo_price_fifteen,features.properties.condo_pct),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}


		function getCrimeColor (crime, house, condo) {

			if (((income > house) || (income > condo)) && ((crime >= 202 ) && (crime <= 400)))  {
				return '#a50f15';
			}

			else if (((income > house) || (income > condo)) && ((crime >= 143 ) && (crime <= 201))) {
				return '#de2d26';
			}

			else if (((income > house) || (income > condo)) && ((crime >= 98 ) && (crime <= 142))) {
				return '#fb6a4a';
			}

			else if (((income > house) || (income > condo)) && ((crime >= 1 ) && (crime <= 97))) {
				return '#fcae91';
			}

			else if (((income > house) || (income > condo)) && (crime === 0 )) {
				return '#fcae91';
			}

			else {
				return '#ccc';
			}
		}


		function crimeStyle (features, layer) {
		    return {
		        fillColor: getCrimeColor(features.properties.crime,features.properties.house_price_fifteen, features.properties.condo_price_fifteen),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}


		function getSchoolColor (school, house, condo) {

			if (((income > house) || (income > condo)) && (school === 4))  {
				return '#f2f0f7';
			}

			else if (((income > house) || (income > condo)) && ((school >= 3.0 ) && (school <= 3.9))) {
				return '#cbc9e2';
			}

			else if (((income > house) || (income > condo)) && ((school >= 2.0 ) && (school <= 2.9))) {
				return '#9e9ac8';
			}

			else if (((income > house) || (income > condo)) && ((school > 1 ) && (school <= 1.9))) {
				return '#756bb1';
			}

			else if (((income > house) || (income > condo)) && ((school >= 0.1 ) && (school <= 0.9))) {
				return '#54278f';
			}

			else {
				return '#ccc';
			}
		}


		function schoolStyle (features, layer) {
		    return {
		        fillColor: getSchoolColor(features.properties.school_grade,features.properties.house_price_fifteen, features.properties.condo_price_fifteen),
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

	//Set position of hover box on mousemove
	function getPos (event) {
		var w = $('#map-container').width(),
			h = $('#map-container').height(),
			posX = event.pageX + 20,
			posY = event.pageY - 150,
			x = 0,
			y = 0;

		// Horizontal conditions
		if (posX < w) {
			x = posX - 150;
		}

		else {
			x = posX - ($('#hover-box').outerWidth(true) + 100);
		}

		// Vertical conditions
		if (posY > h) {
			y = (posY - $('#hover-box').outerHeight(true) - 375);
		}

		else {
			y = posY;
		}
			
		$('#hover-box').css({
			'left': x,
			'top': y + 150
		});
	}

	// Initiate hover
	function initHover () {
		$('#hover-box').show();
		$(document).bind('mousemove', getPos);
	}

	// End hover
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
	// 				MAPS
	//====================================

	function buildKey (housing) {

		$('.legend-block').remove();

		if (housing === 'price') {
			var legendColors = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'];

			for (var i = 0; i < legendColors.length; i++) {	
				$('.key').append('<div class=\'legend-block\' style=\'color:' + legendColors[i] + '\'</div>');
			}
		}

		else if (housing === 'percent') {
			var legendColors = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];

			for (var i = 0; i < legendColors.length; i++) {
				
				$('.key').append('<div class=\'legend-block\' style=\'color:' + legendColors[i] + '\'</div>');
			}
		}

		else if (housing === 'crime') {
			var legendColors = ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15'];

			for (var i = 0; i < legendColors.length; i++) {
				
				$('.key').append('<div class=\'legend-block\' style=\'color:' + legendColors[i] + '\'</div>');
			}
		}


		else {
			var legendColors = ['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f'];

			for (var i = 0; i < legendColors.length; i++) {
				
				$('.key').append('<div class=\'legend-block\' style=\'color:' + legendColors[i] + '\'</div>');
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

		$('.price-explainer').css('display', 'none');
	}

	function hideExplainer () {
		$('.explainer')
			.slideUp('fast')

		$('.price-explainer').css('display', 'block')
	}


	// BUILD BASE
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
					housePriceFourteen 	= layer.feature.properties.house_price_fourteen,
					housePriceFifteen 	= layer.feature.properties.house_price_fifteen,
					housePercent 		= layer.feature.properties.house_pct,
					condoPriceFourteen 	= layer.feature.properties.condo_price_fourteen,
					condoPriceFifteen 	= layer.feature.properties.condo_price_fifteen,
					condoPercent 		= layer.feature.properties.condo_pct;


				// Change color of house and condo
				// values by percent

				// Chango condo 2014 color
				if (condoPriceFourteen === 'N/A') {
					$('.condo-price-fourteen').css('color', '#ccc');
				}

				else {
					$('.condo-price-fourteen').css('color', 'black');
				}

				// Chango condo 2015 color			
				if (condoPriceFifteen === 'N/A') {
					$('.condo-price-fifteen').css('color', '#ccc');
				}

				else {
					$('.condo-price-fifteen').css('color', 'black');
				}

				// Change house 2014 color
				if (housePriceFourteen === 'N/A') {
					$('.house-price-fourteen').css('color', '#ccc');
				}

				else {
					$('.house-price-fourteen').css('color', 'black');
				}

				// Change house 2015 color
				if (housePriceFifteen === 'N/A') {
					$('.house-price-fifteen').css('color', '#ccc');
				}

				else {
					$('.house-price-fifteen').css('color', 'black');
				}

				// Change condo percent color
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

				// Change condo percent color
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

				// Write data from GeoJSON file
				$('.zip-code').html(zip);
				$('.city').html(city);
				$('.house-price-fourteen').html(numberChange(housePriceFourteen));
				$('.house-price-fifteen').html(numberChange(housePriceFifteen));
				$('.house-percent').html(percentChange(housePercent));
				$('.condo-price-fourteen').html(numberChange(condoPriceFourteen));
				$('.condo-price-fifteen').html(numberChange(condoPriceFifteen));
				$('.condo-percent').html(percentChange(condoPercent));
			},

			mouseout: function(e) {
				var layer = e.target;
				layer.setStyle({
					color: '#fff'
				});
				endHover();
			},

			mousemove: function(e){},

			click: function(e) {
				// var $layer = e.target;
				// map.fitBounds($layer.getBounds(),{
				// 	padding: [70, 70]
				// })

				// var currentFeature = $layer.getBounds()

				// console.log(currentFeature)

				// changeZIP($layer)
				},
			tap: function(e) {}
		});
	}

	function setDefaultMap() {
		buildDefaultHouse();
	}

	function buildDefaultCondo() {

		$('.price-select').addClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		
		var price = 'price';
		buildKey(price);		

		$('.housing').html('Price of condos')

		$('.label-left').html('Least Expensive');
		$('.label-right').html('Most Expensive');

	
		// map.removeLayer($houseLayer);
		// map.removeLayer($condoLayer);
		// map.removeLayer($percentCondoLayer);
		// map.removeLayer($percentHouseLayer);
		// map.removeLayer($crimeLayer)
		// map.removeLayer($schoolLayer)

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer)		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);
		
		map.addLayer($defaultCondoLayer);				
	}


	function buildDefaultHouse() {
		
		$('.price-select').addClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');

		var price = 'price',
			houseCheckbox 	= $('.house:checkbox'),
			houseCheck 		= (houseCheckbox.is(':checked'));

		buildKey(price);

		$('.housing')
			.html('Price of single-family houses')
			.css({
				'color': '#006d2c',
				'font-weight': 'bold'
			});


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



		// map.removeLayer($houseLayer);
		// map.removeLayer($condoLayer);
		// map.removeLayer($percentCondoLayer);
		// map.removeLayer($percentHouseLayer);
		// map.removeLayer($crimeLayer)
		// map.removeLayer($schoolLayer)

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer)		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);
		
		map.addLayer($defaultHouseLayer);					
	}



	function buildDefaultPercentHouse() {
		
		$('.percent-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');

		var price = 'price',
			houseCheckbox 	= $('.house:checkbox'),
			houseCheck 		= (houseCheckbox.is(':checked'));

		buildKey(price);

		$('.housing')
			.html('Change in price of single-family houses since 2015')
			.css({
				'color': '#006d2c',
				'font-weight': 'bold'
			});


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

		$('.label-left').html('0%');
		$('.label-right').html('28%');


		// map.removeLayer($houseLayer);
		// map.removeLayer($condoLayer);
		// map.removeLayer($percentCondoLayer);
		// map.removeLayer($percentHouseLayer);
		// map.removeLayer($crimeLayer);
		// map.removeLayer($schoolLayer);

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer);		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);

		map.addLayer($defaultPercentHouseLayer);					
	}


	function buildDefaultPercentCondo() {
		
		$('.percent-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');

		var price = 'price',
			condoCheckbox 	= $('.condo:checkbox'),
			condoCheck 		= (condoCheckbox.is(':checked'));

		buildKey(price);

		$('.housing')
			.html('Change in price of condos since 2015')
			.css({
				'color': '#006d2c',
				'font-weight': 'bold'
			});


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

		$('.label-left').html('-3%');
		$('.label-right').html('25%');


		// map.removeLayer($houseLayer);
		// map.removeLayer($condoLayer);
		// map.removeLayer($percentCondoLayer);
		// map.removeLayer($percentHouseLayer);
		// map.removeLayer($crimeLayer);
		// map.removeLayer($schoolLayer);

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer);		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);

		map.addLayer($defaultPercentCondoLayer);					
	}


	function buildDefaultCrime() {
		
		$('.crime-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');

		var crime = 'crime';
		buildKey(crime);

		$('.housing')
			.html('Crime rates')
			.css({
				'color': '#a50f15',
				'font-weight': 'bold'
			});

		$('.label-left').html('Least Crime');
		$('.label-right').html('Most Crime');

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
		
		map.removeLayer($houseLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($percentCondoLayer);
		map.removeLayer($percentHouseLayer);
		map.removeLayer($crimeLayer)
		map.removeLayer($schoolLayer)

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer)		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);

		map.addLayer($defaultSchoolLayer);					
	}


	// BUILD HOUSE MAP
	function buildHouseMap() {

		var incomeInput  = $('.income-box').val(),
			income 		 = getIncome(incomeInput),
			legendColors = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'];
			

		$('.income-button').attr('disabled','disabled');
		$('.price-select').addClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');

		d3.csv('../js/libs/data/zips.csv', function(data) {
	  	
			var count = 0;

	  		data.forEach(function(d) {
	  			if (income >= d.house_price) {		
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

		for (var i = 0; i < legendColors.length; i++) {
			$('.key').append('<div class=\'legend-block\' style=\'color:' + legendColors[i] + '\'</div>');
		}

		$('.label-left').html('Least affordable');
		$('.label-right').html('Most affordable');

		showExplainer();

		map.removeLayer($houseLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($percentCondoLayer);
		map.removeLayer($percentHouseLayer);
		map.removeLayer($crimeLayer)
		map.removeLayer($schoolLayer)

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer)		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);

		map.addLayer($houseLayer);
	}


	// BUILD CONDO MAP
	function buildCondoMap () {

		$('.income-button').attr('disabled','disabled');
		$('.percent-select').removeClass('selected-interface');
		$('.price-select').addClass('selected-interface');

		var incomeInput = $('.income-box').val(),
			income 		= getIncome(incomeInput),
			legendColors = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];

		d3.csv('../js/libs/data/zips.csv', function(data) {
	  	
			var count = 0;

	  		data.forEach(function(d) {

	  			if (income >= d.condo_price) {		
	  				return count++;
	  			}

	  		});

	  		$('#interface-container').show();
	  		$('.income').html('$' + $.number(income));
	  		$('.housing').html('condo');
	  		$('.zip-count').html(count);

	  		console.log('Condos: ' + count);

		});

		$('.key-holder').css('display', 'block');
		
		showExplainer();

		$('.legend-block').remove();

		for (var i = 0; i < legendColors.length; i++) {	
			$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
		}

		$('.label-left').html('Least affordable');
		$('.label-right').html('Most affordable');

		map.removeLayer($houseLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($percentCondoLayer);
		map.removeLayer($percentHouseLayer);
		map.removeLayer($crimeLayer)
		map.removeLayer($schoolLayer)

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer)		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);

		map.addLayer($condoLayer);

	}



	function buildHousePercentMap () {

		$('.income-button').attr('disabled','disabled');

		$('.percent-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');

		var incomeInput = $('.income-box').val(),
			income 		= getIncome(incomeInput),
			legendColors = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];

		$('.key-holder').css('display', 'block');
		
		showExplainer();

		$('.legend-block').remove();

		for (var i = 0; i < legendColors.length; i++) {	
			$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
		}

		$('.label-left').html('0%');
		$('.label-right').html('27%');

		map.removeLayer($houseLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($percentCondoLayer);
		map.removeLayer($percentHouseLayer);
		map.removeLayer($crimeLayer)
		map.removeLayer($schoolLayer)

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer)		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);

		map.addLayer($percentHouseLayer);

	}


	function buildCondoPercentMap () {

		$('.income-button').attr('disabled','disabled');

		$('.percent-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');

		var incomeInput = $('.income-box').val(),
			income 		= getIncome(incomeInput),
			legendColors = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];

		$('.key-holder').css('display', 'block');
		
		showExplainer();

		$('.legend-block').remove();

		for (var i = 0; i < legendColors.length; i++) {	
			$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
		}

		$('.label-left').html('0%');
		$('.label-right').html('27%');

		map.removeLayer($houseLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($percentCondoLayer);
		map.removeLayer($percentHouseLayer);
		map.removeLayer($crimeLayer)
		map.removeLayer($schoolLayer)

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer)		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);

		map.addLayer($percentCondoLayer);

	}


	function buildCrimeMap () {

		$('.income-button').attr('disabled','disabled');
		$('.crime-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');

		var incomeInput = $('.income-box').val(),
			income 		= getIncome(incomeInput),
			legendColors = ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15'];

		$('.key-holder').css('display', 'block');
		
		$('.explainer').html('Crime rates in zip codes you could afford to buy a house and/or a condo.')
			
		$('.legend-block').remove();

		for (var i = 0; i < legendColors.length; i++) {	
			$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
		}

		$('.label-left').html('Less crime');
		$('.label-right').html('More crime');

		map.removeLayer($houseLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($percentCondoLayer);
		map.removeLayer($percentHouseLayer);
		map.removeLayer($crimeLayer)
		map.removeLayer($schoolLayer)

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer)		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);

		map.addLayer($crimeLayer)

	}


	function buildSchoolMap () {

		$('.income-button').attr('disabled','disabled');
		$('.crime-select').addClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');

		var incomeInput = $('.income-box').val(),
			income 		= getIncome(incomeInput),
			legendColors = ['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f'];

		$('.key-holder').css('display', 'block');
		
		$('.explainer').html('School grades in zip codes you could afford to buy a house and/or a condo.')
			
		$('.legend-block').remove();

		for (var i = 0; i < legendColors.length; i++) {	
			$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
		}

		$('.label-left').html('A');
		$('.label-right').html('F');

		map.removeLayer($houseLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($percentCondoLayer);
		map.removeLayer($percentHouseLayer);
		map.removeLayer($crimeLayer)
		map.removeLayer($schoolLayer)

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultPercentHouseLayer);
		map.removeLayer($defaultPercentCondoLayer)		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);

		map.addLayer($schoolLayer);

	}

	//====================================
	// 			MAP LIST
	//====================================

	function buildZipList () {
		d3.json('../js/libs/data/zipcode_test.json', function(data) {

			$.each(data, function(i, val) {

				$('#zip-list ul').append('<li class=\'listing\' data-index=' + i + ' data-zipcode=\''+ data[i].zipcode + '\' data-house-fourteen=\''+data[i].house_price_fourteen+'\' data-house-fifteen=\''+data[i].house_price_fifteen+'\' data-house-percent=\''+data[i].house_pct+'\' data-condo-fourteen=\''+data[i].condo_price_fourteen+'\' data-condo-fifteen=\''+data[i].condo_price_fifteen+'\' data-condo-percent=\''+data[i].condo_pct+'\'><span class =\'hed\'>' + data[i].zipcode + ' – ' + data[i].city + '</span></li>');
				 
				
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
					
					$(this).append('<div class="inner">'
					+'<div id=\'prices-container\'>'+
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
					'<span class=\'price-num\'>'+ numberChange(houseFifteen) + '</span></div>' +
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
				$('#srcbox').val('')
				$('.listing').removeClass('selected-interface')
			})


		});
			
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


	//====================================
	// 			KEYBOARD SEARCH
	//====================================

	// BUILD SEARCH LIST