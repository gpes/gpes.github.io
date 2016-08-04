/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    // Task configuration.
    sass: {
      dist: {
        options: {
          style: 'expanded',
          loadPath: [
            'bower_components/bootstrap-sass/assets/stylesheets',
            'bower_components/mdi/scss'
          ],
          noCache: true
        },
        files: {
          'css/main.css': '_src/scss/main.scss'
        }
      }
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      dist: {
        src: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
          '_src/js/main.js'
        ],
        dest: '_src/js/app.main.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '_src/js/app.main.js',
        dest: 'js/app.main.min.js'
      }
    },
    watch: {
      sass: {
        files: ['_src/scss/**'],
        tasks: ['sass']
      },
      js: {
        files: ['_src/js/**'],
        tasks: ['concat', 'uglify']
      },
      images: {
        files: ['_src/images/**'],
        tasks: ['imagemin']
      }
    },
    copy: {
      bootstrap: {
        files: [
          {expand: true, cwd: 'bower_components/bootstrap-sass/assets/fonts/', src: ['**'], dest: 'fonts/'}
        ]
      },
      materialdesignicons: {
        files: [
          {expand: true, cwd: 'bower_components/mdi/fonts/', src: ['**'], dest: 'fonts/'}
        ]
      }
    },
    imagemin: {
      options: {
        cache: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: '_src/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: 'images'
        }]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Default task.
  grunt.registerTask('default', ['concat', 'sass', 'uglify', 'copy', 'imagemin', 'watch']);

};
