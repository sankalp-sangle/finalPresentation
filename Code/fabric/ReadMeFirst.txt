NodeJS dependencies : stellar-sdk
                      bs58
                      request-promise
                      collections/set
                      log4js
                      winston
                      mysql
                      socket.io
                      
To install these, run the following commands from a terminal inside the fabric directory :

    $ chmod 755 installFabricSideNodeDependencies.sh
    $ ./installFabricSideNodeDependencies.sh

Other requirements :  Elastic Search (Download and Install from https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)

How to run the fabric :   $ yourElasticSearchDirectory/bin/elasticsearch
                          $ node app.js