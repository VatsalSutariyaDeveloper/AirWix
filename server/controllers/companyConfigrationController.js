const fs = require('fs');
const path = require('path');
const { User } = require('../models');
const { validateRequest } = require('../helpers/validateRequest');
const commonQuery = require('../helpers/commonQuery');

const MODULE = 'User';

