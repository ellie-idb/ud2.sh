import { Typist, TypistOptions, TypistSpeed } from '../shared/typist.ts';
import { escapeHtml } from '../shared/utils.ts';
import '../shared/main.css';
import {commands} from './commands.js';

function playKeySound() {
    document.getElementById('keySound' + (Math.floor(Math.random() * 5) + 1)).play();
}

$(function() {
    window.showKeyboard = function() {
	if (!window.mobileDetected) return;
	document.getElementById("dummyText").focus();
    };
    var windowSize = $(window).height() - 200;
    $(window).on('resize', function() {
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

    let opts = new TypistOptions("(pxe) ", "#000", "#ffffff", undefined, windowSize, 80);
    window.typist = new Typist($('#terminal'), opts);

    function typebios() {
        window.typist.
            speed(TypistSpeed.FAST).
                sleep(1000).
                clear().
                print('╔═══════════════════════════════════════════════════════════════════════════╗').
                print('║   AMIBIOS System Configuration (C) 1985-2018, American Megatrends Inc.,   ║').
                print('╠══════════════════════════════════════╤════════════════════════════════════╣').
                print('║ Main Processor   : Some Stupid CPU   │ Base Memory Size : 640KB           ║').
                print('║ Math Processor   : Built-In          │ Ext. Memory Size : 64512KB         ║').
                print('║ Floppy Drive A:  : 1.44 MB 3½        │ Display Type     : VGA/EGA         ║').
                print('║ Floppy Drive B:  : None              │ Serial Port(s)   : 3F8, 3E8        ║').
                print('║ AMIBIOS Date     : 04/06/18          │ Parallel Port(s) : 378             ║').
                print('║ Processor Clock  : 233MHz            │ External Cache   : 256KB, Enabled  ║').
                print('╟──────────────────────────────────────┴────────────────────────────────────╢').
                print('║ Hard Disk(s)       Cyl   Head Sector Size      LBA    32Bit  Block   PIO  ║').
                print('║                                                Mode   Mode   Mode    Mode ║').
                print('║ Primary Master   : 16383 16   63     8064MB    LBA    On     16Sec   4    ║').
                print('║ Primary Slave    : CDROM                                             4    ║').
                print('╠═══════════════════════════════════════════════════════════════════════════╣').
                print('║ PCI Devices:                                                              ║').
                print('║ PCI Onboard Bridge Device             PCI Onboard USB Controller          ║').
                print('║ PCI Onboard IDE                       PCI Onboard VGA                     ║').
                print('║ PCI Onboard CardBus Bridge            PCI Onboard CardBus Bridge          ║').
                print('╚═══════════════════════════════════════════════════════════════════════════╝').
                print(' ').
                sleep(3500).
                print('Starting pre-boot environment...').
                sleep(500).
            after(typegrub);
    }

    function typegrub() {
      window.typist.
        clear().
        sleep(100).
        speed(TypistSpeed.SUPERFAST).
            print( '                        . - ~ ~ ~ - .\n').
            print( '      ..     _      .-~               ~-.\n').
            print('     //|     \\ `..~                      `.\n').
            print('    || |      }  }              /       \\  \\\n').
            print('(\\   \\ \\~^..\'                 |         }   \\\n').
            print(' \\`.-~  o      /       }       |        /    \\\n').
            print(' (__          |       /        |       /      `.\n').
            print('  `- - ~ ~ -._|      /_ - ~ ~ ^|      /- _      `.\n').
            print('              |     /          |     /     ~-.     ~- _\n').
            print('              |_____|          |_____|         ~ - . _ _~_-_\n').
            print('\n').
        speed(TypistSpeed.FAST).
            print('Last login: Mon Feb  1 16:49:57 on ttys007').
            print('Welcome to the pre-execution environment on 0xcc.pw. Type \'help\' for a listing of commands.').
            print('By typing \'boot\', you will launch a buildroot Linux VM. Please note: it is somewhat resource intensive. ').
        prompt(function() {
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
                window.typist.print('command not found: ' + cmd);
            }
            window.termLast = window.termCache;
            window.termCache = "";
            window.typist.type('\n');
            if (window.enableTyping) {
                window.typist.prompt();
            }
            playKeySound();
        } else if (event.which !== 9) {
            var str = String.fromCharCode(event.which);
            window.termCache += str;
            window.typist.type(str);
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
                prompt.html(text);
                prompt.append(window.typist.addCursor());
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
                            prompt.html(window.hostname + '$ ' + prop);
                            prompt.append(window.typist.addCursor());
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
                prompt.html(window.hostname + '$ ' + window.termLast);
                prompt.append(window.typist.addCursor());
                playKeySound();
            }
            event.preventDefault();
        }
    });

    setTimeout(function() {
        typebios();
    }, 100);
});
