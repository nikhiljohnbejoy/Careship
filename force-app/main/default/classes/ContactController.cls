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
    @param          : field: The field on which the sort is performed
    @param          : sortOrder: The field which defines the sort direction
    @param          : queryLimit: The limit value to apply to the query
    @param          : queryOffset: The offset to apply to the query
    @param          : searchParam: The value to search in the contacts
    @return         : List<Contact>
    ********************************************************
    */
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(String field, String sortOrder, Integer queryLimit, Integer queryOffset, String searchParam){
        try {
            String query = 'SELECT Id, FirstName, LastName, Email FROM Contact';
            if(String.isNotBlank(searchParam)){
                searchParam='\'%' + String.escapeSingleQuotes(searchParam) + '%\'';
                query +=' WHERE FirstName like '+searchParam+' OR LastName like '+searchParam+' OR Email like '+searchParam;
            }
            query+=' WITH SECURITY_ENFORCED';
            if(String.isNotBlank(field) && String.isNotBlank(sortOrder)){
                query += ' ORDER BY '+field+' '+sortOrder;
            }
            if(queryLimit !=null && queryOffset!=null){
                query +=' LIMIT :queryLimit OFFSET :queryOffset';
            }
            
            return Database.query(query);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}