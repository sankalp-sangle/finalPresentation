Requirements :       IPFS Daemon (Download and Install from https://ipfs.io/docs/install)
                     
                     Elastic Search (Download and Install from https://www.elastic.co/guide/en/elasticsearch/reference/current/_installation.html)

                     NodeJS and npm

NodeJS dependencies required for client side :
    
    ipfs-api
    to-vfile
    retext
    retext-keywords
    express

To install these, run the following commands from a terminal inside the client directory :
                     
                     $ chmod 755 installClientSideNodeDependencies.sh
                     $ ./installClientSideNodeDependencies.sh

IMPORTANT : IP configuration.
            In views directory, in the file form.ejs, pass IP address of fabric as argument to window.open() function.
            
How to run the application : 1. Open up a terminal.
                             
                             2. Run the following commands in sequential order      
                                
                                To start an ipfs server :              $ ipfs daemon
                                To start an elasticsearch instance :   $ yourElasticSearchDirectory/bin/elasticsearch
                                To start the client side application : $ node clientApp.js

                             3. Open a web browser and go to localhost:3300.
