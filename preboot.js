function playKeySound() {
    document.getElementById('keySound' + (Math.floor(Math.random() * 5) + 1)).play();
}
function escapeHtml(unsafe) {
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function term() {
    return $('#terminal');
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showKeyboard() {
    if (!window.mobileDetected) return;
    document.getElementById("dummyText").focus();
}

var commands = {
    "whoami": function(args) {
        /* xor encoding for some address */
        var fussy_obfus = "\x23\x5d\x51\x0b\x0d\x48\x46\x0c\x51\x42\x09\x00\x03\x56\x0d\x40\x0c\x13\x0f\x5c\x44\x0d\x5b\x1a\x07\x42\x42\x0b\x12\x1d\x08\x70\x00\x1a\x02\x11\x48\x40\x47\x40\x5f\x1a\x07\x42\x42\x0b\x12\x1d\x08\x70\x00\x1a\x02\x11\x48\x40\x47\x5e\x4e\x13\x58";
        var key = "f00bar";
        var decrypted = "";
        for (var i = 0; i < fussy_obfus.length; i++) {
            var o = fussy_obfus.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            decrypted += String.fromCharCode(o);
        }
        term().
        typist('print', 'Hello! You have reached hatf0\'s about page.').
        typist('wait', 100).
        typist('print', 'I am proficient in C++ / JavaScript / DLang / x86 assembly, and have years of experience under my belt.').
        typist('wait', 100).
        typist('print', 'This website does not contain a full listing of everything I have done - please contact me for examples.').
        typist('wait', 100).
        typist('print', 'My contact info is as follows:').
        typist('wait', 100).
        typist('print', 'GitHub: <a href="https://github.com/hatf0">@hatf0</a>').
        typist('wait', 100).
        typist('print', 'Telegram: <a href="https://t.me/hatf0">@hatf0</a>').
        typist('wait', 100).
        typist('print', 'Discord: hatf0#4141').
        typist('wait', 100).
        typist('print', 'LinkedIn: <a href="https://www.linkedin.com/in/hatf0/">Harrison Ford</a>').
        typist('wait', 100).
        typist('print', decrypted).
        typist('wait', 100).
        typist('print', 'PGP: <a href="public.asc">public.asc</a>').
        typist('wait', 100).
        typist('print', 'Website:.... you\'re on it.').
        typist('wait', 100).
        typist('print', 'Thanks! :)');
    },
    "boot": function(args) {
        if (window.mobileDetected) {
            term().
            typist('print', 'You are on mobile. Please return to a computer and try again :(').
            typist('wait', 500);
            return;   
        }
        
        document.getElementById('bootSound').play();
        window.enableTyping = false;
        term().
        typist('print', 'Goodbye! Booting up Linux....').
        typist('wait', 3000).
        typist('clear').
        typist('after', function() {
            window.prebootDone = true;
            $(".container").hide();
            $('#screen_container').show();
            setTimeout(() => runEmulator(), 1000);
        });
    },
    "blog": function(args) {
        term().
        typist('print', 'Redirecting you to my blog. Goodbye!').
        typist('wait', 1000).
        typist('clear').
        typist('after', function() {
            window.location.href = "blog";
        });
    },
    "help": function(args) {
        for (var prop in commands) {
            $('#terminal').typist('print', prop.toLowerCase());
        }
    },
    "clear": function(args) {
        $('#terminal').empty();
    },
};

$(document).ready(function() {
    var windowSize = $(window).height() - 200;
    $(window).resize(function() {
        if (window.prebootDone) return;
        windowSize = $(window).height() - 200;
        var height = 0;
        $('#terminal').children().each(function() {
            height += $(this).height();
        });
        $('#terminal').css('height', windowSize + 'px');
        $('#terminal').scrollTop(height);
    });
    $.fn.ignore = function(sel) {
        return this.clone().find(sel || ">*").remove().end();
    };

    $('#terminal').typist({
        height: windowSize,
        backgroundColor: '#000',
        textColor: '#ffffff'
    });

    function typebios() {
        term().typist('speed', 'fast').
      typist('wait', 1000).
      typist('clear').
      typist("print", '╔═══════════════════════════════════════════════════════════════════════════╗').
      typist("print", '║   AMIBIOS System Configuration (C) 1985-2018, American Megatrends Inc.,   ║').
      typist("print", '╠══════════════════════════════════════╤════════════════════════════════════╣').
      typist("print", '║ Main Processor   : Some Stupid CPU   │ Base Memory Size : 640KB           ║').
      typist("print", '║ Math Processor   : Built-In          │ Ext. Memory Size : 64512KB         ║').
      typist("print", '║ Floppy Drive A:  : 1.44 MB 3½        │ Display Type     : VGA/EGA         ║').
      typist("print", '║ Floppy Drive B:  : None              │ Serial Port(s)   : 3F8, 3E8        ║').
      typist("print", '║ AMIBIOS Date     : 04/06/18          │ Parallel Port(s) : 378             ║').
      typist("print", '║ Processor Clock  : 233MHz            │ External Cache   : 256KB, Enabled  ║').
      typist("print", '╟──────────────────────────────────────┴────────────────────────────────────╢').
      typist("print", '║ Hard Disk(s)       Cyl   Head Sector Size      LBA    32Bit  Block   PIO  ║').
      typist("print", '║                                                Mode   Mode   Mode    Mode ║').
      typist("print", '║ Primary Master   : 16383 16   63     8064MB    LBA    On     16Sec   4    ║').
      typist("print", '║ Primary Slave    : CDROM                                             4    ║').
      typist("print", '╠═══════════════════════════════════════════════════════════════════════════╣').
      typist("print", '║ PCI Devices:                                                              ║').
      typist("print", '║ PCI Onboard Bridge Device             PCI Onboard USB Controller          ║').
      typist("print", '║ PCI Onboard IDE                       PCI Onboard VGA                     ║').
      typist("print", '║ PCI Onboard CardBus Bridge            PCI Onboard CardBus Bridge          ║').
      typist("print", '╚═══════════════════════════════════════════════════════════════════════════╝').
      typist("print", ' ').
      typist('wait', 3500).
      typist("print", 'Starting pre-boot environment...').
      typist('wait', 500).
      typist('after', typegrub);
    }

    function typegrub() {
      term().
      typist('clear').
      typist('wait', 100).
      typist('speed', 'superfast').
      typist('print', '                        . - ~ ~ ~ - .\n').
      typist('print', '      ..     _      .-~               ~-.\n').
      typist('print','     //|     \\ `..~                      `.\n').
      typist('print','    || |      }  }              /       \\  \\\n').
      typist('print','(\\   \\ \\~^..\'                 |         }   \\\n').
      typist('print',' \\`.-~  o      /       }       |        /    \\\n').
      typist('print',' (__          |       /        |       /      `.\n').
      typist('print','  `- - ~ ~ -._|      /_ - ~ ~ ^|      /- _      `.\n').
      typist('print','              |     /          |     /     ~-.     ~- _\n').
      typist('print','              |_____|          |_____|         ~ - . _ _~_-_\n').
      typist('print','\n').
      typist('speed', 'fast').
      typist('print', 'Last login: Mon Feb  1 16:49:57 on ttys007').
      typist("print", 'Welcome to the pre-execution environment on 0xcc.pw. Type \'help\' for a listing of commands.').
      typist("print", 'By typing \'boot\', you will launch a buildroot Linux VM. Please note: it is somewhat resource intensive. ').
      typist('prompt', function() {
          window.enableTyping = true;
      });
    }

    window.mobileDetected = false;
    var p = navigator.platform;
    if( p === 'iPad' || p === 'iPhone' || p === 'iPod' || p === 'Linux armv7l' || p === 'Linux aarch64' || p === 'Linux armv6l') {
       window.mobileDetected = true;
       $("#keyboardFocus").show();
    }

    window.prebootDone = false;
    window.enableTyping = false;
    window.hostname = "(pxe) ";
    window.termCache = ""; //what's currently in the buffer
    window.termLast = ""; //the last command that was executed

    $(document).keypress(function(event) {
        if (!window.enableTyping) {
            return;
        }
        event.preventDefault();
        if (event.which == 13) {
            var cache = escapeHtml(window.termCache);
            var arr = cache.split(" ");
            var cmd = arr.splice(0, 1).join("");
            if (commands[cmd] !== undefined) {
                commands[cmd](arr);
            } else if (cmd !== "") {
                $('#terminal').typist('print', 'command not found: ' + cmd);
            }
            window.termLast = window.termCache;
            window.termCache = "";
            $('#terminal').typist('type', '\n');
            $('#terminal').typist('prompt');
            playKeySound();
        } else if (event.which !== 9) {
            var str = String.fromCharCode(event.which);
            window.termCache += str;
            $('#terminal').typist('type', str);
            playKeySound();
        }
    });

    $(document).keydown(function(event) {
        if (!window.enableTyping) {
            return;
        }
        if (event.which == 8) { //Backspace
            if (window.termCache.length > 0) {
                window.termCache = window.termCache.substring(0, window.termCache.length - 1);
                var prompt = $('.prompt').last();
                var text = prompt.ignore("span").html();
                text = text.substring(0, text.length - 1);
                $('.cursor').remove();
                prompt.html(text + '<span class="cursor">&#9608;</span>');
                playKeySound();
            }
            event.preventDefault();
            //Tab
        } else if (event.which == 9) {
            var cache = window.termCache;
            if (cache.length > 0) {
                if (cache.split(' ').length == 1) {
                    for (var prop in commands) {
                        if (prop.substring(0, cache.length).toLowerCase() == cache.toLowerCase()) {
                            window.termCache = prop;
                            var prompt = $('.prompt').last();
                            $('.cursor').remove();
                            prompt.html(window.hostname + '$ ' + prop + '<span class="cursor">&#9608;</span>');
                            playKeySound();
                            break;
                        }
                    }
                } /* else if (cache.split(' ').length > 1) {
                    var arr = cache.split(' ');
                    var tryDir = arr[arr.length - 1];
                    var before = arr.splice(0, arr.length - 1).join("");
                    var dirs = directoryTree[window.CurrentLocation];
                    for (var i = 0; i < dirs.length; i++) {
                        var dir = dirs[i];
                        if (dir[0].substring(0, tryDir.length).toLowerCase() == tryDir.toLowerCase()) {
                            var pk = before + ' ' + dir[0];
                            window.termCache = pk;
                            var prompt = $('.prompt').last();
                            $('.cursor').remove();
                            prompt.html(window.hostname + '$ ' + pk + '<span class="cursor">&#9608;</span>');
                            playKeySound();
                            break;
                        }
                    }
                }*/
            }
            event.preventDefault();
        } else if (event.which == 38) {
            if (window.termLast !== "") {
                window.termCache = window.termLast;
                var prompt = $('.prompt').last();
                $('.cursor').remove();
                prompt.html(window.hostname + '$ ' + window.termLast + '<span class="cursor">&#9608;</span>');
                playKeySound();
            }
            event.preventDefault();
        }
    });

    setTimeout(function() {
        typebios();
    }, 100);
});