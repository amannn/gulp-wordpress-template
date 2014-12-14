## Description
A very basic proof-of-concept, showing that gulp can work as a replacement for MAMP/XAMPP and also extend their features for SASS compiling for example.

## Tasks
### gulp serve
Alias: ``gulp``

Start the development server on ``localhost:3000``. phpMyAdmin is available on ``localhost:1337``.

SASS files are being compiled to the same directory where they are in. E.g. ``wordpress/wp-content/themes/twentyfourteen/style.scss`` is compiled to ``wordpress/wp-content/themes/twentyfourteen/style.css`` (works also for other themes).

### gulp build
Not available yet, but should be done if this template is used in production.

## Setup
1. Install PHP (if you haven't already)
2. Install MySQL (if you haven't already).
3. Make sure MySQL is running
4. Make sure phpMyAdmin has the correct MySQL settings in ``config.inc.php``
5. ``npm install``
6. Go to ``node_modules/gulp-connect-php`` and ``npm install`` (should be removed soon, see also https://github.com/micahblu/gulp-connect-php/issues/1)

## Known Bugs
 - Live Reload doesn't work (this will work as soon as this issue is resolved: https://github.com/shakyShane/browser-sync/issues/335)