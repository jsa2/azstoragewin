const fs = require('fs')
const chalk = require('chalk')

var sta = require(`${__dirname}/config.json`).configstr
//console.log(sta)
process.env['AZURE_STORAGE_CONNECTION_STRING']=sta
const {createBlobService,BlobUtilities} = require('azure-storage')

const blobsvc = createBlobService()

var logo = fs.readFileSync(`${__dirname}/logo.txt`).toString()
console.log(chalk.yellow(logo))

console.log('init')

function getSasUrl (container,name,duration) {

    var startDate = new Date();
    var expiryDate = new Date(startDate.setHours(+duration));
    startDate.setHours(-duration)
    
    var sharedAccessPolicy = {
        AccessPolicy: {
          Permissions: BlobUtilities.SharedAccessPermissions.READ,
          Start: startDate,
          Expiry: expiryDate
        }
      };
    
      var sas = blobsvc.generateSharedAccessSignature(container,name,sharedAccessPolicy)
     
      var url = blobsvc.getUrl(container,name,sas)
    
    
       return (url)
    /* 
        var sas = BlobClientWithToken.generateSharedAccessSignature(container,,sharedAccessPolicy)
        var url = blobsvc.getUrl(container, upload, cred); */
    
    }


function createContainer (container) {

    return new Promise ((resolve,reject) => {

        blobsvc.createContainerIfNotExists(container, (err,result) => {
           // console.log(result)
            
            if (err) {return reject(err)}

            return resolve(result)
        })

    })

    

}

 async function upload (container,file,filepath) {

    return new Promise ((resolve,reject )=> {
      
     blobsvc.createBlockBlobFromLocalFile(container,file,filepath,(err,result,response) => {
        //console.log(result)
            
        if (err) {return reject(err)}

        return resolve(result)
     })

    })

   
   
}

//reads()
module.exports={createContainer,upload,getSasUrl}