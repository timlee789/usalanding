import React,{Fragment, useState} from 'react';
//import data from '../data/mock-data.json';
import ReadOnlyRow from '../components/ReadOnlyRow';
import EditableRow from '../components/EditableRow';
import db from '../data/db';
import Contact from '../models/Contacts';
import axios, { Axios } from 'axios';

function index({data}) {
  const [ contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
            fullName: "",
            address: "",
            phoneNumber: "",
            email: "",
  });
  const [editFormData, setEditFormData ] = useState({
            fullName: "",
            address: "",
            phoneNumber: "",
            email: "",
  })
  const [editContactId, setEditContactId] = useState(null);
  const handleAddFormChange = (event) => {
            event.preventDefault();
            const fieldName = event.target.getAttribute("name");
            const fieldValue = event.target.value;
            const newFormData = { ...addFormData };
            newFormData[fieldName] = fieldValue;
            setAddFormData(newFormData);
  };
  const handleEditFormChange = (event) => {
            event.preventDefault();
            const fieldName = event.target.getAttribute("name");
            const fieldValue = event.target.value;
            const newFormData = { ...editFormData};
            newFormData[fieldName] = fieldValue;
            setEditFormData(newFormData)
  }
  const handleAddFormSubmit = async (event) => {
            event.preventDefault();
            const newContact = {

              fullName: addFormData.fullName,
              address: addFormData.address,
              phoneNumber: addFormData.phoneNumber,
              email: addFormData.email,
            };
            const {fullName, address, phoneNumber, email} = newContact;
            const newContacts = [...contacts, newContact];
            setContacts(newContacts)
            const response = await fetch('/api/dataInput', 
            {
              method: 'POST',
              body: JSON.stringify(
                {
                  fullName: addFormData.fullName,
                  address: addFormData.address,
                  phoneNumber: addFormData.phoneNumber,
                  email: addFormData.email,
                }
              ),
              headers: {
                'Content-type': 'application/json'
              }
            })
            const data = await response.json();
            console.log(data)
            // await axios.post('/api/dataInput', {
            // });
          }

  const handleEditFormSubmit = async(event) => {
            event.preventDefault();
            const editedContact = {
              id: editContactId,
              fullName: editFormData.fullName,
              address: editFormData.address,
              phoneNumber: editFormData.phoneNumber,
              email: editFormData.email,
            };
            
            const newContacts = [...contacts];
            const index = contacts.findIndex((contact) => contact.id === editContactId);
            newContacts[index] = editedContact;
            setContacts(newContacts);
            //const res = await axios.put('/api/update', editedContact
                  // id: editContactId,
                  // fullName: editFormData.fullName,
                  // address: editFormData.address,
                  // phoneNumber: editFormData.phoneNumber,
                  // email: editFormData.email,
            //).then ( function(response) {
             // console.log(response)
            //} )
            const response = fetch('./api/update', {
              method: 'PUT',
              body: JSON.stringify({
                id: editContactId,
                fullName: editFormData.fullName,
                // address: editFormData.address,
                // phoneNumber: editFormData.phoneNumber,
                // email: editFormData.email,
              }),
              headers: {
                'Content-type': 'application/json'
              }
            })
           
            //const data = await response.json()
            setEditContactId(null);
  }
  const handleEditClick = (event, contact) => {
            event.preventDefault();
            setEditContactId(contact._id);
            const formValues = {
              fullName: contact.fullName,
              address: contact.address,
              phoneNumber: contact.phoneNumber,
              email: contact.email,
            };
            setEditFormData(formValues)
  }
    const handleCancelClick = () => {
      setEditContactId(null);
    }
    const handleDeleteClick = async (contactId) => {
      
      const newContacts = [...contacts];
      const index = contacts.findIndex((contact) => contact._id === contactId);
      newContacts.splice(index, 1);
      setContacts(newContacts);
      const deleteData = await axios.delete('/api/delete',{params:{_id:contactId}})
      .then(function (response) {
        console.log(response)
      })
   }
  return (
    <div className='mt-4'>
      <form onSubmit={handleAddFormSubmit}>
        <input type="text" name="fullName" placeholder="Enter name" required='required' onChange={handleAddFormChange}/>
        <input type="text" name="address" placeholder="Enter address" onChange={handleAddFormChange}/>
        <input type="text" name="phoneNumber" placeholder="Enter Phone Number" onChange={handleAddFormChange}/>
        <input type="text" name="email" placeholder="Enter email" onChange={handleAddFormChange}/>
        <button type='submit'> Add </button>
      </form>
      <form onSubmit={handleEditFormSubmit}>
      <table>
        <thead>
          <tr>
            
            <th>name</th>
            <th>address</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {contacts.map((contact) => (
              <Fragment>
                {editContactId === contact._id ? (
                  <EditableRow 
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}/>
                ): (
                  <ReadOnlyRow 
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick} />
                )}
              </Fragment>
            ))}
        </tbody>
      </table>
      </form>
    </div>
  )
}

export async function getServerSideProps() {
  await db.connect();
  const contact = await Contact.find().lean();
  return {
    props: {
      data: contact.map(db.convertDocToObj),
    }
  }
}
export default index