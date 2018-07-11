NodeJS dependencies required :
    ipfs-api
    to-vfile
    retext
    retext-keywords
    express

    Installation : npm install modulename

Other Requirements : IPFS Daemon (Download and Install from https://ipfs.io/docs/install)
                     Elastic Search (Download and Install from https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)

                     IPFS Daemon as well as elastic search instance need to be running in the background.

Running (from terminal) :      $ ipfs daemon
                               $ yourElasticSearchDirectory/bin/elasticsearch
                               $ node clientApp.js (Server starts on port 3300)
