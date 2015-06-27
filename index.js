/* Require Dependendcies */
var $ = require('native-js'),
    c = require('colors/safe'),
    f = require('fs'),
    p = require('path');

/* Logger Constructor */
var Logger = function (options) {
    this.enabled = options.enabled || true;
    this.logtime = options.logtime || true;
    this.logfile = options.logfile || false;
    this.logpath = options.logpath || p.resolve('./', 'logs');

    /* Initializing log files */
    var pt;

    try {
        pt = f.statSync(this.logpath);
    }
    catch ( e ) {}

    /* Create directory if not exists */
    if ( !pt && this.logfile ) f.mkdirSync(this.logpath);

    return this;
}

/* Logger Prototypes */
Logger.prototype = {
    write : function (type, msg, force, org) {
        if ( this.logfile ) {
            var fl, fln = p.resolve(this.logpath, (type === 'info' ? this.date(true) + '-info.log' : this.date(true) + '-error.log')), fst;

            try {
                fl = f.statSync(fln);
            }
            catch ( e ) {}

            if ( fl && fl.isFile() ) {
                fst = f.readFileSync(fln, 'utf8');
            }
            else {
                fst = '';
            }

            fst += org + '\r\n';

            f.writeFileSync(fln, fst);
        }

        if ( this.enabled || force ) {

            if ( type === 'info' ) {
                console.log(msg);
            }
            else if ( type === 'error' ) {
                console.log(msg);
            }

            if ( type === 'stop' ) {
                console.log(msg);
            }
        }

        if ( type === 'stop' ) {
            process.exit(0);
        }

        return this;
    },

    date    : function (notime) {
        var dt = new Date();

        return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate() + (!notime ? ' ' + dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds() : '');
    },

    /* Request Transmition Logger */
    set     : function (title, message, force) {
        if ( isString(title) && isString(message) ) {
            var msg = '';

            if ( this.logtime ) msg += c.gray('[' + this.date() + '] ');

            msg += c.magenta.bold('[⇡] ') + c.magenta.bold(title);
            msg += c.gray.bold(' ~ ') + c.magenta(message);

            this.write('info', msg, force, '[' + this.date() + ']\r\n' + title + ' => ' + message + '\r\n');
        }

        return this;
    },

    /* Response Transmition Logger */
    get     : function (title, message, force) {
        if ( isString(title) && isString(message) ) {
            var msg = '';

            if ( this.logtime ) msg += c.gray('[' + this.date() + '] ');

            msg += c.blue.bold('[⇣] ') + c.blue.bold(title);
            msg += c.gray.bold(' ~ ') + c.blue(message);

            this.write('info', msg, force, '[' + this.date() + ']\r\n' + title + ' => ' + message + '\r\n');
        }

        return this;
    },

    /* Basic Logger */
    info    : function (title, message, force) {
        if ( isString(title) && isString(message) ) {
            var msg = '';

            if ( this.logtime ) msg += c.gray('[' + this.date() + '] ');

            msg += c.cyan.bold('[ℹ] ') + c.cyan.bold(title);
            msg += c.gray.bold(' ~ ') + c.cyan(message);

            this.write('info', msg, force, '[' + this.date() + ']\r\n' + title + ' => ' + message + '\r\n');
        }

        return this;
    },

    /* Warning Logger */
    warn    : function (title, message, force) {
        if ( isString(title) && isString(message) ) {
            var msg = '';

            if ( this.logtime ) msg += c.gray('[' + this.date() + '] ');

            msg += c.yellow.bold('[!] ') + c.yellow.bold(title);
            msg += c.gray.bold(' ~ ') + c.yellow(message);

            this.write('info', msg, force, '[' + this.date() + ']\r\n' + title + ' => ' + message + '\r\n');
        }

        return this;
    },

    /* Error Logger */
    error   : function (title, message, force) {
        if ( isString(title) && isString(message) ) {
            var msg = '';

            if ( this.logtime ) msg += c.gray('[' + this.date() + '] ');

            msg += c.red.bold('[✕] ') + c.red.bold(title);
            msg += c.gray.bold(' ~ ') + c.red(message);

            this.write('error', msg, force, '[' + this.date() + ']\r\n' + title + ' => ' + message + '\r\n');
        }

        return this;
    },

    /* Success Logger */
    success : function (title, message, force) {
        if ( isString(title) && isString(message) ) {
            var msg = '';

            if ( this.logtime ) msg += c.gray('[' + this.date() + '] ');

            msg += c.green.bold('[✓] ') + c.green.bold(title);
            msg += c.gray.bold(' ~ ') + c.green(message);

            this.write('info', msg, force, '[' + this.date() + ']\r\n' + title + ' => ' + message + '\r\n');
        }

        return this;
    },

    /* Error Logger */
    stop    : function (title, message, force) {
        if ( isString(title) && isString(message) ) {
            var msg = '';

            if ( this.logtime ) msg += c.gray('[' + this.date() + '] ');

            msg += c.red.bold('[✕] ') + c.red.bold(title);
            msg += c.gray.bold(' ~ ') + c.red(message);

            this.write('stop', msg, force, '[' + this.date() + ']\r\n' + title + ' => ' + message + '\r\n');
        }

        return this;
    }
}

/* Add Logger to Global Object */
if ( 'undefined' !== typeof global ) {
    global.CBLogger = Logger;
}

/* Exporting Module */
module.exports = Logger;