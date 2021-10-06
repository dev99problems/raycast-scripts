const init = start => `\x1b[${start}m`

const colorUtils = {
  Reset: init(0),
  Bright: init(1),
  Dim: init(2),
  Underscore: init(4),
  Blink: init(5),
  Reverse: init(7),
  Hidden: init(8),
}

const fgColors = {
  black: init(30),
  red: init(31),
  green: init(32),
  yellow: init(33),
  blue: init(34),
  magenta: init(35),
  cyan: init(36),
  white: init(37),
}

const bgColors = {
  BgBlack: init(40),
  BgRed: init(41),
  BgGreen: init(42),
  BgYellow: init(43),
  BgBlue: init(44),
  BgMagenta: init(45),
  BgCyan: init(46),
  BgWhite: init(47),
}

exports.colors = {
  ...colorUtils,
  ...fgColors,
  ...bgColors,
}
