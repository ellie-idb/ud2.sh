function createEmulator() {
    var emulator = window.emulator = new V86Starter({
        wasm_path: "vm/v86.wasm",
        memory_size: 128 * 1024 * 1024,
        vga_memory_size: 8 * 1024 * 1024,
        network_relay_url: "wss://relay.widgetry.org",
        screen_container: document.getElementById("screen_container"),
        bios: {
            url: "vm/seabios.bin",
        },
        vga_bios: {
            url: "vm/vgabios.bin",
        },
        cdrom: {
            url: "vm/v86-linux.iso",
        },
        autostart: true,
    });

}

function runEmulator() {
    // Licenses are available at vm/licenses.tar.gz
    // Dynamically load libv86 - it's *very* heavy (380+ kb)
    var v86 = document.createElement('script');
    v86.onload = function() {
        createEmulator();
    };

    v86.src = "vm/libv86.js";
    document.head.appendChild(v86);
}

export {runEmulator};