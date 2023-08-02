import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';

import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';

const COLUMNS = [
    {
        label: 'First Name',
        fieldName: FIRSTNAME_FIELD.fieldApiName,
        type: 'text',
        cellAttributes: { alignment: 'left' }
    },
    {
        label: 'Last Name',
        fieldName: LASTNAME_FIELD.fieldApiName,
        type: 'text',
        cellAttributes: { alignment: 'left' }
    },
    { 
        label: 'Email', 
        fieldName: EMAIL_FIELD.fieldApiName, 
        type: 'email' ,
        cellAttributes: { alignment: 'left' }
    }
];

export default class ContactList extends LightningElement {
    contacts;
    error;
    columns = COLUMNS;
    @wire(getContacts)
    wiredContactList({ error, data }) {
    if (data) {
                console.log('data: ', data);
                this.contacts = data;
                console.log('this.contacts: ', this.contacts);
            } else if (error) { 
            console.log('error ', error);
                this.error = error; 
            console.log('this.error: ', this.error); 
            this.contacts = undefined;
                console.log('this.contacts : ', this.contacts);
            }
        }
}