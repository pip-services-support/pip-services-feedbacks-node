# HTTP REST Protocol (version 1) <br/> Feedbacks Microservice

Feedbacks microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [AttachmentV1 class](#class1)
* [PartyReferenceV1 class](#class2)
* [FeedbackV1 class](#class3)
* [POST /feedbacks/get_feedbacks](#operation1)
* [POST /feedbacks/get_feeback_by_id](#operation2)
* [POST /feedbacks/send_feedback](#operation3)
* [POST /feedbacks/reply_feedback](#operation4)
* [POST /feedbacks/delete_feedback_by_id](#operation5)

## Data types

### <a name="class1"></a> AttachmentV1 class

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

### <a name="class3"></a> Feedback class

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
- docs: AttachmentV1[] - (optional) array of attached documents
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

### <a name="operation1"></a> Method: 'POST', route '/feedbacks/get_feedbacks'

Retrieves a list of feedbacks by specified criteria

**Request body:** 
- category: string - (optional) feedback category
- app: string - (optional) application name
- sender_id: string - (optional) unique user id of the sender
- sender_email: string - (optional) email address of the sender
- replier_id: string - (optional) unique user id of the replier
- sent\_from\_time: Date - (optional) start of feedback created interval
- sent\_to\_time: Date - (optional) end of feedback created interval
- replied: boolean - **true** to filter replied feedbacks, **false** to filter feedbacks waiting for reply
- search: string - string for full text search in title, content and sender name
- skip: int - (optional) start of page (default: 0). Operation returns paged result
- take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
DataPage<FeedbackV1> object or error

### <a name="operation2"></a> Method: 'POST', route '/feedbacks/get\_feedback\_by_id'

Retrieves a single feedback specified by its unique id

**Request body:** 
- feedback_id: string - unique feedback id

**Response body:**
FeedbackV1 object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/feedbacks/send_feedback'

Sends a feedback from a user.

**Request body:**
- feedback: FeedbackV1 - a feedback to be sent
- user: PartyReferenceV1 - feedback sender

**Response body:**
Created FeedbackV1 object or error

### <a name="operation4"></a> Method: 'POST', route '/feedbacks/reply\_feedback'

Reply feedback specified by its unique id.

**Request body:** 
- feedback_id: string - unique Feedback object id

**Request body:**
- feedback_id: string - unique feedback id
- user: PartyReferenceV1 - feedback replier
- reply: string - replied textual content

**Response body:**
Replied FeedbackV1 object or error 
 
### <a name="operation5"></a> Method: 'POST', route '/feedbacks/delete\_feedback\_by_id'

Deletes system feedback specified by its unique id

**Request body:** 
- feedback_id: string - unique feedback id

**Response body:**
Occurred error or null for success 
 
