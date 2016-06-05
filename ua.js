var config = require('./config.js');

var casper = require('casper').create({
	verbose: !!config.verbose,
	logLevel: config.log_level || "info"
});

var existing_apps = {};

casper.start('https://go.urbanairship.com/accounts/login/', function(){
	var form_data = {
		username: config.username,
		password: config.password
	};

	console.log('Logging in...');

	this.fill('form[name="login"]', form_data, true);
});

casper.then(function(){}); // Not really sure why I needed to add this.. maybe because of a re-direct?

casper.then(function(){
	if(this.getTitle().match(/Login/))
	{
		console.error('Incorrect Username/Password');
		this.exit();
	}
	else
	{
		console.log('Login successful.');
	}
});

casper.thenOpen('https://go.urbanairship.com/apps/', function(){
	var apps = this.evaluate(function(){

		var apps = {};

		$('.main-app-list div.app-meta').each(function(i,el){
			var $el = $(el);
			var title = $el.find('h3').text();
			var mode = 'development';
			if($el.find('.meta-prod').length > 0)
			{
				mode = 'production';
			}

			apps[title+'-'+mode] = {
				title: title,
				mode: mode
			};
		});

		return apps;
	});

	existing_apps = apps;
});

casper.then(function(){
	config.apps_to_create.forEach(function(app){
		var key = app[0]+'-'+app[1];

		if(!(key in existing_apps))
		{
			console.log('Queueing creation of app '+key);

			(function(){
				var app_to_create = app;

				casper.thenOpen('https://go.urbanairship.com/apps/new/', function(){

					console.log('Creating app '+app[0]+' - ' + app[1]);

					var form_data = {
						name: app_to_create[0],
						mode: app_to_create[1],
					};

					var self = this;

					this.evaluate(function(){
						jQuery('#id_platforms_ios').click();
						jQuery('#id_platforms_android').click();
					});

					this.fill('form.module', form_data, true);
				})

				casper.then(function(){

				});

			})();
		}
		else
		{
			console.log('App '+key+' already exists. Skipping');
		}
	});
});

casper.then(function(){
	console.log('Done!');
});


casper.run();