module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		concat: {
			dist: {
				src: [
					'js/plugins/owl.carousel.js',
					// 'js/plugins/core.js',
					// 'js/plugins/mediaquery.js',
					// 'js/plugins/swap.js',
					// 'js/plugins/touch.js',
					// 'js/plugins/navigation.js',
					// 'js/plugins/jquery.fs.shifter.js',
					'js/plugins/dropdown.js',
					'js/plugins/foundation.min.js',
					'js/plugins/jquery.lazyload.js',
					// 'js/plugins/jquery.waypoints.js',
					// 'js/plugins/sticky.js',
					// 'js/plugins/menubar.js',
					'js/main.js'
				],
				dest: 'js/build/production.js'
			}
		},

		uglify: {
			build: {
				src: ['js/build/production.js'],
				dest: 'js/build/production.min.js'
			}
		},

		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'css/p3.css': 'scss/master.scss'
				}
			}
		},

		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: 'images/',
					src: ['**/*.{png,jpg,gif}'],
					dest: 'images/'
				}]
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			scripts: {
				files: ['js/*.js', 'js/**/*.js'],
				tasks: ['concat', 'uglify'],
				options: {
					spawn: false,
				}
			},
			css: {
				files: ['scss/*.scss', 'scss/**/*.scss'],
				tasks: ['sass'],
				options: {
					spawn: false,
				}
			},
			markup: {
					files: ['*.php','includes/*.php'],
					options: {
							livereload: true,
					}
			}
		},

	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify', 'sass', 'watch']);


};