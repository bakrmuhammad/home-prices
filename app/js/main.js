// SCOPE
// ORGANIZE PUBLIC OBJECTS
'use strict';

(function () {

	 $('.income-box').keyup(function(event){	      
	      // skip for arrow keys
	      if(event.which >= 37 && event.which <= 40){
	          event.preventDefault();
	      }
	      
	      var inputNumber = $(this).val().replace(/,/gi, ''),
	      	  newNumber   = inputNumber.split(/(?=(?:\d{3})+$)/).join(',');
	 
		  $(this).val(newNumber);
	  });


	$('#check-button-house').on('change', '.house:checkbox', function(e) {

		var attr   	   		= $(this).attr('checked'),
			houseCheckbox 	= $('.house:checkbox'),
			houseCheck 		= (houseCheckbox.is(':checked'));
		

		buildDefaultHouse();


		$('.condo:checkbox').attr('checked', false);

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
					'width' : '100%',
					'display': 'block'
				});

			$('#condo-price').css('display', 'none');
		}
		
		// removeError();
	});


	$('#check-button-condo').on('change', '.condo:checkbox', function(e) {

		var attr 			= $(this).attr('checked'),
			condoCheckbox 	= $('.condo:checkbox'),
			condoCheck 		= (condoCheckbox.is(':checked'));

			buildDefaultCondo();
		
			$('.house:checkbox').attr('checked', false);


		if (condoCheck === false) {
			$('#condo-price').css({
				'float': 'right',
				'border': 'none',
				'width' : '50%'
			});
			$('#house-price').css('display', 'block');
		}

		else {
			$('#condo-price').css({
					'float': 'none',
					'border': 'none',
					'width' : '100%',
					'display': 'block'
				});

			$('#house-price').css('display', 'none');

		}
		
		// removeError();
	});

	$('.income-box').focus(function() {
		 $(this).val('');
		 $('.income-button').removeAttr('disabled');
		 $('.section:first-of-type').after('<br class=\'stop-scroll\'>');
	});



	$('#check-button-income').on('change', '.income:checkbox', function(e) {

		$('.income-box').attr('placeholder', 'Enter income' )

		$('.savings:checkbox').attr('checked', false)


	})

	$('#check-button-savings').on('change', '.savings:checkbox', function(e) {

		$('.income-box').attr('placeholder', 'Enter amount' )

		$('.income:checkbox').attr('checked', false)
				

	})


	$('#interface-container').on('click', '.price-select', function(event) {

		$('.crime-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.percent-select').removeClass('selected-interface');		
		
		$(this).addClass('selected-interface');
		
		var incomeInput    = $('.income-box').val(),
			houseCheckbox  = $('.house:checkbox'),
			condoCheckbox  = $('.condo:checkbox'),
			houseCheck 	   = (houseCheckbox.is(':checked')),
			condoCheck 	   = (condoCheckbox.is(':checked')),
			inputEmpty 	   = (incomeInput === ''),
			schoolTable    = $('#school-list');

			schoolTable.hide();

		if ((houseCheck === true && condoCheck === false) && (inputEmpty === false)) {
			buildHouseMap();
			console.log('build house map');
		} 

		else if ((houseCheck === true && condoCheck === false) && (inputEmpty === true)) {
			buildDefaultHouse();
			console.log('build condo map');
		}

		else if ((houseCheck === false && condoCheck === true) && (inputEmpty === false)) {
			buildCondoMap();
			console.log('build condo map');
		}

		else if ((houseCheck === false && condoCheck === true) && (inputEmpty === true)) {
			buildDefaultCondo();
			console.log('build condo map');
		}

		else {
			buildDefaultHouse();
			console.log('build default house map');
		}
	});


	$('#interface-container').on('click', '.percent-select', function(event) {
			
		$('.crime-select').removeClass('selected-interface');
		$('.school-select').removeClass('selected-interface');
		$('.price-select').removeClass('selected-interface');
		
		$(this).addClass('selected-interface');

		var percent 	   = 'percent',
			incomeInput    = $('.income-box').val(),
			houseCheckbox  = $('.house:checkbox'),
			condoCheckbox  = $('.condo:checkbox'),
			houseCheck 	   = (houseCheckbox.is(':checked')),
			condoCheck 	   = (condoCheckbox.is(':checked')),
			inputEmpty 	   = (incomeInput === ''),
			schoolTable    = $('#school-list');

			schoolTable.hide();


		if (((houseCheck === true) && (condoCheck === false)) && (inputEmpty === true)) {
			console.log('build default percent house map')
			buildDefaultPercentHouse();

		}

		else if ((houseCheck === true) && ((condoCheck === false) && (inputEmpty === false))) {
			buildHousePercentMap();
			console.log('build percent house map')

		}

		else if ((houseCheck === false) && ((condoCheck === true) && (inputEmpty === true))) {
			
			console.log('build percent condo map');
			
			buildDefaultPercentCondo();

		}

		else if ((houseCheck === false) && ((condoCheck === true) && (inputEmpty === false))) {
			buildCondoPercentMap();
			console.log('build percent condo map')

		}

		else {
			buildDefaultPercentHouse();
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
			schoolTable    = $('#school-list');

			schoolTable.hide();

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
			schoolTable    = $('#school-list');

			schoolTable.show();

		if ((houseCheck === true && condoCheck === false) && (inputEmpty === false)) {
			buildSchoolMap();
			console.log('build school map');
		} 

		else if ((houseCheck === false && condoCheck === true) && (inputEmpty === false)) {
			buildSchoolMap();
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
	$('#button-container').on('click', '.income-button', function() {
		
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

		var mobile = 600,
			w = window.innerWidth;

		if (mobile > w) {
			buildZipList();
		};
					

	});

	$('#button-container').on('click', '.reset', function () {

		$('.income-box').val('');
		$('.income-button').removeAttr('disabled');

		$('.house:checkbox').removeAttr('checked');
		$('.condo:checkbox').removeAttr('checked');


		$('#list-container').hide();


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
		

		clearAllLayers();
		hideExplainer();
		setDefaultMap();
		removeError();

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