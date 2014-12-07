(function (Animasong) {
    var DEV = false;
    
    Animasong.showDebug = function(msg) {
        if (DEV && console && console.log) {
            console.log(msg);
        }
    };
        
    Animasong.showError = function(msg) {
        if (console && console.log) {
            console.log(msg);
        }
    };
})(window.Animasong);