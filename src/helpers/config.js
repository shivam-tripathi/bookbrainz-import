/*
 * Copyright (C) 2018  Shivam Tripathi
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

import log from '../helpers/logger';
import path from 'path';
import {readFileSync} from 'fs';


/** @module config */

/*
 * @type {string} FILE
 * Path to config file.
 **/
const FILE = path.join(__dirname, '../../config/config.json');

/**
 * Extract the import configuration from the config file.
 * @param {Array.<string>} configKeys - The keys, in nesting order, to reach the
 *		relevant config object. For example, to extract OL works, if the JSON
 *		object structure is {"openLibrary": {"works": {...}, ...}, ...}, the
 *		arguments would be ['openLibrary', 'works'].
 * @returns {Object} - JS Object constaining configuration values.
 */
export default function config(configKeys) {
	try {
		if (configKeys || null) {
			const configContents =
				JSON.parse(readFileSync(`${FILE}`));

			return configKeys.reduce(
				(content, key) => content[key], configContents);
		}
	}
	catch (err) {
		throw new Error('Configuration values not found!');
	}

	return null;
}
