const colors = require('colorette');
const LOG_LEVELS = require('../constants/LOG_LEVELS');

const LEVEL_ICONS = {
  fatal: '✖',
  error: '✖',
  warn: '⚠',
  log: '',
  info: 'ℹ',
  success: '✔',
  debug: '⚙',
  trace: '→',
  silent: '',
  verbose: '',
};

const LEVEL_COLORS = {
  fatal: 'red',
  error: 'red',
  warn: 'yellow',
  log: 'white',
  info: 'cyan',
  success: 'green',
  debug: 'gray',
  trace: 'white',
  silent: 'gray',
  verbose: 'gray',
};

const LEVEL_IS_BADGE = {
  fatal: true,
  error: true,
  warn: true,
  info: true,
};

const getBgColor = (color = 'white') => (
  colors[`bg${color[0].toUpperCase()}${color.slice(1)}`]
  || colors.bgWhite
);

const DEFAULT_FORMAT_DATE = (date) => `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

function FancyReporter(options = {}) {
  // === Read options === //
  this.maxLevel = LOG_LEVELS[options.maxLevel || 'verbose'];

  // === Body === //

  const logger = console;

  this.formatDate = options.formatDate || DEFAULT_FORMAT_DATE;

  this.log = (level, ...args) => {
    if (LOG_LEVELS[level] > this.maxLevel) {
      return;
    }

    const levelIcon = LEVEL_ICONS[level] || '';
    const levelColor = LEVEL_COLORS[level] || 'white';
    const levelIsBadge = LEVEL_IS_BADGE[level] || false;

    const log = logger[level] || logger.log;

    const logHeader = levelIsBadge
      ? getBgColor(levelColor)(
        colors.black(` ${level.toUpperCase()} `),
      )
      : colors[levelColor](levelIcon);

    const dateStr = colors.gray(this.formatDate?.(new Date()));

    log(
      ...dateStr ? [dateStr] : [],
      logHeader,
      ...args,
    );
  };
}

module.exports = FancyReporter;
