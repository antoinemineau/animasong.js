(function ()  {

var Animasong = function (parameters) {
        this.parameters = parameters;
        this.song = {};
        this.container = {}
        this.dancer = new Dancer();
        this.provider = Animasong.getProvider(this);
    };
  
    Animasong.version = '0.1.0';
    Animasong.providers = {}
    
    Animasong.prototype = {
        
        start: function() {
            if (Animasong.hasValidParameters(this)) {
                this.appendTemplate();
                this.setEvents();
                this.autoplay = (this.parmameters && this.parameters.autoplay) ? true : false;
                this.provider.load(this);
            }
        },
        
        appendTemplate: function() {
            this.container.id = this.generateId();
            
            var template = Animasong.Templates['assets/templates/player.hbs'];
            var vars = this.parameters;
            vars.id = this.container.id;
            var html = template(vars);
            $(this.parameters.container).append(html);
            this.initVars();
            this.setCanvasSizeDefault();
        },
        
        generateId: function() {
            var chars = '0123456789';
            var id  = 'animasong-';
            
            for (var i = 0; i < 5; i++) {
                id += chars.charAt(Math.floor(Math.random() * 5));
            }
            
            return id;
        },
        
        initVars: function () {
            this.canvas = document.getElementById(this.container.id);
            this.context = this.canvas.getContext('2d');
            this.bar = $(this.parameters.container + ' .animasong-bar');
            this.playButton = $(this.parameters.container + ' .animasong-bar-play i');
            this.songTitle = $(this.parameters.container + ' .animasong-bar-song-name');
            this.playerBar = $(this.parameters.container + ' .animasong-bar');
            this.playerVolume = $(this.parameters.container + ' .animasong-bar-volume-slider');
            this.playerVolumeButton = $(this.parameters.container + ' .animasong-bar-volume i');
        },
        
        setAnimation: function (load) {
            load = typeof load !== undefined ? load : false;
            
            switch (this.parameters.animation) {
                case 'spectrum':
                    this.setSpectrumAnimation(load);
                    break;
                case 'equalizer':
                    this.setEqualizerAnimation(load);
                    break;
                default:
                    break;
           }
           (this.isDancerSupported()) ? this.loadDancer() : this.setNotSupported();
        },
        
        setAnimasongBar: function() {
            (this.autoplay) ? this.addPlayButtonClass('animasong-icon-pause') : this.addPlayButtonClass('animasong-icon-play');
            this.setSongTitle();
        },
        
        setCanvasSizeDefault: function () {
            $(this.parameters.container).css({'width': this.container.width, 'height': this.container.height});
            this.canvas.width = this.container.width;
            this.canvas.height = this.container.height - 30;
        },

        
        setSongTitle: function() {
            this.songTitle.append(this.song.title);
        },
        
        setEvents: function() {
            var _this = this;
            
            this.playerBar.on('click', '.animasong-icon-play', function() {
                _this.play();
            });
            
            this.playerBar.on('click', '.animasong-icon-pause', function() {
                _this.pause();
            });
            
            this.playerVolume.click(function(e) {
                var offsetX = $(this).offset().left;
                var volume = (e.pageX - offsetX) * 2;
                $(this).find('.animasong-bar-volume-slider-current').css({'width': volume + '%'});
                _this.setVolume(volume / 100);
            });
            
            this.playerVolumeButton.click(function() {
                if ($(this).hasClass('animasong-icon-volume')) {
                    $(this).removeClass('animasong-icon-volume').addClass('animasong-icon-volume-strike');
                    $(this).parent().find('.animasong-bar-volume-slider-current').css({'width': 0});
                    _this.setVolume(0);
                } else {
                    $(this).removeClass('animasong-icon-volume-strike').addClass('animasong-icon-volume');
                    $(this).parent().find('.animasong-bar-volume-slider-current').css({'width': '20%'});
                    _this.setVolume(0.2);
                }
            });
        },
        
        setEqualizerAnimation: function (load) {
            var $this = this;
            
            this.dancer
                .createKick({
                    onKick: function () {
                      $this.context.fillStyle = '#ECA11C';
                    },
                    offKick: function () {
                      $this.context.fillStyle = '#006400';
                    }
                })
                .on();
                
            if (load) {
                this.dancer.load({ 'src': this.song.stream });
                this.setVolume(0.2);
                this.playerVolumeButton.parent().find('.animasong-bar-volume-slider-current').css({'width': '20%'});
            }
            this.setDancerAnimation();
        },
        
        setDancerAnimation: function () {
            switch (this.parameters.animation) {
                case 'spectrum':
                    this.dancer.waveform(this.canvas, {
                        strokeStyle: '#006400',
                        strokeWidth: 2
                    });
                    break;
                case 'equalizer':
                    this.dancer.fft(this.canvas, { 
                        width: 10 
                    });
                    break;
                default:
                    break;
            }
        },
        
        setSpectrumAnimation: function (load) {
            var $this = this;
            
            if (load) {
                this.dancer.load({ 'src': this.song.stream });
                this.setVolume(0.2);
                this.playerVolumeButton.parent().find('.animasong-bar-volume-slider-current').css({'width': '20%'});
            }
            this.setDancerAnimation();
        },
        
        setVolume: function(volume) {
            if (volume >= 0 && volume <= 1) {
                this.dancer.setVolume(volume);
            }
        },
        
        setNotSupported: function () {
            this.showError('Your browser doesn\'t support Animasong. Please consider installing a new one such as <u><a href="https://www.google.com/chrome/" target="_blank">Google chrome</a></u> or <u><a href="https://www.mozilla.org/en-US/firefox/new/" target="_blank">Mozilla Firefox</a></u>');
        },
        
        isDancerSupported: function () {
             return Dancer.isSupported();
        },
        
        loadDancer: function () {
            if (this.autoplay === true) {
                this.play();
            }
        },
        
        addPlayButtonClass: function (className) {
            this.playButton.addClass(className);
        },
        
        removePlayButtonClass: function (className) {
            this.playButton.removeClass(className);
        },
        
        play: function () {
            this.dancer.play();
            this.removePlayButtonClass('animasong-icon-play');
            this.addPlayButtonClass('animasong-icon-pause');
        },
        
        pause: function () {
            this.dancer.pause();
            this.removePlayButtonClass('animasong-icon-pause');
            this.addPlayButtonClass('animasong-icon-play');
        }
    };
    
    window.Animasong = Animasong;
})();