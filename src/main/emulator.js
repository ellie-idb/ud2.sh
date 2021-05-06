var common_config = {
    wasm_path: "/vm/v86.wasm",
    network_relay_url: "wss://relay.widgetry.org",
    fastboot: true,
    bios: {
        url: "/vm/seabios.bin",
        async: false,
    },
    vga_bios: {
        url: "/vm/vgabios.bin",
        async: false,
    },
};

var emulators = {
    doom: {
        ...common_config,
        memory_size: 256 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        cdrom: {
            url: "/vm/doom-linux.iso",
            async: false,
        },
    },
    linux: {
        ...common_config,
        memory_size: 128 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        cdrom: {
            url: "/vm/buildroot-linux.iso",
            async: false,
        }
    }
}

function listEmulators() {
    return Object.keys(emulators).join(", ");
}

function isValidEmulator(emulator) {
    return emulators.hasOwnProperty(emulator);
}

function killEmulator() {
    if (emulator === undefined) return;
    if (!emulator.is_running()) return;
    if (window.is_halted) return;

    window.is_halted = true;
    emulator.stop();
    $(".container").show();
    $("#screen_container").hide();
    $("#halt-vm").hide();
    window.typist.
        sleep(1000).
        after(function() { 
            window.prebootDone = false;
            window.enableTyping = true;
            emulator.destroy();
        }).
        print("Welcome back to the pre-boot environment.").
        prompt();
}

function createEmulator(emulator_config) {
    console.log(emulator_config);
    emulator_config.screen_container = document.getElementById("screen_container");

    var emulator = window.emulator = new V86Starter(emulator_config);
    var current_file;
    var progress_bar;
    var ticks = 0;

    $("#screen_container").on('click', function(e) {
        if (window.vm_uses_mouse === true) {
            emulator.lock_mouse();
        }
    });

    $("#halt-vm").on('click', function(e) {
        killEmulator();
    });

    emulator.add_listener("mouse-enable", function(e) {
        window.vm_uses_mouse = e;
    });

    emulator.add_listener("download-progress", function(e) {
        if (e.file_name.endsWith(".wasm")) {
            if (current_file === e.file_name) return;
            current_file = e.file_name;
            const parts = e.file_name.split("/");
            window.typist.print("Fetching " + parts[parts.length - 1] + " ...");
            return;
        }

        var line = 'Fetching ' + e.file_name + " ";
        if (e.file_name !== current_file) {
            current_file = e.file_name;
            progress_bar = undefined;
            ticks = 0;
        }
        
        if (e.total && typeof e.loaded === "number")
        {
            var per100 = Math.floor(e.loaded / e.total * 100);
            per100 = Math.min(100, Math.max(0, per100));

            var per50 = Math.floor(per100 / 2);

            line += per100 + "% [";
            line += "#".repeat(per50);
            line += " ".repeat(50 - per50) + "]";
        }
        else
        {
            line += ".".repeat(ticks++ % 50);
        }

        if (progress_bar === undefined) {
            progress_bar = window.typist.addLine();
        }
        progress_bar.text(line);
    });

    emulator.add_listener("download-error", function(e) {
        window.typist.
            print('An error has occured while loading ' + e.file_name).
            print('Cannot continue booting...').
            after(function() {
                window.prebootDone = false;
                window.enableTyping = true;
                emulator.destroy();
            }).
            prompt();
    });

    emulator.add_listener("emulator-ready", function() {
        window.typist.
            print('Goodbye!').
            sleep(1000).
            clear().
            after(function() {
                window.is_halted = false;
                window.prebootDone = true;
                $(".container").hide();
                $("#halt-vm").show();
                $("#screen_container").show();
                emulator.run();
            });
    });

    emulator.add_listener("cpu-event-halt", function() {
        killEmulator();
    });
}

function runEmulator(emulator_name) {
    // Licenses are available at vm/licenses.tar.gz
    // Dynamically load libv86 - it's *very* heavy (380+ kb)
    if (!isValidEmulator(emulator_name)) return false;

    var v86 = document.createElement('script');
    v86.onload = function() {
        createEmulator(emulators[emulator_name]);
    };

    v86.src = "/vm/libv86.js";
    document.head.appendChild(v86);
    return true;
}

export {runEmulator, isValidEmulator, listEmulators};
