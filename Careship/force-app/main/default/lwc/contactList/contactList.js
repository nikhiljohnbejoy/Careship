import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import { NavigationMixin } from "lightning/navigation";

import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
import EMAIL_FIELD from '@salesforce/schema/Contact.Email';
const button = [
    { label: 'Show details', name: 'show_details' }
];
const COLUMNS = [
    {
        label: 'First Name',
        fieldName: FIRSTNAME_FIELD.fieldApiName,
        type: 'text',
        sortable: true,
        cellAttributes: { alignment: 'left' }
    },
    {
        label: 'Last Name',
        fieldName: LASTNAME_FIELD.fieldApiName,
        type: 'text',
        sortable: true,
        cellAttributes: { alignment: 'left' }
    },
    {
        label: 'Email',
        fieldName: EMAIL_FIELD.fieldApiName,
        type: 'email',
        sortable: true,
        cellAttributes: { alignment: 'left' }
    },
    {
        label: 'Navigation', type: 'button', typeAttributes: {
            label: 'Show details', name: 'show_details'
        }
    }
];

export default class ContactList extends NavigationMixin(
    LightningElement
) {

    queryParam;
    contacts = [];
    error;

    columns = COLUMNS;
    tableElement;

    sortBy = FIRSTNAME_FIELD.fieldApiName;
    sortDirection = "asc";
    limit = 20;
    offset = 0;

    hasMoreRecords = true;

    searchLabel = "Press enter to search on name and email";
    searchParam = "";

    @wire(getContacts, {
        field: "$sortBy",
        sortOrder: "$sortDirection",
        queryLimit: "$limit",
        queryOffset: "$offset",
        searchParam: "$searchParam"
    })
    wiredContactList({ error, data }) {
        if (data) {
            if (data.length !== 0) {
                this.contacts = this.contacts.concat(data);
                this.hasMoreRecords = true;
            }
            else {
                this.hasMoreRecords = false;
            }
            this.error = undefined;
            if (this.tableElement) {
                this.tableElement.isLoading = false;
            }
        } else if (error) {
            console.log('error ', error);
            this.error = error;
            console.log('this.error: ', this.error);
            this.contacts = undefined;
            console.log('this.contacts : ', this.contacts);
        }
    }
    doSorting(event) {
        this.contacts = [];
        this.offset = 0;
        this.sortBy = event.detail.fieldName;
        this.sortDirection = event.detail.sortDirection;
        //prevent calling loadMoreData after a sorting
        this.hasMoreRecords = false;
    }

    loadMoreData(event) {
        console.log('Load more JS made');
        this.offset += this.limit;
        console.log(this.offset);
        //Display a spinner to signal that data is being loaded
        if (event.target) {
            event.target.isLoading = true;
        }
        this.tableElement = event.target;
    }
    handleRowAction(event) {
        const action = event.detail.action;
        const row = event.detail.row;
        switch (action.name) {
            case 'show_details':
                alert('Showing Details: ' + JSON.stringify(row));
                this[NavigationMixin.Navigate]({
                    type: "standard__recordPage",
                    attributes: {
                        objectApiName: "Contact",
                        actionName: "view",
                        recordId: row.Id
                    }
                });
                break;
        }
    }

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey && this.searchParam != evt.target.value) {
            alert('Query for' + evt.target.value);
            this.contacts = [];
            this.searchParam = evt.target.value;
            this.offset = 0;
            this.hasMoreRecords = false;
        }
    }
    get currentInformation() {
        let additional = this.hasMoreRecords ? `Scroll for more records` : `No more records available`;
        return `Displaying ${this.contacts.length} records. ` + additional;
    }
}