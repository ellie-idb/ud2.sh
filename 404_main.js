function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

$(document).ready(function() {
    var windowSize = $(window).height() - 30;
    $(window).resize(function() {
        windowSize = $(window).height() - 30;
        var height = 0;
        $('#terminal').children().each(function() {
            height += $(this).height();
        });
        $('#terminal').css('height', windowSize + 'px');
        $('#terminal').scrollTop(height);
        console.log(height);
    });
    $.fn.ignore = function(sel) {
        return this.clone().find(sel || ">*").remove().end();
    }
    ;
    
    $('#terminal').typist({
        height: windowSize,
        backgroundColor: '#000',
        textColor: '#ffffff'
    });

    window.hostname = "0xcc-nginx-cluster";
    
    function term() {
        return $('#terminal');
    }
    
    function type404() {
        term().typist('prompt').
        typist('speed', 'fast').
        typist('type', 'firstboot.sh\n').
        typist('speed', 'superfast').
        typist('type', '    ____              __  _                ____                                \n').
        typist('type', '   / __ )____  ____  / /_(_)___  ____ _   / __ \\_  ____________  ____ _      __\n').
        typist('type', '  / __  / __ \\/ __ \\/ __/ / __ \\/ __ `/  / / / / |/_/ ___/ ___/ / __ \\ | /| / /\n').
        typist('type', ' / /_/ / /_/ / /_/ / /_/ / / / / /_/ /  / /_/ />  </ /__/ /___ / /_/ / |/ |/ / \n').
        typist('type', '/_____/\\____/\\____/\\__/_/_/ /_/\\__, /   \\____/_/|_|\\___/\\___(_) .___/|__/|__/  \n').
        typist('type', '                              /____/                         /_/               \n').
        typist('speed', 'fast').
        typist('prompt').
        typist('type', 'get_page.sh\n').
        typist('wait', '400').
        typist('type', 'Initializing HTTP subsystem.... ').
        typist('wait', '600').
        typist('type', '[ok]\n').
        typist('wait', '600').
        typist('type', 'Attempting to serve page.... ').
        typist('wait', '600').
        typist('type', '[failed]\n').
        typist('wait', '100').
        typist('type', 'FATAL ERROR: 404, page not found').
        typist('prompt');
    }
    
    setTimeout(function() {
        type404();
    }, 200);
});
        
