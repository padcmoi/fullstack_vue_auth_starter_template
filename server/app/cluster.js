const dotenv = require('dotenv')
dotenv.config()

// Charge les paquetages pour le multi thread
const cluster = require('cluster')
const os = require('os')
// Charge les paquetages pour le multi thread

let thread = os.cpus().length
let threadLimit = parseInt(process.env.MULTI_THREAD_LIMIT) || 0
if (threadLimit && thread > threadLimit) {
  thread = threadLimit
}

if (cluster.isMaster) {
  console.log('Master PID n°' + process.pid + ' with ' + thread + ' thread(s)')

  for (let i = 0; i < thread; i++) {
    cluster.fork()
  }

  cluster
    .on('fork', (w) => {
      console.log('+ Worker n°' + w.id + ' PID n°' + w.process.pid + ' started')
    })
    .on('exit', (w, c, s) => {
      console.warn('- Worker n°' + w.id + ' PID n°' + w.process.pid + ' died')
      cluster.fork()
    })

  require('./create_env') // génére un fichier de configuration environnement .env à la racine si il n'existe pas
  require('./check_db') // vérifie que les tables soient crées avec les colonnes par défaut, ne vérifie pas les colonnes
  require('./exec_loop') // Pour définir une boucle d'execution

  console.log('Listening on port ' + process.env.PORT || 3000)
}

module.exports = cluster.isWorker
