const DEFAULT_LEVELS = {
  fatal: true,
  error: true,
  warn: true,
  log: true,
  info: true,
  success: true,
  debug: true,
  trace: true,
  silent: true,
  verbose: true,
};

function Consolitohr(options = {}) {
  // === Read options === //
  this.reporters = options.reporters || [];
  this.levels = Object.entries({
    ...DEFAULT_LEVELS,
    ...options.levels,
    log: true,
  }).filter(([, isActive]) => isActive)
    .map(([level]) => level);

  // === Create log functions === //
  this.levels.forEach((level) => {
    if (this[level]) {
      throw new Error(`Forbidden level value ${level}`);
    }

    this[level] = (...args) => {
      this.reporters.forEach((reporter) => {
        reporter.log(level, ...args);
      });
    };
  });
}

module.exports = Consolitohr;
