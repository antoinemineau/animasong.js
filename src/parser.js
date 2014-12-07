(function (Animasong) {
    var animations = ['spectrum', 'equalizer'];
    var providers = ['soundcloud', 'localhost'];
    
    Animasong.hasValidParameters = function(instance) {
        Animasong.showDebug(instance.parameters);
        if (instance.parameters.song.location === undefined ||
            instance.parameters.song.provider === undefined ||
            instance.parameters.animation === undefined || 
            instance.parameters.container === undefined) {
            Animasong.showError('A mandatory parameter is missing.');
            return false;
        }
        
        if (animations.indexOf(instance.parameters.animation) === -1) {
            Animasong.showError('The selected animation is unavailable.');
            return false;
        }
        
        if (providers.indexOf(instance.parameters.song.provider) === -1) {
            Animasong.showError('The selected provider is unavailable.');
            return false;
        }
        
        if ($(instance.parameters.container).length != 1) {
            Animasong.showError('The selected container is not defined or not unique.');
            return false;
        }
        instance.container.width = $(instance.parameters.container).width();
        instance.container.height = $(instance.parameters.container).height();
        
        return true;
    };
    
    Animasong.getProvider = function (instance) {
        switch (instance.parameters.song.provider) {
          case 'soundcloud':
            return new Animasong.providers.soundcloud(instance);
          case 'localhost':
            return new Animasong.providers.localhost(instance);
          default:
            Animasong.showError('The selected provider is unavailable.');
            return null;
        }
    };
})(window.Animasong);