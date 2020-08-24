

// example reg key C:\Program Files\nodejs\node.exe C:\git\azwinstorage\app.js  "%1"%*
const express = require('express')
const {createContainer, upload, getSasUrl } = require(`${__dirname}/src`)

const app = express()
var chalk = require('chalk')


app.get('/*', (req,res) => {
    console.log(process.argv)
    console.log('running')
    res.send(true)
})

//Random port so multiple dialogs can be open
var port = Math.floor(Math.random() * (3000 - 3100) + 3100)

app.listen(port, async () => {
    console.log('running on random port', port)
    try {
        var src = process.argv[2].split('\\')
        var path = process.argv[2]
        var rgx = new RegExp('[^A-Za-z0-9]+', 'g')
        var container = src[src.length - 2].toLowerCase().replace(rgx, '')
        var file = src[src.length - 1]
    } catch {
        console.log(chalk.red('cmd params not available from context'))
        return ('not proceeding')
    }



    await createContainer(container).catch(error => {
        console.log( error )
    })
    await upload(container, file, path)
    //120 is 120 hours, change the value to desired amount
    var url = getSasUrl(container, file, 120)


    console.log(chalk.green(`copy URL from here
        
        `))
    console.log(chalk.yellow(`${url}`))

    console.log(chalk.green(`
        
        close this window after copying the SAS token for file ${file} and container ${container}`))

})

 


