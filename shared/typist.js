(function($) {
    var MAX_SCROLL = 9e99;
    var defaults = {
        backgroundColor: '#333',
        textColor: '#ffffff',
        fontFamily: 'monospace',
        height: 9e99
    };
    var $el, typeDelay = 80;
    var blinkTimer;
    var startBlink = function(next) {
        blinkTimer = setInterval(function() {
            $('.cursor').toggle();
        }, 500);
        next && next();
    };
    var stopBlink = function(next) {
        clearInterval(blinkTimer);
        next && next();
    };
    var addLine = function() {
        $('.cursor').remove();
        var p = $('<p></p>');
        $el.append(p);
        //$(window).trigger('resize');
        return p;
    };
    var methods = {
        init: function(config) {
            config = $.extend(defaults, config);
            $el = this;
            var oldStyle = $el.attr('style') + ';' || '';
            var style = 'background-color: ' + config.backgroundColor;
            style += '; color: ' + config.textColor;
            style += '; font-family: ' + config.fontFamily;
            $el.addClass('typist-container').attr('style', oldStyle + style).height(config.height);
            startBlink();
            return $el;
        },
        after: function(toCall) {
            return $el.queue(function(next) {
                if (toCall !== undefined) {
                    toCall();
                }
                next();
            });
        },
        prompt: function(toCall) {
            return $el.queue(function(next) {
                if (toCall !== undefined) {
                    toCall();
                }
                $('.cursor').remove();
                addLine().addClass('prompt').append(window.hostname + '$ <span class="cursor">&#9608;</span>');
                $(window).trigger('resize');
                next();
            });
        },
        clear: function() {
            return $el.queue(function(next) {
                $el.empty();
                next();
            });
        },
        type: function(text) {
            $el.queue(stopBlink);
            var typeChar = function(index) {
                $el.queue(function(next) {
                    $('.cursor').before(text[index]);
                    next();
                }).delay(typeDelay);
            };
            for (var i = 0; i < text.length; i++) {
                typeChar(i);
            }
            return $el.queue(startBlink);
        },
        echo: function(text) {
            var $p;
            var typeChar = function(index) {
                $el.queue(function(next) {
                    if (index === 0) {
                        $p = addLine();
                    }
                    $p.append(text[index]);
                    next();
                }).delay(typeDelay);
            };
            for (var i = 0; i < text.length; i++) {
                typeChar(i);
            }
            return $el;
        },
        wait: function(millis) {
            return $el.delay(millis);
        },
        speed: function(speed) {
            if (speed === 'superfast') {
                typeDelay = 1;
            }
            else if (speed === 'veryfast') {
                typeDelay = 10;
            }
            else if (speed === 'fast') {
                typeDelay = 20;
            } else if (speed === 'slow') {
                typeDelay = 120;
            } else if (speed === 'medium') {
                typeDelay = 60;
            }
            return $el;
        },
        print: function(text) {
            var $p;
            $el.queue(function(next) {
                $p = addLine();
                $p.append(text);
                $(window).trigger('resize');
                next();
            });
            $el.delay(typeDelay);
            return $el;
        },
        println: function(text) {
            var $p;
            $el.queue(function(next) {
                $p = addLine(0);
                $p.append(text);
                $(window).trigger('resize');
                next();
            });
            return $el;
        }
    };
    $.fn.typist = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on typist');
        }
    };
})(jQuery);
