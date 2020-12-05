import Raven from 'raven-js'

function init() {
  Raven.config(
    "https://c037b5b28dcc49a7b65efed513fbd2a0@o486114.ingest.sentry.io/5542396",
    {
      release: "0-0-0",
      environment: "development-test",
    }
  ).install();
}

function log(error){
    Raven.captureException(error);
}


const logger = {
  init,
  log 
} 
export default logger;