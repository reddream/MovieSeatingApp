//---- HANDLEBARS HELPERS ----//
define(['handlebars','App'], function(Handlebars, App){

Handlebars.default.registerHelper('getSeatId', function(id){
	if(id == App.numSeats){
		return 'selected="selected"';
	}
});

});
