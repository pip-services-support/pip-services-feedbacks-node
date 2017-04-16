# Seneca Protocol (version 1) <br/> Feedbacks Microservice

Feedbacks microservice implements a Seneca compatible API. 
Seneca port and protocol can be specified in the microservice [configuration](Configuration.md/#api_seneca). 

```javascript
var seneca = require('seneca')();

seneca.client({
    type: 'tcp', // Microservice seneca protocol
    localhost: 'localhost', // Microservice localhost
    port: 8080, // Microservice seneca port
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

* [DocumentReferenceV1 class](#class1)
* [PartyReferenceV1 class](#class2)
* [FeedbackV1 class](#class3)
* [cmd: 'get_feedbacks'](#operation1)
* [cmd: 'get_feedback_by_id'](#operation2)
* [cmd: 'send_feedback'](#operation3)
* [cmd: 'reply_feedback'](#operation4)
* [cmd: 'delete_feedback_by_id'](#operation5)

## Data types

### <a name="class1"></a> DocumentReferenceV1 class

Contains reference to a document attachment

**Properties:**
- id: string - unique feedback id
- name: string - document (file) name

### <a name="class2"></a> PartyReferenceV1 class

Contains reference to sending or replying party

**Properties:**
- id: string - unique feedback id
- name: string - party name
- email: string - (optional) party email address (optional)

### <a name="class3"></a> FeedbackV1 class

Represents user's feedback. 

**Properties:**
- id: string - unique feedback id
- category: string - feedback category, i.e. 'issue', 'feature', 'copyright', 'general', etc.
- app: string - (optional) application name
- sender: PartyReferenceV1 - (optional) party who sent the feedback
- sent_time: Date - date and time when feedback was sent
- title: string - (optional) feedback title
- content: string - feedback textual content
- pic_ids: string[] - (optional) array of picture block ids in storage attached to this feedback
- docs: DocumentReferenceV1[] - (optional) array of attached documents
- company_name: string - name of the company who reported copyright violation
- company_addr: string - mail address of the company who reported copyright violation
- copyright_holder: string - holder/owner of the violated copyright
- original_location: string - original location of copyrighted material
- copyrighted_work: string - exact description of the copyrighted material
- unauth_loc: string - unauthorized location of the violated copyright
- replier: PartyReferenceV1 - party who replied the feedback
- reply_time: Date - date and time when feedback was reply
- reply: text - reply textual content
- custom_hdr: Object - custom data summary that is always returned (in list and details)
- custom_dat: Object - custom data details that is returned only when a single object is returned (details)

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
  - sent\_from\_time: Date - (optional) start of feedback created interval
  - send\_to\_time: Date - (optional) end of feedback created interval
  - replied: boolean - **true** to filter replied feedbacks, **false** to filter feedbacks waiting for reply
  - search: string - string for full text search in title, content and sender name
- paging: object - paging parameters
  - skip: int - (optional) start of page (default: 0). Operation returns paged result
  - take: int - (optional) page length (max: 100). Operation returns paged result

**Returns:**
- err: Error - occured error or null for success
- result: DataPage<FeedbackV1> - retrieved Feedback in page format

### <a name="operation2"></a> Cmd: 'get\_feedback\_by_id'

Retrieves feedback by its unique id. 

**Arguments:** 
- feedback_id: string - unique feedback id

**Returns:**
- err: Error - occured error or null for success
- result: FeedbackV1 - retrieved Feedback object

### <a name="operation3"></a> Cmd: 'send_feedback'

Sends a feedback from a user.

**Arguments:** 
- feedback: FeedbackV1 - a feedback to be sent
- user: PartyReferenceV1 - feedback sender

**Returns:**
- err: Error - occured error or null for success
- result: FeedbackV1 - created Feedback object

### <a name="operation4"></a> Cmd: 'reply_feedback'

Reply feedback specified by its unique id.

**Arguments:** 
- feedback_id: string - unique feedback id
- user: PartyReferenceV1 - feedback replier
- reply: string - replied textual content

**Returns:**
- err: Error - occured error or null for success
- result: FeedbackV1 - replied Feedback object

### <a name="operation5"></a> Cmd: 'delete\_feedback\_by_id'

Deletes user feedback specified by its unique id.

**Arguments:** 
- feedback_id: string - unique feedback id

**Returns:**
- err: Error - occured error or null for success

