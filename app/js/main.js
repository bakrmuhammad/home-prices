// SCOPE
// ORGANIZE PUBLIC OBJECTS
'use strict';

(function () {

	$('.leaflet-bottom.leaflet-left').append('<div class=\'source\'>Sources: Zillow, Florida Department of Education and ESRI <br> Note: Home values for each ZIP code are similar to recorded sales prices.</div>')

	 $('.income-box').keyup(function(event){	      
	      if (event.which >= 37 && event.which <= 40){
	          event.preventDefault();
	      }
	      
	      var inputNumber = $(this).val().replace(/,/gi, '');
	      var newNumber   = inputNumber.split(/(?=(?:\d{3})+$)/).join(',');
	 
		  $(this).val(newNumber);
	  });


	$('#check-button-house').on('change', '.house:checkbox', function(e) {

		var attr = $(this).attr('checked');
		var	houseCheckbox = $('.house:checkbox');
		var	condoCheckbox = $('.condo:checkbox');
		var	houseCheck = (houseCheckbox.is(':checked'));
		var	condoCheck = (condoCheckbox.is(':checked'));
		
		buildDefaultHouse();

		$('.condo:checkbox').attr('checked', false);

		if ((condoCheck === false) && (houseCheck === false)) {
			$('#house-price').css({
				'float': 'left',
				'width' : '50%',
				'border-right': '1px dashed #ccc'
			});

			$('#condo-price').css('display', 'block');
			
			flagSelectionError();
			buildDefaultLayer();
		}

		else {
			$('#house-price').css({
				'float': 'none',
				'border': 'none',
				'width' : '100%',
				'display': 'block'
			});
			removeError();
			$('#condo-price').css('display', 'none');
		}
	});

	$('#check-button-condo').on('change', '.condo:checkbox', function(e) {

		var attr = $(this).attr('checked');
		var	houseCheckbox = $('.house:checkbox');
		var	condoCheckbox = $('.condo:checkbox');
		var	houseCheck = (houseCheckbox.is(':checked'));
		var	condoCheck = (condoCheckbox.is(':checked'));

		buildDefaultCondo();

		$('.house:checkbox').attr('checked', false);

		if ((condoCheck === false) && (houseCheck === false)) {
			$('#condo-price').css({
				'float': 'right',
				'border': 'none',
				'width' : '50%'
			});
			$('#house-price').css('display', 'block');

			flagSelectionError();
			buildDefaultLayer();
		}

		else {
			$('#condo-price').css({
				'float': 'none',
				'border': 'none',
				'width' : '100%',
				'display': 'block'
			});

			removeError();
			$('#house-price').css('display', 'none');
		}
	});

	$('.income-box').focus(function() {
		 $(this).val('');
		 $('.income-button').removeAttr('disabled');
		 $('.section:first-of-type').after('<br class=\'stop-scroll\'>');
	});

	$('#check-button-income').on('change', '.income:checkbox', function(e) {
		$('.income-box').attr('placeholder', 'Enter income' )
		$('.savings:checkbox').attr('checked', false)
		$('.income-only').show();
	})

	$('#check-button-savings').on('change', '.savings:checkbox', function(e) {
		$('.income-box').attr('placeholder', 'Enter price' )
		$('.income:checkbox').attr('checked', false)
		$('.income-only').hide();	
	})

	$('#interface-container').on('click', '.price-select', function(event) {
		$('.crime-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');		
	
		$(this).addClass('selected-interface');
		
		var price = 'price';
		var incomeInput = $('.income-box').val();
		var	houseCheckbox = $('.house:checkbox');
		var	condoCheckbox = $('.condo:checkbox');
		var	houseCheck = (houseCheckbox.is(':checked'));
		var	condoCheck = (condoCheckbox.is(':checked'));
		var	inputEmpty = (incomeInput === '');

		if ((houseCheck === true && condoCheck === false) && (inputEmpty === false)) {
			buildHouseMap();
			buildKey(price)
			console.log('build house map');
		} 

		else if ((houseCheck === true && condoCheck === false) && (inputEmpty === true)) {
			buildDefaultHouse();
			buildKey(price)
			console.log('build condo map');
		}

		else if ((houseCheck === false && condoCheck === true) && (inputEmpty === false)) {
			buildCondoMap();
			buildKey(price)
			console.log('build condo map');
		}

		else if ((houseCheck === false && condoCheck === true) && (inputEmpty === true)) {
			buildDefaultCondo();
			buildKey(price)
			console.log('build condo map');
		}

		else {
			buildDefaultHouse();
			buildKey(price)
			console.log('build default house map');
		}
	});


	$('#interface-container').on('click', '.percent-select', function(event) {
			
		$('.crime-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		
		$(this).addClass('selected-interface');

		var percent = 'percent';
		var	incomeInput = $('.income-box').val();
		var	houseCheckbox = $('.house:checkbox');
		var	condoCheckbox = $('.condo:checkbox');
		var	houseCheck = (houseCheckbox.is(':checked'));
		var	condoCheck = (condoCheckbox.is(':checked'));
		var	inputEmpty = (incomeInput === '');
		

		if (((houseCheck === true) && (condoCheck === false)) && (inputEmpty === true)) {
			console.log('build default percent house map')
			buildDefaultPercentHouse();
			buildKey(percent)

		}

		else if ((houseCheck === true) && ((condoCheck === false) && (inputEmpty === false))) {
			buildHousePercentMap();
			buildKey(percent)
			console.log('build percent house map')

		}

		else if ((houseCheck === false) && ((condoCheck === true) && (inputEmpty === true))) {
			
			console.log('build percent condo map');
			
			buildDefaultPercentCondo();
			buildKey(percent)

		}

		else if ((houseCheck === false) && ((condoCheck === true) && (inputEmpty === false))) {
			buildCondoPercentMap();
			buildKey(percent)
			console.log('build percent condo map')

		}

		else {
			buildDefaultPercentHouse();
			buildKey(percent)
		}

	});



	$('#interface-container').on('click', '.crime-select', function(event) {
		
		$('.school-select').removeClass('selected-interface');
		$('.price-select').removeClass('selected-interface')
		$('.percent-select').removeClass('selected-interface');		
		$(this).addClass('selected-interface');

		var crime 		   = 'crime',
			incomeInput    = $('.income-box').val(),
			house_checkbox = $('.house:checkbox'),
			condo_checkbox = $('.condo:checkbox'),
			houseCheck 	   = (house_checkbox.is(':checked')),
			condoCheck 	   = (condo_checkbox.is(':checked')),
			inputEmpty 	   = (incomeInput === ''),
			schoolTable    = $('#school-list'),
			crimeRate = $('.crime-rate');

			crimeRate.show();
			


		if ((houseCheck === true && condoCheck === false) && (inputEmpty === false)) {
			buildCrimeMap();
			console.log('build crime map');
		} 

		else if ((houseCheck === false && condoCheck === true) && (inputEmpty === false)) {
			buildCrimeMap();
			console.log('build crime map');
		}

		else {
			buildKey(crime);
			buildDefaultCrime();

			console.log('build default crime map');
		}


	});


	$('#interface-container').on('click', '.school-select', function(event) {
		
		$('.price-select').removeClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');
		$('.crime-select').removeClass('selected-interface');

		$(this).addClass('selected-interface');

		var school 		   = 'school',
			incomeInput    = $('.income-box').val(),
			house_checkbox = $('.house:checkbox'),
			condo_checkbox = $('.condo:checkbox'),
			houseCheck 	   = (house_checkbox.is(':checked')),
			condoCheck 	   = (condo_checkbox.is(':checked')),
			inputEmpty 	   = (incomeInput === ''),
			schoolTable    = $('#school-list'),
			crimeRate = $('.crime-rate');
			schoolTable.show();

		if ((houseCheck === true && condoCheck === false) && (inputEmpty === false)) {
			buildSchoolMap();
			buildKey(school)
			console.log('build school map');
		} 

		else if ((houseCheck === false && condoCheck === true) && (inputEmpty === false)) {
			buildSchoolMap();
			buildKey(school)
			console.log('build school map');
		}

		else {
			buildKey(school)
			buildDefaultSchool();
			
			console.log('build default crime map');
		}

	});



	// WHEN EVERYTHING IS GOOD TO GO...
	// RUN MAP-BUILDING FUNCTIONS
	$('#input-container').on('click', '.income-button', function() {

		
		$('.map-interface').show();	
		
		var incomeInput = $('.income-box').val();
		
			income = getIncome(incomeInput);

		$houseLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: houseStyle });	

		$condoLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: condoStyle });

		$percentHouseLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: housePercentStyle });

		$percentCondoLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: condoPercentStyle });
		
		$crimeLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: crimeStyle });
		
		$schoolLayer = L.geoJson($zipData, { onEachFeature: onEachFeature, style: schoolStyle });


		checkInput(income);

		var mobile = 843;
		var w = window.innerWidth;

		if (mobile > w) {
			buildZipList();
		};

	});

	$('#input-container').on('click', '.reset', function () {

		var	houseCheckbox = $('.house:checkbox');
		var	condoCheckbox = $('.condo:checkbox');

		$('.income-box').val('');
		$('.income-button').removeAttr('disabled');

		condoCheckbox.attr('disabled', false);
		houseCheckbox.attr('disabled', false);


		if ((houseCheck === true || condoCheck === true)) {
			clearDefaultLayers();
		} 

		else {
			clearAllLayers();
		}
	
		$('.condo:checkbox').removeAttr('checked');
		$('.savings:checkbox').removeAttr('checked');
		$('.house:checkbox').removeAttr('checked');
		$('.income:checkbox').removeAttr('checked');

		$('#school-list').hide();
	

		var defaultOption = $('.housing-option option[value=\'default\']');
		
		defaultOption.removeAttr('disabled');

		$('#condo-price').css({
			'float': 'right',
			'border': 'none',
			'width' : '50%',
			'display' : 'block'
		})

		$('#house-price').css({
			'float': 'left',
			'width' : '50%',
			'border-right': '1px dashed #ccc',
			'display': 'block'
		})	

		$('.income-box').attr('placeholder', '' )
		

		var house_checkbox = $('.house:checkbox');
		var condo_checkbox = $('.condo:checkbox');
		var houseCheck 	   = (house_checkbox.is(':checked'));
		var condoCheck 	   = (condo_checkbox.is(':checked'));
		
				
		hideExplainer();
		removeError();
		
		buildDefaultLayer();
		flagSelectionError();

	});


	// LAUNCH PAD
	function init () {
		setDefaultMap();
		
	}

	// ACTIVATE!	
	$(document).ready(function() {	
		init();
	});

})();