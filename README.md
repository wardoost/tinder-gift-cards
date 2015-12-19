##Installation

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [getting started](http://gruntjs.com/getting-started) guide. Open terminal and install Grunt command line interface globally. You may need to use sudo.
```
npm install -g grunt-cli
```

Install Grunt Dependencies.
```
npm install
```

For the favicons generator task to work you might need to install ImageMagick.
```
brew install imagemagick
```

Edit Gruntfile.js and the source files to your needs and run grunt.
```
grunt
```

##Commands

The default grunt command builds the site and starts a local server.
```
grunt
```

The grunt dev command builds the site and seo and starts a local server.
```
grunt dev
```

The grunt deploy command builds the site and seo and uploads the site with ftp. You need to create a .ftppass file in de root of the grunt project with authentification of your FTP server. More info on the [Grunt FTP deploy task GitHub page](https://github.com/zonak/grunt-ftp-deploy) about this.
```
grunt deploy
```

You can add the flag "absolute" to have absolute paths in your HTML. This is practically only useful when deploying the site.
```
grunt deploy --absolute
```
