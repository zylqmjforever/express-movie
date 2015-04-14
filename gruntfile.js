module.exports = function (grunt) {

	grunt.initConfig({
		watch: {
			jade: {
				files: ['views/**'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/javascripts/**/*.js', 'models/**/*.js', 'schemas/**/*.js'],
				tasks: ['jshint'],
				options: {
					livereload: true
				}
			}
		},
		jshint: {
			all: ['public/javascripts/**/*.js', 'models/**/*.js', 'schemas/**/*.js']
		},
		nodemon: {
			dev: {
				script: 'bin/www',
				options: {
					nodeArgs: '--debug',
					args: [],
					callbck: function(event) {

					},
					ignore: ['node_modules/**', 'public/**', 'views'],
					ext: ['js'],
					// watch: ['routes', 'models', 'schemas'],
					debug: true,
					delayTime: 1000,
					env: {
						PORT: 3000
					},
					cwd: __dirname
				}
			}
		},
		concurrent: {
			tasks: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-concurrent');

	// grunt.option('force', true);

	grunt.registerTask('default', ['concurrent']);
}