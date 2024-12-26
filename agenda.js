const Agenda = require('agenda');
const dotEnv = require("dotenv");

dotEnv.config();

const dburl = process.env.MONGODB_URI; 

const mongoConnectionString = dburl; 

const agenda = new Agenda({ db: { address: mongoConnectionString, collection: 'agendaJobs' } });

agenda.on('ready', () => {
  console.log('Agenda is ready!');
});

agenda.on('error', (err) => {
  console.error('Agenda encountered an error:', err);
});

module.exports = agenda;
