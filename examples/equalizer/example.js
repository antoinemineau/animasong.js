jQuery(document).ready(function($) {
    var animasong = new Animasong({
        'song': {
            'provider' : 'soundcloud',
            'location' : 'https://soundcloud.com/chriszzs/super-mario-theme',
        },
        'container': '#player',
        'animation': 'equalizer',
    });
    animasong.start();
});