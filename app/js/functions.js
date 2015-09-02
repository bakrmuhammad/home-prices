'use strict';

		var income,
			$houseLayer 	    = null,
			$condoLayer 	    = null,
			$crimeLayer 		= null,
			$schoolLayer 		= null,
			$defaultHouseLayer  = null,
			$defaultCondoLayer  = null,
			$defaultCrimeLayer  = null,
			$defaultSchoolLayer = null;
	
		// MAKE TILE LAYER FOR ZOOMED IN VIEW
		var tiles = new L.StamenTileLayer('toner-lite');

		// BUILD MAP
		var map = new L.Map('map-container', {
			center: new L.LatLng(25.85, -80.33),
			zoom: 10,
			minZoom: 10,
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
				return '#08519c';
			}

			else if  ((d >= 114150 ) && (d <= 203974)) {
				return '#3182bd';
			}

			else if ((d >= 55575  ) && (d <= 114159)){
				return '#6baed6';
			}

			else if  ((d >= 1  ) && (d <= 55574)) {
				return '#bdd7e7';
			}

			else {
				return '#eff3ff';
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

			// else if (income > (d * 0.75)) {
			// 	return '#31a354';
			// }

			// else if (income > (d * 0.50)) {
			// 	return '#74c476';
			// }

			// else if (income > (d * 0.25)) {
			// 	return '#bae4b3';
			// }

			else {
				return '#fff';
			}
		}

		function houseStyle (features, layer) {
		    return {
		        fillColor: getHouseColor(features.properties.house_price_fifteen),
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.7
		    };
		}


		function getCondoColor (d) {

			if (income > d) {
				return '#08519c';
			}

			else if (income > (d * 0.75)) {
				return '#3182bd';
			}

			else if (income > (d * 0.50)) {
				return '#6baed6';
			}

			else if (income > (d * 0.25)) {
				return '#bdd7e7';
			}

			else {
				return '#eff3ff';
			}
		}


		function condoStyle (features, layer) {
		    return {
		        fillColor: getCondoColor(features.properties.condo_price_fifteen),
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
			x = posX - 250;
		}

		else {
			x = posX - ($('#hover-box').outerWidth(true) + 100);
		}

		// Vertical conditions
		if (posY > h) {
			y = (posY - $('#hover-box').outerHeight(true) - 375);
		}

		else {
			y = posY - 300;
		}
			
		$('#hover-box').css({
			'left': x,
			'top': y - 75
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

		if (housing === 'house') {
			var legendColors = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'];

			for (var i = 0; i < legendColors.length; i++) {	
				$('.key-default').append('<div class=\'legend-block\' style=\'color:' + legendColors[i] + '\'</div>');
			}
		}

		else if (housing === 'condo') {
			var legendColors = ['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c'];

			for (var i = 0; i < legendColors.length; i++) {
				
				$('.key-default').append('<div class=\'legend-block\' style=\'color:' + legendColors[i] + '\'</div>');
			}
		}

		else if (housing === 'crime') {
			var legendColors = ['#fee5d9','#fcae91','#fb6a4a','#de2d26','#a50f15'];

			for (var i = 0; i < legendColors.length; i++) {
				
				$('.key-default').append('<div class=\'legend-block\' style=\'color:' + legendColors[i] + '\'</div>');
			}
		}


		else {
			var legendColors = ['#f2f0f7','#cbc9e2','#9e9ac8','#756bb1','#54278f'];

			for (var i = 0; i < legendColors.length; i++) {
				
				$('.key-default').append('<div class=\'legend-block\' style=\'color:' + legendColors[i] + '\'</div>');
			}
		}


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

		$('.condo-select').addClass('selected-interface');
		$('.house-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');
		
		var condo = 'condo';
		buildKey(condo);		

		$('.housing')
			.html('Condos')
			.css({
				'color': '#08519c',
				'font-weight': 'bold'
			});

		$('.label-left').html('Least Expensive');
		$('.label-right').html('Most Expensive');

		map.removeLayer($defaultSchoolLayer);
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultHouseLayer);
		map.addLayer($defaultCondoLayer);				
	}


	function buildDefaultHouse() {
		
		$('.house-select').addClass('selected-interface');
		$('.condo-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');

		var house = 'house';
		buildKey(house);

		$('.housing')
			.html('Single-family houses')
			.css({
				'color': '#006d2c',
				'font-weight': 'bold'
			});

		$('.label-left').html('Least Expensive');
		$('.label-right').html('Most Expensive');

		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultSchoolLayer);
		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.addLayer($defaultHouseLayer);					
	}


	function buildDefaultCrime() {
		
		$('.crime-select').addClass('selected-interface');
		$('.house-select').removeClass('selected-interface');
		$('.condo-select').removeClass('selected-interface');

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

		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultSchoolLayer);
		map.removeLayer($defaultCondoLayer);
		map.addLayer($defaultCrimeLayer);					
	}


	function buildDefaultSchool() {
		
		$('.school-select').addClass('selected-interface');
		$('.house-select').removeClass('selected-interface');
		$('.condo-select').removeClass('selected-interface');

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
		
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.addLayer($defaultSchoolLayer);					
	}


	// BUILD HOUSE MAP
	function buildHouseMap() {

		var incomeInput  = $('.income-box').val(),
			income 		 = getIncome(incomeInput),
			legendColors = ['#edf8e9', '#bae4b3', '#74c476', '#31a354', '#006d2c'];

		$('.income-button').attr('disabled','disabled');
		$('.house-select').addClass('selected-interface');
		$('.condo-select').removeClass('selected-interface');

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
		
		$('.explainer')
			.css('display', 'block')
			.find('span')
			.each(function() {
				$(this).css({
					'color': '#006d2c',
					'font-weight': 'bold'
				});
			});

		$('.legend-block').remove();

		for (var i = 0; i < legendColors.length; i++) {
			$('.key').append('<div class=\'legend-block\' style=\'color:' + legendColors[i] + '\'</div>');
		}

		$('.label-left').html('Least affordable');
		$('.label-right').html('Most affordable');

		map.removeLayer($defaultSchoolLayer);
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultHouseLayer);
		map.removeLayer($defaultCondoLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($crimeLayer);
		map.removeLayer($schoolLayer);
		map.addLayer($houseLayer);
	}


	// BUILD CONDO MAP
	function buildCondoMap () {

		$('.income-button').attr('disabled','disabled');
		$('.condo-select').addClass('selected-interface');
		$('.house-select').removeClass('selected-interface');

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
		
		$('.explainer')
			.css('display', 'block')
			.find('span')
			.each(function() {
				$(this).css({
					'color': '#08519c',
					'font-weight': 'bold'
				});
			});

		$('.legend-block').remove();

		for (var i = 0; i < legendColors.length; i++) {	
			$('.key').append('<div class=\'legend-block\' style=\'border-color:' + legendColors[i] + '\'</div>');
		}

		$('.label-left').html('Least affordable');
		$('.label-right').html('Most affordable');

		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultSchoolLayer);
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultHouseLayer);
		map.removeLayer($crimeLayer);
		map.removeLayer($schoolLayer);
		map.removeLayer($houseLayer);
		map.addLayer($condoLayer);

	}


	function buildCrimeMap () {

		$('.income-button').attr('disabled','disabled');
		$('.crime-select').addClass('selected-interface');
		$('.house-select').removeClass('selected-interface');
		$('.condo-select').removeClass('selected-interface');

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

		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultSchoolLayer);
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultHouseLayer);
		map.removeLayer($houseLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($schoolLayer);
		map.addLayer($crimeLayer)

	}


	function buildSchoolMap () {

		$('.income-button').attr('disabled','disabled');
		$('.crime-select').addClass('selected-interface');
		$('.house-select').removeClass('selected-interface');
		$('.condo-select').removeClass('selected-interface');

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

		map.removeLayer($defaultCondoLayer);
		map.removeLayer($defaultSchoolLayer);
		map.removeLayer($defaultCrimeLayer);
		map.removeLayer($defaultHouseLayer);
		map.removeLayer($houseLayer);
		map.removeLayer($condoLayer);
		map.removeLayer($crimeLayer);
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
			house_checkbox 	= $('.house:checkbox'),
			condo_checkbox 	= $('.condo:checkbox'),
			inputBoxError 	= (isNaN(income)) || (incomeInput === ''),
			houseCheck 		= (house_checkbox.is(':checked')),
			condoCheck 		= (condo_checkbox.is(':checked'));

		// ERROR HANDLING
		if (( inputBoxError === false ) && ( houseCheck === true )) {
			buildHouseMap(income);
			removeError();
		}

		else if (( inputBoxError === true ) && ( houseCheck === true )) {
			flagSelectionError();
		}

		else if (( inputBoxError === true ) && ( houseCheck === false )) {
			flagError();
		}

		else if (( inputBoxError === false ) && ( condoCheck === true )) {
			buildCondoMap(income);
			removeError();
		}

		else if (( inputBoxError === true ) && (condoCheck === false)) {
			flagError();
		}

		else if (( inputBoxError === false ) && ( condoCheck === false )) {
			flagSelectionError();
		}
	}


	//====================================
	// 			KEYBOARD SEARCH
	//====================================

	// BUILD SEARCH LIST