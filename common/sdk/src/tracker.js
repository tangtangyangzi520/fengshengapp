(function(fs) {
    var root = window;

    window.FS = fs;

})(typeof FS != 'undefined' ? FS : {});