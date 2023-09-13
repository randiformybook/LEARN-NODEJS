const validator = require('validator');
const chalk = require('chalk');

const log = console.log;

// //Validator
// //contoh 1, validasi email
// log(validator.isEmail('hrandi1989@gmail.com'));
// //contoh 2, validasi Mobile Phone
// log(validator.isMobilePhone('+6281264314878','id-ID'));
// //contoh 3, validasi apakah nilai yang dimasukan numeric
// log(validator.isNumeric('123'));
// //contoh 1
// log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));
// ES2015 template literal
log(`
${chalk.bold('CPU')}: ${chalk.red('90%')}
${chalk.bold('RAM')}: ${chalk.green('40%')}
${chalk.bold('DISK')}: ${chalk.yellow('70%')}
`);

//Easily define your own themes:
const error = chalk.bold.red;
const warning = chalk.italic.hex('#FFA500'); // Orange color
const info = chalk.greenBright.bold;

console.log(error('Error!'));
console.log(warning('Warning!'));
console.log(info.bgYellow('Info!'));