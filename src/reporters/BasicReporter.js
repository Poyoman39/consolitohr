const LOG_LEVELS = require('../constants/LOG_LEVELS');

function BasicReporter(options = {}) {
  // === Read options === //
  this.maxLevel = LOG_LEVELS[options.maxLevel || 'verbose'];
  this.formatDate = options.formatDate || null;

  // === Body === //

  const logger = console;

  this.log = (level, ...args) => {
    if (LOG_LEVELS[level] > this.maxLevel) {
      return;
    }

    const log = logger[level] || logger.log;

    log(...[
      ...this.formatDate ? [
        `[${this.formatDate(new Date())}]`,
      ] : [],
      `[${level}]`,
      ...args,
    ]);
  };
}

module.exports = BasicReporter;
