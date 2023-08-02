# Salesforce Project: Careship Technical Assignment

This is the github repository for the development of the below user story.

## Create a Lightning web component that uses @wire in an Apex controller to retrieve contact records. Display the contact records in a lightning-datatable.

1.1: Create an Apex controller that retrieves a list of contacts:

● Class: ContactController
● Method: getContacts()
● Fields to query: FirstName, LastName, Email

1.2 : Create a Lightning web component that displays contacts in a table:

● Component name: contactList
● Base component: lightning-datatable
● Fields to include: FirstName, LastName, Email

1.3: Wire the getContacts() method

1.4: Add the component to a new App page

## Tasks assosiated with the user story

The user story can be divided into the following tasks and subtasks.

**TASKS**:
1. Creation of the Apex controller class for the retrieval of the contact information.<br/>
   _Subtasks_

   - [x] Create Apex class `ContactController`.
   - [x] Create Apex test class `ContactControllerTest`.
   - [] Create function `getContacts()` which would return a list of queried contacts with relevant fields(FirstName, LastName, Email).
   - [] Apex test class to validate the functionality.
   - [] _Optional_ Function `getContacts()` takes parameters for pagination.
   - [] _Optional_ Function `getContacts()` takes parameters for search filtering.

2. Creation of the `contactList` lightning web component.<br/>
   _Subtasks_

   - [] Create the LWC component `contactList`.
   - [] Wire the `getContacts()` function to retrieve the list of contacts to display.
   - [] Use lightning-datatable component to display the list of queried contacts.
   - [] _Optional_ : Sort records by any column in the list.
   - [] _Optional_ : Add Pagination to the list.
   - [] _Optional_ : Search filter based on one of the three fields.

3. Creation of a App Page<br/>
   _Subtasks_

   - [] Create an App page.
   - [] Add the LWC component `contactList` to the flexi page.