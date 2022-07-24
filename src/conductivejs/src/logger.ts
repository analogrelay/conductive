export type LogProps = {
    [key: string]: any;
}

export enum LogLevel {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
};

export interface LogSink {
    log(categoryName: string, level: LogLevel, eventName: string, message: string, error?: Error, props?: LogProps);
}

export abstract class Logger {
    abstract log(level: LogLevel, eventName: string, message: string, error?: Error, props?: LogProps);

    debug(eventName: string, message: string, error?: Error, props?: LogProps) {
        this.log(LogLevel.DEBUG, eventName, message, error, props);
    }

    info(eventName: string, message: string, error?: Error, props?: LogProps) {
        this.log(LogLevel.INFO, eventName, message, error, props);
    }

    warn(eventName: string, message: string, error?: Error, props?: LogProps) {
        this.log(LogLevel.WARN, eventName, message, error, props);
    }

    error(eventName: string, message: string, error?: Error, props?: LogProps) {
        this.log(LogLevel.ERROR, eventName, message, error, props);
    }
}

export class DefaultLogger extends Logger {
    #sink: LogSink;
    #categoryName: string;

    constructor(categoryName: string, sink: LogSink) {
        super();
        this.#categoryName = categoryName;
        this.#sink = sink;
    }

    log(level: LogLevel, eventName: string, message: string, error?: Error, props?: LogProps) {
        this.#sink.log(this.#categoryName, level, eventName, message, error, props);
    }
}

export class MultiSink implements LogSink {
    #sinks: LogSink[];
    constructor(...sinks: LogSink[]) {
        this.#sinks = sinks;
    }

    log(categoryName: string, level: LogLevel, eventName: string, message: string, error?: Error, props?: LogProps) {
        this.#sinks.forEach(sink => {
            sink.log(categoryName, level, eventName, message, error, props);
        });
    }
}

export class ConsoleSink implements LogSink {
    #console: Console;
    constructor(console: Console) {
        this.#console = console;
    }

    log(categoryName: string, level: LogLevel, eventName: string, message: string, error?: Error, props?: LogProps) {
        let logger: (message?: any, ...optionalParams: any[]) => void;
        let levelStyle: string;
        if(level == LogLevel.DEBUG) {
            levelStyle = "color: gray";
            logger = this.#console.debug;
        } else if (level == LogLevel.INFO) {
            levelStyle = "color: green";
            logger = this.#console.info;
        }
        else if (level == LogLevel.WARN) {
            levelStyle = "color: yellow";
            logger = this.#console.warn;
        }
        else if (level == LogLevel.ERROR) {
            levelStyle = "color: red";
            logger = this.#console.error;
        }

        if (!logger) {
            logger = this.#console.log;
        }

        if (!logger) {
            return;
        }

        // Format the message
        let formatted = `%c${level}%c [${categoryName}.${eventName}] ${message}`;
        logger(formatted, levelStyle, "color: auto");
    }
}