# STAR Official Site

Official website of the Space Technology Association of Rutgers. Assembled by Jason Scot.

## Version Control

Version control for this project is managed with git, and stored remotely using BitBucket on the repo [https://bitbucket.org/jasonscot/star/src/](https://bitbucket.org/jasonscot/star/src/)

## Uploading and Distribution

It is intended for the entire contents of the repository to be uploaded to the hosting server **tpn23@physsun.rutgers.edu**

On this server, *only* the **public** folder and its contents/subdirectories must be made publically readable. All other files and directories must *not* be accessible by users.

## NPM & Dependencies

Editing the project's HTML and adding new documents/directories can be done easily. However, editing this project's existing JavaScript or SCSS will necessitate installing the appropriate npm dependencies (recorded within the project). The simplest way to do this is to install npm on your machine, then in the project's main directory run the command
```
npm install
```
The framework is set up such that the only thing to do next is run in the main directory the command
```
npm run watch
```
which will compile code from **src/sass/** and **/src/scripts** into **public/css/** and **public/js/**, respectively, in real time.

Note: *Please* follow these steps to change this project's JavaScript code, and especially CSS/SCSS, as the CSS is compiled down from SCSS.

