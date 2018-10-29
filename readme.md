How to use?
---------
#### 1. Install npm [site](https://www.npmjs.com)
#### 2. Install npm packages <code >  npm install -d</code>
#### 3. Configuration:
+ dev configuration - without minification
How to run?
<code >  npm  run build</code>
+ release configuration - with minification
How to run?
<code >npm run build-release</code>
#### Find all files in directory "./new_/js/**".
#### How import/export dependencies?
Use import.
<code>import {crmDirectory} from '../common/crm_directory.js';</code>
Use export.
<code>export const crmDirectory = d;</code>
#### Output
##### dev configuration - in dist-dev folder.
##### release configuration - in dist folder.