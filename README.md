# Feedbacks Microservice

This is a user feedbacks microservice from Pip.Services library. 
It allows users to communicate to application support, request help, share ideas or raise copyright issues.
When feedbacks are processed by support personnel, user receives a feedback via provided email.

The microservice currently supports the following deployment options:
* Deployment platforms: Standalone Process, Seneca
* External APIs: HTTP/REST, Seneca
* Persistence: Flat Files, MongoDB

This microservice has dependencies on the following microservices:
- [pip-services-storage](https://github.com/pip-services/pip-services-storage) - to reference pictures and documents associates with feedbacks

<a name="links"></a> Quick Links:

* [Download Links](doc/Downloads.md)
* [Development Guide](doc/Development.md)
* [Configuration Guide](doc/Configuration.md)
* [Deployment Guide](doc/Deployment.md)
* Client SDKs
  - [Node.js SDK](https://github.com/pip-services/pip-clients-feedbacks-node)
* Communication Protocols
  - [HTTP/REST Version 1](doc/RestProtocolV1.md)
  - [Seneca Version 1](doc/SenecaProtocolV1.md)

## Download

Right now the only way to get the microservice is to check it out directly from github repository
```bash
git clone git@github.com:pip-services/pip-services-feedbacks.git
```

Pip.Service team is working to implement packaging and make stable releases available for your 
as zip downloadable archieves.

## Run

Add **config.json** file to the root of the microservice folder and set configuration parameters.
As the starting point you can use example configuration from **config.example.json** file. 

Example of microservice configuration
```javascript
{    
    "logs": {
        "descriptor": {
            "type": "console"
        },
        "options": {
            "level": 10
        }
    },
    
    "counters": {
        "descriptor": {
            "type": "log"
        },
        "options": {
            "timeout": 10000
        }
    },
    
    "persistence": {
        "descriptor": {
            "group": "pip-services-settings",            
            "type": "mongodb"
        },
        "connection": {
            "uri": "mongodb://localhost/pipservicestest"
        },
        "options": {
            "server": {
                "poolSize": 4,
                "socketOptions": {
                    "keepAlive": 1,
                    "connectTimeoutMS": 5000
                },
                "auto_reconnect": true
            },
            "debug": false        
        }
    },

    "controllers": {
        "descriptor": {
            "group": "pip-services-feedbacks"            
        },
        "options": {
            "maxTagCount": 1000
        }
    },    
    
    "clients": [
        {
            "descriptor": {
                "group": "pip-services-storage",            
                "type": "rest",
                "version": "1.0"
            },
            "endpoint": {
                "type": "http",
                "host": "localhost",
                "port": 8010
            }
        }
    ],
    
    "services": [
        {
            "descriptor": {
                "group": "pip-services-feedbacks",            
                "type": "seneca",
                "version": "1.0"
            },
            "endpoint": {
                "type": "tcp",
                "host": "localhost",
                "port": 8812
            }
        },
        {
            "descriptor": {
                "group": "pip-services-feedbacks",            
                "type": "rest",
                "version": "1.0"
            },
            "endpoint": {
                "type": "http",
                "host": "localhost",
                "port": 8012
            }
        }
    ]
}
```
 
For more information on the microservice configuration see [Configuration Guide](Configuration.md).

Start the microservice using the command:
```bash
node run
```

## Use

The easiest way to work with the microservice is to use client SDK. 
The complete list of available client SDKs for different languages is listed in the [Quick Links](#links)

If you use Node.js then you should add dependency to the client SDK into **package.json** file of your project
```javascript
{
    ...
    "dependencies": {
        ....
        "pip-clients-feedbacks-node": "^1.0.*",
        ...
    }
}
```

Inside your code get the reference to the client SDK
```javascript
var sdk = new require('pip-clients-feedbacks-node').Version1;
```

Define client configuration parameters that match configuration of the microservice external API
```javascript
// Client configuration
var config = {
    endpoint: {
        protocol: 'http',
        host: 'localhost', 
        port: 8012
    }
};
```

Instantiate the client and open connection to the microservice
```javascript
// Create the client instance
var client = sdk.FeedbacksRestClient(config);

// Connect to the microservice
client.open(function(err) {
    if (err) {
        console.error('Connection to the microservice failed');
        console.error(err);
        return;
    }
    
    // Work with the microservice
    ...
});
```

Now the client is ready to perform operations
```javascript
// Send feedback to support
client.createFeedback(
    null,
    {
        category: 'support',
        title: 'Please help',
        content: 'When I am trying to run application in Win 10 it crashes'
    },
    {
        id: '123',
        name: 'Test User',
        email: 'somebody@somewhere.com'
    },
    function (err, feedback) {
        ...
    }
);
```

```javascript
// Reply feedback
client.replyFeedback(
    null,
    feedback.id,
    'Please, be patient. We are working to fix that issue.',
    {
        id: '321',
        name: 'Support Team',
        email: 'support@somewhere.com'
    },
    function(err, feedback) {
    ...    
    }
);
```    

## Acknowledgements

This microservice was created and currently maintained by *Sergey Seroukhov*.

