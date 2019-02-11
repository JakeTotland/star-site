const mix = require('laravel-mix');

mix.babel(['src/scripts/main.js'], 'public/js/main.js')
   .sass('src/sass/main.scss', 'public/css')
   .copyDirectory('node_modules/@fortawesome/fontawesome-free/webfonts', 'public/fonts/fontawesome')
   .copyDirectory('node_modules/bootstrap-sass/assets/fonts/bootstrap', 'public/fonts/bootstrap')
   .options({
      processCssUrls: false,
      postCss: [
         require('postcss-import')(),
         require('postcss-flexbugs-fixes')(),
         require('postcss-pxtorem')({
            rootValue: 16,
            mediaQuery: false
         }),
         require('css-mqpacker')(),
         require('autoprefixer')(),
         require('cssnano')({
            "preset": [
               "default",
               {
                  calc: false,
                  discardComments: {removeAll: true},
                  normalizeWhitespace: true
               }
            ]
         })
      ]
   });
