define(['backbone', 'handlebars'], function(Backbone, Handlebars){
//JS for Movie Seating App

var numSeatsSelected = 0,
	numSeats = 1;

//----------------//
//---- MODELS ----//
//----------------//



//---- Model for a single seat ----//
var SeatModel = Backbone.Model.extend({
	defaults: {
		id: 00,
		taken: false
	}
});


//---------------------//
//---- Collections ----//
//---------------------//

//---- Collection based on seatModel ----//

var SeatCollection = Backbone.Collection.extend({
	model: SeatModel
});

//---------------//
//---- VIEWS ----//
//---------------//

//---- View for a single single seat ----//

var SeatView = Backbone.View.extend({
	className: 'seatContainer',
	template: Handlebars.default.compile( $('#seatTemplate').html()),
	optItemTemplateAdult: Handlebars.default.compile( $('#seatOptionTemplateAdult').html()),
	optItemTemplateChild: Handlebars.default.compile( $('#seatOptionTemplateChild').html()),
	initialize: function(){
		this.model.bind('change', this.render, this);
	},
	events: {
		"click .seat": "toggleTaken"
	},
	toggleTaken: function(){
		if(this.model.get('taken') == false){
			if(numSeatsSelected < numSeats){

				numSeatsSelected++;

				if(this.model.get('wheelChair')){

					if(confirm("This is seat is reserved for Wheelchairs, if you do not require a wheelchair please click \"cancel\" and select another seat")){
						this.model.set({taken: true});
					}else{
						numSeatsSelected--;
					}

				}else if(this.model.get('wcCompanion')){

					if(confirm("This is seat is reserved for Wheelchair Companions, if you are not a Wheelchair companion please click \"cancel\" and select another seat")){
						this.model.set({taken: true});
					}else{
						numSeatsSelected--;
					}

				}else{
					this.model.set({taken: true});
				}

			}else{
				alert("You have only selected "+numSeats+" seat(s)");
			}
		}else{
			numSeatsSelected--;
			this.model.set({taken: false});
		}
	},
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));

		return this;
	}
});


//--------------------------//
//---- COLLECTION VIEWS ----//
//--------------------------//

var SeatCollectionView = Backbone.View.extend({
	el: '.seating-wrapper',
	render: function(){
		this.collection.each(function(seatModel){
			var seatView = new SeatView({model: seatModel});
			this.$el.append(seatView.render().el);
		}, this);

		return this;
	}
});

var SeatSelectCollectionView = Backbone.View.extend({
	el: '#numSeatsContainer',
	events: {
		"change #numSeatsAdult": "setNumSeats",
		"change #numSeatsChild": "setNumSeats"
	},
	setNumSeats: function(){
		this.collection.each(function(model){
			model.set({taken: false});
		}, this);
		numSeats = Number(this.$el.find('#numSeatsAdult').val())+Number(this.$el.find('#numSeatsChild').val());
		numSeatsSelected = 0;
	},
	initialize: function(){
		this.render();
	},
	render: function(){
		this.collection.each(function(seatOptionModel){
			var seatView = new SeatView({model: seatOptionModel});
			this.$el.find('#numSeatsAdult').append(seatView.optItemTemplateAdult(seatOptionModel));
			this.$el.find('#numSeatsChild').append(seatView.optItemTemplateChild(seatOptionModel));

		}, this);

		return this;
	}
});

return {
	numSeats: numSeats,
	SeatModel: SeatModel,
	SeatCollection: SeatCollection,
	SeatView: SeatView,
	SeatCollectionView: SeatCollectionView,
	SeatSelectCollectionView: SeatSelectCollectionView
}



});