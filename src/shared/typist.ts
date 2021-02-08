import 'jquery';

class TypistOptions {
    hostname: string;
    backgroundColor: string;
    textColor: string;
    fontFamily: string;
    height: number;
    typeDelay: number;

    constructor(hostname?: string, backgroundColor?: string, textColor?: string, fontFamily?: string, height?: number, typeDelay?: number) {
        this.hostname = hostname ? hostname : '';
        this.backgroundColor = backgroundColor ? backgroundColor : '#333';
        this.textColor = textColor ? textColor : '#ffffff';
        this.fontFamily = fontFamily ? fontFamily : 'monospace';
        this.height = height ? height : 9e99;
        this.typeDelay = typeDelay ? typeDelay : 80;
    }
}

enum TypistSpeed {
    SLOW = 1,
    MEDIUM,
    FAST,
    VERYFAST,
    SUPERFAST
};

class Typist {
    readonly MAX_SCROLL = 9e99;
    options: TypistOptions; 
    container: JQuery;
    cursor: JQuery;
    blinkTimer: NodeJS.Timeout;
    
    constructor(container: JQuery, config: TypistOptions) {
        this.options = config;
        this.container = container;

        let oldStyle = this.container.attr('style');
        let style = 'background-color: ' + this.options.backgroundColor;
        style += '; color: ' + this.options.textColor;
        style += '; font-family: ' + this.options.fontFamily;

        this.container.addClass('typist-container').attr('style', oldStyle + style).height(this.options.height);
        this.startBlink();
    }

    addCursor(): JQuery {
        if (this.cursor) {
            this.cursor.remove();
        }

        let p = $('<span class="cursor">&#9608;</span>');
        this.cursor = p;
        return p;
    }

    private triggerResize(): void {
        $(window).trigger('resize');
    }
    
    private startBlink(next?: () => void): void{
        this.blinkTimer = setInterval(() => {
            if (this.cursor) {
                this.cursor.toggle();
            }
        }, 500)

        if (next) {
            next();
        }
    }

    private stopBlink(next?: () => void): void{
        clearInterval(this.blinkTimer);

        if (next) {
            next();
        }
    }

    addLine(): JQuery {
        if (this.cursor) {
            this.cursor.remove();
        }
        let p = $('<p></p>');
        this.container.append(p);
        return p;
    }

    after(next?: () => void) : Typist {
        this.container.queue((queueNext?: any) => {
            if (next) {
                next();
            }
            queueNext();
        });
        return this;
    }

    prompt(next?: () => void) : Typist {
        this.container.queue((queueNext?: any) => {
            if (next) {
                next();
            }

            if (this.cursor) {
                this.cursor.remove();
            }
            let line = this.addLine();
            let prompt = line.addClass('prompt');
            prompt.append(this.options.hostname + '$ ');
            prompt.append(this.addCursor());
            this.triggerResize();
            
            queueNext();
        });
        return this;
    }

    clear(): Typist {
        this.container.queue((queueNext?: any) => {
            this.container.empty();
            queueNext();
        });
        return this;
    }
    
    private typeChar(char: string) : void {
        this.container.queue((queueNext?: any) => {
            this.cursor.before(char);
            queueNext(); 
         }).delay(this.options.typeDelay);
    }

    type(text: string): Typist {
        this.container.queue(this.stopBlink);
        for (let i = 0; i < text.length; i++) {
            this.typeChar(text[i]);
        }
        this.container.queue(this.startBlink);
        return this;
    }

    echo(text: string): Typist {
        for (let i = 0; i < text.length; i++) {      
            this.container.queue((queueNext?: any) => {
                let p;
                if (i == 0) {
                    p = this.addLine();
                }
                p.append(text[i]);
                queueNext();
            }).delay(this.options.typeDelay);      
        }      
        return this;
    }

    sleep(millis: number): Typist {
        this.container.delay(millis);
        return this;
    }

    speed(speed: TypistSpeed): Typist {
        switch(speed) {
            case TypistSpeed.SLOW:
                this.options.typeDelay = 120;
                break;
            case TypistSpeed.MEDIUM:
                this.options.typeDelay = 60;
                break;
            case TypistSpeed.FAST:
                this.options.typeDelay = 20;
                break;
            case TypistSpeed.VERYFAST:
                this.options.typeDelay = 10;
                break;
            case TypistSpeed.SUPERFAST:
                this.options.typeDelay = 1;
                break;
            default:
                break;
        }

        return this;
    }

    print(text: string): Typist {
        this.container.queue((queueNext?: any) => {
            let p = this.addLine();
            p.append(text);
            this.triggerResize();
            queueNext();
        }).delay(this.options.typeDelay);
        return this;
    }
}

export {Typist, TypistOptions, TypistSpeed};
