import '../shared/typist.ts';
import './boot.js';

const obfus = "\x23\x5d\x51\x0b\x0d\x48\x46\x0c\x51\x42\x09\x00\x03\x56\x0d\x40\x0c\x13\x0f\x5c\x44\x0d\x5b\x1a\x07\x42\x42\x0b\x12\x1d\x08\x70\x00\x1a\x02\x11\x48\x40\x47\x40\x5f\x1a\x07\x42\x42\x0b\x12\x1d\x08\x70\x00\x1a\x02\x11\x48\x40\x47\x5e\x4e\x13\x58";
const key = "f00bar";

var commands = {
    "whoami": function(args) {
        /* xor encoding for some address */
        var decrypted = "";
        for (var i = 0; i < obfus.length; i++) {
            var o = obfus.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            decrypted += String.fromCharCode(o);
        }
        
        window.typist.
            print('Hello! You have reached hatf0\'s about page.').
            sleep(100).
            print('I am proficient in C++ / JavaScript / DLang / x86 assembly, and have years of experience under my belt.').
            sleep(100).
            print('This website does not contain a full listing of everything I have done - please contact me for examples.').
            sleep(100).
            print('My contact info is as follows:').
            sleep(100).
            print('GitHub: <a href="https://github.com/hatf0">@hatf0</a>').
            sleep(100).
            print('Telegram: <a href="https://t.me/hatf0">@hatf0</a>').
            sleep(100).
            print('Discord: hatf0#4141').
            sleep(100).
            print('LinkedIn: <a href="https://www.linkedin.com/in/hatf0/">Harrison Ford</a>').
            sleep(100).
            print(decrypted).
            sleep(100).
            print('PGP: <a href="public.asc">public.asc</a>').
            sleep(100).
            print('Website:.... you\'re on it.').
            sleep(100).
            print('Thanks! :)');
    },
    "boot": function(args) {
        if (window.mobileDetected) {
            window.typist.
                print('You are on mobile. Please return to a computer and try again :(').
                sleep(500);
            return;   
        }
        
        document.getElementById('bootSound').play();
        window.enableTyping = false;
        window.typist.
            print('Goodbye! Booting up Linux....').
            sleep(3000).
            clear().
            after(function() {
                window.prebootDone = true;
                $(".container").hide();
                $('#screen_container').show();
                setTimeout(() => runEmulator(), 1000);
            });
    },
    "blog": function(args) {
        window.typist.
            print('Redirecting you to my blog. Goodbye!').
            sleep(1000).
            clear().
            after(function() {
                window.location.href = "blog";
            });
    },
    "help": function(args) {
        for (var prop in commands) {
            window.typist.print(prop.toLowerCase());
        }
    },
    "clear": function(args) {
        window.typist.clear();
    },
};

export {commands};