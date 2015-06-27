# **Cobolab Logger**
---

A small NodeJS module to logs application activities with colored text and automatically save the logs to file.

![CBLogger](https://raw.githubusercontent.com/Cobolab/cb-logger/master/ss.png)

***
## **Usage**

**`var log = new CBLogger(options)`**

**Example**

```js
// Load module. After loading module, module will also available on GLOBAL object ( global.CBLogger )
require('cb-logger');

// Create new logger.
var log = new CBLogger({ logfile: true, logpath: './logs/main' });

// Log info.
log.info('System', 'Application started.');

// Log warning.
log.warn('System', 'System get wrong configs!');

// Log error.
log.error('System', 'Unable to intit config!');

// Another logs
var foo = function() {
	var log = new CBLogger({ logfile: true, logpath: './logs/custom' });
	
	log.info('Scoped Logs', 'This information will saved in different location');
}

```

***
## **Methods**

### **`.info(title, message)`**

Log informations. Log file located at **`$LOGPATH/[date]-info.log`**

### **`.warn(title, message)`**

Log warnings. Log file located at **`$LOGPATH/[date]-info.log`**

### **`.error(title, message)`**

Log errors. Log file located at **`$LOGPATH/[date]-error.log`**

### **`.success(title, message)`**

Log success messages. Log file located at **`$LOGPATH/[date]-info.log`**

### **`.get(title, message)`**

Log ougoing transmission. Log file located at **`$LOGPATH/[date]-info.log`**

### **`.set(title, message)`**

Log incoming transmission. Log file located at **`$LOGPATH/[date]-info.log`**