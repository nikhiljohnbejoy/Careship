/*
*********************************************************
Apex Class Name    : ContactController
Created Date       : August 02, 2023
@description       : This is class is used as a controller for providing the list of contacts.
@author            : Nikhil John Bejoy
Modification Log:
Ver   Date         Author                               Modification
1.0   02-08-2023   Nikhil John Bejoy                    Initial Version
*********************************************************
*/
public with sharing class ContactController {

    /*
    *********************************************************
    @Method Name    : getContacts
    @author         : Nikhil John Bejoy
    @description    : Method to query the list of contacts
    @param          :
    @return         : List<Contact>
    ********************************************************
    */
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String field, String sortOrder, Integer queryLimit, Integer queryOffset){
        try {
            String query = 'SELECT Id, FirstName, LastName, Email FROM Contact WITH SECURITY_ENFORCED';
            if(field != null && sortOrder !=null){
                query += ' ORDER BY '+field+' '+sortOrder;
            }
            if(queryLimit !=null && queryOffset!=null){
                query +=' limit :queryLimit offset :queryOffset';
            }
            return Database.query(String.escapeSingleQuotes(query));
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}