'use strict';

var path = require('path');
var truth = require('sass-true');

var sassFile = path.join(__dirname, 'tests.scss');
truth.runSass({file: sassFile}, describe, it);