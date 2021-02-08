function createEmulator() {
    var emulator = window.emulator = new V86Starter({
        wasm_path: "/vm/v86.wasm",
        memory_size: 128 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        network_relay_url: "wss://relay.widgetry.org",
        screen_container: document.getElementById("screen_container"),
        fastboot: true,
        bios: {
            url: "/vm/seabios.bin",
            async: false,
        },
        vga_bios: {
            url: "/vm/vgabios.bin",
            async: false,
        },
        cdrom: {
            url: "/vm/v86-linux.iso",
            async: false,
        },
    });

    var current_file;
    var progress_bar;
    var ticks = 0;

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
            print('Cannot continue booting...');
    });

    emulator.add_listener("emulator-ready", function() {
        window.typist.
            print('Goodbye!').
            sleep(1000).
            clear().
            after(function() {
                window.prebootDone = true;
                $(".container").hide();
                $("#screen_container").show();
                emulator.run();
            });
    });

    emulator.add_listener("cpu-event-halt", function() {
        emulator.stop();
        $(".container").show();
        $("#screen_container").hide();
        window.typist.
            sleep(1000).
            after(function() { 
                window.prebootDone = false;
                window.enableTyping = true;
                emulator.destroy();
            }).
            print("Welcome back to the pre-boot environment.").
            prompt();
    });
}

function runEmulator() {
    // Licenses are available at vm/licenses.tar.gz
    // Dynamically load libv86 - it's *very* heavy (380+ kb)
    var v86 = document.createElement('script');
    v86.onload = function() {
        createEmulator();
    };

    v86.src = "/vm/libv86.js";
    document.head.appendChild(v86);
}

export {runEmulator};
