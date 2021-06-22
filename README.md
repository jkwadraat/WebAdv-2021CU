# Exam

## Start your exam

- Run `npm install`
- Start the SASS compiler and browser-sync with the command `gulp` or `npm run watch`

## Upload exam to Canvas

- Open _gulpfile.js_
- Replace, on line 2, the value for the variable `name` with your class, surname and name: e.g. `1ITF01_Doe_John`
- Run the command `gulp zip` or `npm run zip`
  (a file _1ITF01_Doe_John.zip_ is created at the root of your project)
- **Check if this _.zip_-file contains all the (non-hidden) files from this project, except the _node_modules_ folder!**
- Upload the file _1ITF01_Doe_John.zip_ to Canvas
