var opensubtitles = require('opensubtitles-client');
module.exports = function (file, lang) {	
var filename = file.name.split('/').pop().replace(/\{|\}/g, '');

opensubtitles.api.login()
    .done(
        function(token){
            opensubtitles.api.searchForTitle(token, lang, filename.replace(/\.[^/.]+$/, "")).done( 
                function(results){
                    opensubtitles.downloader.download(results, 1, file.name, function(){});


                    opensubtitles.api.logout(token);
                }
            );
        }
    );

}