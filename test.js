var Logger = require('./index'),
    log    = new Logger({
        logfile : true,
        logpath : './test'
    });

log.set('Log Title', 'Outgoing transmission (GET) http://localhost/test with data ' + JSON.stringify({
    a : 1,
    b : 2,
    c : 3
}));

log.get('Log Title', 'Incoming transmission (POST) { username: "john" }');

log.info('Log Title', 'Basic logging...');

log.warn('System', 'Warning!');
log.error('System', 'Error!');

log.info('System', 'Informations');
log.success('System', 'Success!');
