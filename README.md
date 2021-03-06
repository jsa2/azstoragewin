# azstoragewin
This is nodejs program that enables the following functionality in Windows:

By right clicking any file in windows, the nodejs application uploads the file to the configured storage account, and returns Azure Blob Storage uri with embedded SAS token

![image](https://securecloud188323504.files.wordpress.com/2020/08/image-138.png)

![image](https://securecloud188323504.files.wordpress.com/2020/08/image-140.png)

## Pre-reqs
- Have NodeJS installed
- Only works on Windows 
    - In case its not obvious: Always test first in recoverable test system and not in your primary desktop. This also somebody elses code, so all disclaimers about running 3rd party code apply :)
## Installation
- create config.json in the project root
- Access your storage account, and copy the key from the 'Connection String Entry' to configstr: field
![image](https://securecloud188323504.files.wordpress.com/2020/08/image-141.png?w=1024)

```
    {
        "configstr":"DefaultEndpointsProtocol=https;AccountName=anyaccount;AccountKey=;EndpointSuffix=core.windows.net"
    }
```

- if you clone this app to c:\git\, then the app location will correct in the registry key without changes, assuming that nodejs is installed in the program files path
- In the addnodejsprovider.reg file replace the 'C:\\git\\azstoragewin\\app.js' with your path (Retain the "\\" marks)
```
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\*\shell\azstorage]
"icon"="C:\\Program Files\\nodejs\\node.exe"
@="Send to AzStorage"

[HKEY_CLASSES_ROOT\*\shell\azstorage\command]
@="C:\\Program Files\\nodejs\\node.exe C:\\git\\azwinstorage\\app.js  \"%1\"%*"
```
- run npm install 
## expected end result 
Click https://videopress.com/v/zXf8akws
 - more https://securecloud.blog/2020/08/24/poc-part-0-azure-blob-storage-right-click-to-share-files/

## other
Error handling is far from perfect. Maybe at some point, I will take care of catchable errors, but atm, this is just testing project for fun :)
- Text logo generated at http://patorjk.com/software/taag/ (Credits)
## 
Information in this git is provided “AS IS” with no warranties and confers no rights.

