animasong.js
======

animasong.js is an html5 music player which uses [dancer.js](https://github.com/jsantell/dancer.js/) for analyzing the song and create animations.

http://animasong.antoinemineau.com

_v0.1.0 (7/12/2014)_

Features
---
* Available actions: play, pause, mute / change volume.
* 1 song provider supported: Soundcloud (http://soundcloud.com/)
* 2 animations: spectrum / equalizer

Example
---
### Setup
```
    var animasong = new Animasong({
        'song': {
            'provider' : 'soundcloud',
            'location' : 'https://soundcloud.com/neversaydie/zomboy-immunity-1',
        },
        'container': '#player',
        'animation': 'equalizer',
    });
    animasong.start();
```

* **provider**: the name of the selected provider. At the moment only Soundcloud is supported.
* **location**: the url of the song you want to play.
* **container**: the div where you want to set the player. The player will match the width and height of the container.
* **animation**: the animation you want to show (spectrum, equalizer)


Browser Support
----

* Chrome 10+
* Doesn't work on Firefox, more details [here](http://stackoverflow.com/questions/19708561/firefox-25and-audiocontext-createjavascriptnote-not-a-function)

Dependencies
---
* [jquery.js](https://github.com/jquery/jquery) - Used to manage the events binding of the player. Not included in animasong.js
* [dancer.js](https://github.com/jsantell/dancer.js/) - Used to analyze the song and add animations. Included in animasong.js
* [handlebars.js](https://github.com/wycats/handlebars.js/) - Used to render the player template. Included in animasong.js

Development
---
This project uses [grunt](https://github.com/cowboy/grunt) to build. Run `grunt` from the project root to lint and build files.

Change Logs
---

**v0.1.0 (7/12/2012)**

* Available Actions: pause / play, mute /change volume.
* 2 animations: spectrum / equalizer
* 1 provider: Soundcloud

To do
---
* Create an error handler
* Create a localhost provider
* Create tests for browser support
* Create new animations
* Create a song duration current / total
* Create options to set the colors of the player, animation...
* Add a button to make the player fullscreen (using screenfull.js)