# Webpack Template Project
This folder contains a webpack template project. You can copy this folder and use it as a base for your project. 

### How to Use 
1. Make a copy of this folder and rename it. 
2. Open a terminal and ``cd`` into the folder you just created. 
3. In the terminal run ``npm install``.

You are now ready to work. You only needed to do the above steps once. When you are developing your application run the following command to start the webpack development server:

* In the terminal run ``npm run dev``.

This will allow you to view changes to your application whenever you make changes. 

When you are ready to deploy your application, run the following command:

* In the terminal run ``npm run build``

This will bundle the files and put them in the folder ``./dist/`` that you will put on your webserver. 

### Files
+ **dist**
+ **src**
    + **style**
        + main.css
    + index.html
    + index.js
+ **static**
    + dai.png
+ .gitignore
+ package-lock.json
+ package.json
+ README.md
+ webpack.config.js


