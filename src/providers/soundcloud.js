(function ()  {

    var provider = function (animasong) {
        this.animasong = animasong;
        this.song = animasong.parameters.song;
        this.resolveUrl = 'http://api.soundcloud.com/resolve.json?url=';
        this.trackUrl = 'http://api.soundcloud.com/tracks/';
        this.clientId = '2fcf45a9aeb23590ee60222b2e5eb44b'
    };
    
    provider.prototype = {
        load: function () {
            Animasong.showDebug('Soundcloud provider load');
            this.getStream();
        },
        
        getStream: function() {
            var xhr = $.get(this.resolveUrl + this.song.location + '&client_id=' + this.clientId);

            xhr.fail(function() {
                console.log('b');
                Animasong.showError('Could not get the infos required to load the song.');
            });
            
            var _this = this;
            xhr.done(function(song) {
                Animasong.showDebug('Soundcloud provider - found Sound id');
                _this.animasong.song.title = song.title;
                _this.animasong.song.duration = song.duration;
                _this.animasong.song.stream = song.stream_url + '?client_id=' + _this.clientId;
                Animasong.showDebug(_this.animasong.song);
                _this.animasong.setAnimation(true);
                _this.animasong.setAnimasongBar();
            });
        }
    };
    
    Animasong.providers.soundcloud = provider;
}) ();