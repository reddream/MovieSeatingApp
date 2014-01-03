require.config({
	baseUrl: 'js',
	paths: {
		'jquery': 'libs/jquery',
		'underscore': 'libs/underscore',
		'backbone': 'libs/backbone',
		'handlebars': 'libs/handlebars',
		'fiftySeatLayout': 'layouts/fifty-seat-layout'
	},
	shim: {
		'backbone': {
			deps: ['underscore','jquery'],
			exports: 'Backbone'
		},
		'underscore': {
			deps: ['jquery'],
			exports: '_'
		}
	}
});