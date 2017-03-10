# HTTP REST Protocol (version 1) <br/> Feedbacks Microservice

Feedbacks microservice implements a REST compatible API, that can be accessed on configured port.
All input and output data is serialized in JSON format. Errors are returned in [standard format]().

* [Feedback class](#class1)
* [FeedbackPage class](#class2)
* [GET /feedbacks](#operation1)
* [GET /feedbacks/:feedback_id](#operation2)
* [POST /feedbacks](#operation3)
* [PUT /feedbacks/:feedbacks_id](#operation4)
* [DELETE /feedbacks/:feedbacks_id](#operation5)

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

### <a name="operation1"></a> Method: 'GET', route '/feedbacks'

Retrieves a list of feedbacks by specified criteria

**Parameters:** 
- category: string - (optional) feedback category
- app: string - (optional) application name
- sender_id: string - (optional) unique user id of the sender
- sender_email: string - (optional) email address of the sender
- replier_id: string - (optional) unique user id of the replier
- from: Date - (optional) start of feedback created interval
- to: Date - (optional) end of feedback created interval
- replied: boolean - **true** to filter replied feedbacks, **false** to filter feedbacks waiting for reply
- search: string - string for full text search in title, content and sender name
- skip: int - (optional) start of page (default: 0). Operation returns paged result
- take: int - (optional) page length (max: 100). Operation returns paged result

**Response body:**
FeedbackPage object is paging was requested or error

### <a name="operation2"></a> Method: 'GET', route '/feedbacks/:feedback_id'

Retrieves a single feedback specified by its unique id

**Parameters:** 
- feedback_id: string - unique feedback id

**Response body:**
Feedback object, null if object wasn't found or error 

### <a name="operation3"></a> Method: 'POST', route '/feedbacks'

Sends a feedback from a user.

**Request body:**
- feedback: Feedback - a feedback to be sent
- user: User - feedback sender
  - id: string - (optional) sender unique user id
  - name: string - full sender name
  - email: string - sender email address

**Response body:**
Created Feedback object or error

### <a name="operation4"></a> Method: 'PUT', route '/feedbacks/:feedback_id'

Reply feedback specified by its unique id.

**Parameters:** 
- feedback_id: string - unique Feedback object id

**Request body:**
- feedback_id: string - unique feedback id
- user: User - feedback replier
  - id: string - (optional) replier unique user id
  - name: string - full replier name
  - email: string - replier email address
- reply: string - replied textual content

**Response body:**
Replied Feedback object or error 
 
### <a name="operation5"></a> Method: 'DELETE', route '/feedbacks/:feedback_id'

Deletes system feedback specified by its unique id

**Parameters:** 
- feedback_id: string - unique feedback id

**Response body:**
Ocurred error or null for success 
 
