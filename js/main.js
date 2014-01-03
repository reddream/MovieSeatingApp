define(['config'], function(){
	require(['App', 'fiftySeatLayout', 'getSeatId-helper'], function(App, fiftySeatCollection){

		//---- CREATE VIEW FOR ALL SEATS AND RENDER TO DOM ----//
		var seatCollectionView = new App.SeatCollectionView({collection: fiftySeatCollection});
		seatCollectionView.render();

		var seatSelectView = new App.SeatSelectCollectionView({collection: fiftySeatCollection});

		//---- DISPLAY TOTAL NUMBER OF SEATS SELECTED ----//
		$(function(){
			var numSeatsAdult = $('#numSeatsAdult'),
				numSeatsChild = $('#numSeatsChild');
			$('#totalSeats').html(Number(numSeatsAdult.val())+Number(numSeatsChild.val()));
			numSeatsAdult.change(function(){
				$('#totalSeats').html(Number(numSeatsAdult.val())+Number(numSeatsChild.val()));
			});
			numSeatsChild.change(function(){
				$('#totalSeats').html(Number(numSeatsAdult.val())+Number(numSeatsChild.val()));
			});
		});
	});
});