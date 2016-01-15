var src               = "app";
var build             = "build";
var development       = "build/development";
var production        = "build/production";
var srcAssets         = "app/assets";
var developmentAssets = "build/development/assets";
var productionAssets  = "build/production/assets";

module.exports = {
  browsersync: {
    development: {
      server: {
        baseDir: [development]
      },
      port: 9999,
      files: [
        developmentAssets + "/css/*.css",
        developmentAssets + "/js/*.js",
        developmentAssets + "/images/*",
        developmentAssets + "/fonts/*"
      ]
    },
    production: {
      server: {
        baseDir: [production]
      },
      port: 9998
    }
  },

  delete: {
    development: {
      src: [development + "/**/*.html", developmentAssets]
    },
    production: {
      src: [production]
    }

  },

  sass: {
    src: srcAssets + "/scss/**/*.+(scss|sass)",
    dest: developmentAssets + "/css",
    options: {
      includePaths: ["bower_components"]
    }
  },

  html: {
    development: {
      src: src + "/**/*.html",
      dest: development
    },
    production: {
      src: src + "/**/*.html",
      dest: production
    }
  },

  autoprefixer: {
    browsers: [
      "> 1%"
    ]
  },

  browserify: {
    // Enable source maps
    debug: true,
    // Additional file extensions to make optional
    extensions: ['.coffee', '.hbs'],
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [
        {
          entries:    './' + srcAssets + '/js/application.js',
          dest:       developmentAssets + '/js',
          outputName: 'application.js'
        },
      //  {
      //   entries:    './' + srcAssets + '/javascripts/head.js',
      //   dest:       developmentAssets + '/js',
      //   outputName: 'head.js'
      //  }
    ]
  },

  images: {
    src:  srcAssets + '/images/**/*',
    dest: developmentAssets + '/images'
  },

  copyfonts: {
    development: {
      src:  srcAssets + '/fonts/*',
      dest: developmentAssets + '/fonts'
    },
    production: {
      src:  developmentAssets + '/fonts/*',
      dest: productionAssets + '/fonts'
    }
  },

  inlineBase64: {
      baseDir: srcAssets,
      maxImageSize: 25 * 1024, // bytes
      debug: true
  },

  watch: {
    sass:    srcAssets + '/scss/**/*.{sass,scss}',
    scripts: srcAssets + '/js/**/*.js',
    images:  srcAssets + '/images/**/*',
    // sprites: srcAssets + '/images/**/*.png',
    svg:     srcAssets + '/icon-vectors/*.svg',
    html:    src + "/**/*.html"
  },

  scsslint: {
    src: [
      srcAssets + '/scss/**/*.{sass,scss}',
      '!' + srcAssets + '/scss/fontcustom/**/*',
      // '!' + srcAssets + '/scss/helpers/_meyer-reset.scss'
      ],
      options: {
        // bundleExec: true
      }
  },

  jshint: {
    src: srcAssets + '/js/*.js'
  },

  optimize: {
    css: {
      src:  developmentAssets + '/css/*.css',
      dest: productionAssets + '/css/',
      options: {
        keepSpecialComments: 0
      }
    },
    js: {
      src:  developmentAssets + '/js/*.js',
      dest: productionAssets + '/js/',
      options: {}
    },
    images: {
      src:  developmentAssets + '/images/**/*.{jpg,jpeg,png,gif,svg}',
      dest: productionAssets + '/images/',
      options: {
        optimizationLevel: 3,
        progessive: true,
        interlaced: true
      }
    }
  },

  revision: {
    src: {
      assets: [
        productionAssets + '/css/*.css',
        productionAssets + '/js/*.js',
        productionAssets + '/images/**/*'
      ],
      base: production
    },
    dest: {
      assets: production,
      manifest: {
        name: 'manifest.json',
        path: productionAssets
      }
    }
  },

  collect: {
    src: [
      productionAssets + '/manifest.json',
      production + '/**/*.{html,xml,txt,json,css,js}',
      '!' + production + '/feed.xml'
    ],
    dest: production
  }
}
