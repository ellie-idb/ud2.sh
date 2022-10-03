import '../shared/typist.ts';
import {runEmulator, listEmulators, isValidEmulator} from './emulator.js';

const obfus = "\x23\x5d\x51\x0b\x0d\x48\x46\x0c\x51\x42\x09\x00\x03\x56\x0d\x40\x0c\x13\x0f\x5c\x44\x0d\x5b\x1a\x07\x42\x42\x0b\x12\x1d\x08\x70\x00\x1a\x02\x11\x48\x40\x47\x40\x5f\x1a\x07\x42\x42\x0b\x12\x1d\x08\x70\x00\x1a\x02\x11\x48\x40\x47\x5e\x4e\x13\x58";
const key = "f00bar";

var commands = {
    "whoami": function(args) {
        window.typist.
            print('website-user');
    },
    "about": () => {
        window.typist
              .print("Welcome to my personal website! My name is Harrison Ford (@hatf0).")
              .print("I'm a 19 year old software engineer, and I'm currently in college pursuing a degree in computer science.")
              .print("You can find my contact information by running the 'contact' command.")
    },
    "contact": function(args) {
        /* xor encoding for some address */
        var decrypted = "";
        for (var i = 0; i < obfus.length; i++) {
            var o = obfus.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            decrypted += String.fromCharCode(o);
        }
        window.typist.
            print('GitHub: <a href="https://github.com/hatf0">@hatf0</a>').
            sleep(100).
            print('Telegram: <a href="https://t.me/hatf0">@hatf0</a>').
            sleep(100).
            print('Discord: hatf0#4141').
            sleep(100).
            print('LinkedIn: <a href="https://www.linkedin.com/in/hatf0/">Harrison Ford</a>').
            sleep(100).
            print(decrypted);
    },
    "boot": function(args) {
        if (window.mobileDetected) {
            window.typist.
                print('You are on mobile. Please return to a computer and try again :(').
                sleep(500);
            return;   
        }

        if (args.length != 1 || !isValidEmulator(args[0])) {
            window.typist
                   .print('Please specify a valid emulator to boot. Valid emulators are: ' + listEmulators())
                   .sleep(100);
            return;
        }

        if (args[0] === "doom") {
            window.typist
                  .print("Note: after the VM has finished booting, type in 'startx' to start Doom.");
        }
        
        window.enableTyping = false;
        window.typist.
            print('Loading emulator....').
            sleep(1500).
            after(function() {
                runEmulator(args[0]);
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
