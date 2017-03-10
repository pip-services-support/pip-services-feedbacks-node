# Seneca Protocol (version 1) <br/> Feedbacks Microservice

Feedbacks microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8812, // Microservice seneca port
});
```

The microservice responds on the following requests:

```javascript
seneca.act(
    {
        role: 'feedbacks',
        version: 1,
        cmd: ...cmd name....
        ... Arguments ...
    },
    function (err, result) {
        ...
    }
);
```

* [Feedback class](#class1)
* [FeedbackPage class](#class2)
* [cmd: 'get_feedbacks'](#operation1)
* [cmd: 'get_feedback_by_id'](#operation2)
* [cmd: 'send_feedback'](#operation3)
* [cmd: 'reply_feedback'](#operation4)
* [cmd: 'delete_feedback'](#operation5)

## Data types

### <a name="class1"></a> Feedback class

Represents user's feedback. 

**Properties:**
- id: string - unique feedback id
- category: string - feedback category, i.e. 'issue', 'feature', 'copyright', 'general', etc.
- app: string - (optional) application name
- sender: PartyReference - (optional) party who sent the feedback
  - id: string - (optional) unique user id who sent the feedback
  - name: string - sender full name
  - email: string - sender email address to send reply
- sent: Date - date and time when feedback was sent
- title: string - (optional) feedback title
- content: string - feedback textual content
- pic_ids: string[] - (optional) array of picture block ids in storage attached to this feedback
- docs: Reference[] - (optional) array of attached documents
  - id: string - block id in storage attached to this feedback
  - name: string - attached document/file name
- company_name: string - name of the company who reported copyright violation
- company_addr: string - mail address of the company who reported copyright violation
- copyright_holder: string - holder/owner of the violated copyright
- original_location: string - original location of copyrighted material
- copyrighted_work: string - exact description of the copyrighted material
- unauth_loc: string - unauthorized location of the violated copyright
- replier: PartyReference - party who replied the feedback
  - id: string - unique user id who replied the feedback
  - name: string - replier full name
  - email: string - replier email address to continue communication
- replied: Date - date and time when feedback was reply
- reply: text - reply textual content
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

### <a name="class3"></a> FeedbackPage class

Represents a paged result with subset of requested Feedback objects

**Properties:**
- data: Feedback[] - array of retrieved Feedback page
- count: int - total number of objects in retrieved resultset

## Operations

### <a name="operation1"></a> Cmd: 'get_feedbacks'

Retrieves a list of feedbacks by specified criteria

**Arguments:** 
- filter: object - filter parameters
  - category: string - (optional) feedback category
  - app: string - (optional) application name
  - sender_id: string - (optional) unique user id of the sender
  - sender_email: string - (optional) email address of the sender
  - replier_id: string - (optional) unique user id of the replier
  - from: Date - (optional) start of feedback created interval
  - to: Date - (optional) end of feedback created interval
  - replied: boolean - **true** to filter replied feedbacks, **false** to filter feedbacks waiting for reply
  - search: string - string for full text search in title, content and sender name
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: FeedbackPage - retrieved Feedback in page format

### <a name="operation2"></a> Cmd: 'get_feedback_by_id'

Retrieves feedback by its unique id. 

**Arguments:** 
- feedback_id: string - unique feedback id

**Returns:**
- err: Error - occured error or null for success
- result: Feedback - retrieved Feedback object

### <a name="operation3"></a> Cmd: 'send_feedback'

Sends a feedback from a user.

**Arguments:** 
- feedback: Feedback - a feedback to be sent
- user: User - feedback sender
  - id: string - (optional) sender unique user id
  - name: string - full sender name
  - email: string - sender email address

**Returns:**
- err: Error - occured error or null for success
- result: Feedback - created Feedback object

### <a name="operation4"></a> Cmd: 'reply_feedback'

Reply feedback specified by its unique id.

**Arguments:** 
- feedback_id: string - unique feedback id
- user: User - feedback replier
  - id: string - (optional) replier unique user id
  - name: string - full replier name
  - email: string - replier email address
- reply: string - replied textual content

**Returns:**
- err: Error - occured error or null for success
- result: Feedback - replied Feedback object

### <a name="operation5"></a> Cmd: 'delete_feedback'

Deletes user feedback specified by its unique id.

**Arguments:** 
- feedback_id: string - unique feedback id

**Returns:**
- err: Error - occured error or null for success

