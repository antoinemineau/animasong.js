(function() {
  Dancer.addPlugin( 'fft', function( canvasEl, options ) {
    options = options || {};
    var
      ctx     = canvasEl.getContext( '2d' ),
      h       = canvasEl.height,
      w       = canvasEl.width,
      width   = options.width || 1,
      spacing = options.spacing || 0,
      count   = options.count || 512;

    ctx.fillStyle = options.fillStyle || "white";
    ctx.strokeStyle = options.strokeStyle || "black";
    ctx.lineWidth = options.lineWidth || 1;
    
    this.bind( 'update', function() {
      var spectrum = this.getSpectrum();
      ctx.clearRect( 0, 0, w, h );
      for ( var i = 0, l = spectrum.length; i < l && i < count; i++ ) {
        ctx.fillRect( i * ( spacing + width ), h, width, -spectrum[ i ] * h );
        ctx.strokeRect( i * ( spacing + width ), h, width, -spectrum[ i ] * h );
      }
    });

    return this;
  });
})();
