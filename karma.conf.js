module.exports = function(config){
  config.set({

    basePath : './',

    files : [
      'app/js/jquery-1.11.3.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-route/angular-route.js',
      'app/bower_components/angular-mocks/angular-mocks.js',
      'app/bower_components/angular-messages/angular-messages.js',
      'app/bower_components/textAngular/*.js',
      'app/bower_components/font-awesome/*.js',
      'app/bower_components/angular-utils-disqus/dirDisqus.js',
      'app/components/**/*.js',
      'app/bower_components/rangy/rangy-core.js',
      'app/bower_components/rangy/rangy-selectionsaverestore.js',
      'app/bower_components/textAngular/dist/textAngular-sanitize.js',
      'app/bower_components/textAngular/dist/textAngularSetup.js',
      'app/bower_components/textAngular/dist/textAngular.js',
      //load modules first
      'app/modules/*.js',
      'app/authentication/authModule.js',
      'app/blogs/*.js',
      'app/authentication/*.js',
      'app/js/index.js',
      'app/js/sidebar.js',  
      'app/view*/*.js'
    ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
