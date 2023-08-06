/*
*********************************************************
Apex Class Name    : ContactControllerTest
Created Date       : August 06, 2023
@description       : This is class is used to test the controller for providing the list of contacts.
@author            : Nikhil John Bejoy
Modification Log:
Ver   Date         Author                               Modification
1.0   06-08-2023   Nikhil John Bejoy                    Initial Version
*********************************************************
*/
@isTest
public with sharing class ContactControllerTest {
    @TestSetup
    static void loadTestData() {
		List<Contact> contactList = Test.loadData(Contact.sObjectType, 'Careship_contacts');
		Assert.areEqual(contactList.size(), 150, 'The static resource has 150 entries');
    }
    
    @isTest
    static void performRetrieval() {
        List<Contact> contactList = ContactController.getContacts('FirstName', 'asc', 20, 0, '');
        Assert.areEqual(contactList.size(), 20, 'The function returned 20 records');
    }
    
    @isTest
    static void performRetrievalWithFilter() {
        List<Contact> contactList = ContactController.getContacts('FirstName', 'asc', 20, 10, '@example.com');
        Assert.areEqual(contactList.size(), 20, 'The function returned 20 records');
    }
    
    @isTest
    static void createExceptionScenario() {
         try{
    		List<Contact> contactList = ContactController.getContacts('FirstName', 'ascending', 20, 0, '');
		}catch (Exception e){
            Assert.isTrue(e instanceof AuraHandledException, 'An exception is thrown due to wrong sorting order');
        }
    }
}