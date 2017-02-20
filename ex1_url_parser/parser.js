var form = document.getElementById('url-form');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    var uri = document.getElementById('uri-box').value;
    var uriParts = parseUri(uri);
    render(uriParts);
});

function render(uriParts) {
    document.getElementById('parts').className = '';
    for (var key in uriParts) {
        document.getElementById(key + '-value').innerHTML = uriParts[key];
    }
}

function parseUri(uri) {
    

    var integer = 0;
    var scheme = "no scheme found";
    var authority = "no authority found";
    var path = "no path found";
    var query = "no query found";
    var fragment = "no fragment found";

    for (var i = integer; i < uri.length ; i++) {
        if(uri.charAt(i) == ':'){
            if(uri.charAt(i+1) == '/'){
                if(uri.charAt(i+2) == '/'){
                    scheme = uri.substring(integer, i);
                    integer = i+3;
                    i = uri.length;
                }
            }else{
                scheme = uri.substring(integer, i);
                integer = i+2;
                i = uri.length;
            }
        }else if(uri.charAt(i) == '/'){
            if(i == uri.length-1){
                authority = uri.substring(integer, uri.length-1);
            }
        }else if(i == uri.length-1){
            authority = uri;
        }
    }
    if(authority == "no authority found"){
        for (var i = integer; i < uri.length ; i++) {
            if(uri.charAt(i) == '/'){
                authority = uri.substring(integer, i);
                integer = i;
                i = uri.length;
            }else if(uri.charAt(i) == '?'){
                authority = uri.substring(integer, i);
                integer = i;
                i = uri.length;
            }
        }
    }
    //path na diri
    for (var i = integer+1; i < uri.length ; i++) {
        if(uri.charAt(i) == '?'){
            path = uri.substring(integer, i);
            if(path == "/")
                path = "no path found";
            integer = i;
            i = uri.length;
        }else if(uri.charAt(i) == '/'){
            if(i == uri.length-1){
                path = uri.substring(integer, i);
                integer = i;
                i = uri.length;
            }
        }else if(uri.charAt(i) == '?'){
            if(i == uri.length-1){
                query = uri.substring(integer, i);
                integer = i;
                i = uri.length;
            }
        }else if(uri.charAt(i) == '#'){
            if(i == uri.length-1){
                fragment = uri.substring(integer, i);
                integer = i;
                i = uri.length;
            }
        }
    }
    var found = false;
    for (var i = integer; i < uri.length ; i++) {
        if(uri.charAt(i) == '?'){
            found = true;
        }
        if(uri.charAt(i) == '#'){
            if(found){
                if(i == uri.length-1){
                    query = uri.substring(integer+1, i+1);   
                }else query = uri.substring(integer+1, i);   
            }else path = uri.substring(integer, i+1);
            fragment = uri.substring(i+1, uri.length);
            integer = i;
            i = uri.length;
        }else if(i == uri.length-1){
            if(found){
                if(i == uri.length-1){
                    query = uri.substring(integer+1, i+1);   
                }else query = uri.substring(integer+1, i);   
            }else path = uri.substring(integer, i+1);
            integer = i;
            i = uri.length;
        }
    }


    var uriParts = {
        scheme: scheme,
        authority: authority,
        path: path,
        query: query,
        fragment: fragment
    };


    return uriParts;
}