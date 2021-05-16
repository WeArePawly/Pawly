import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function DashboardVendor(props) {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('')

  const [business_name, setBusinessName] = useState('');
  const [street, setStreet] = useState('');
  const [house_number, setHouseNumber] = useState('');
  const [additional_address_info, setAdditionalAddressInfo] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [business_type, setBusinessType] = useState('');

  useEffect(() => {
    getData();
  });

  const getData = () => {
    axios.get(`/api/owners/${props.user._id}`)
      .then(response => {
        console.log(response)
        setMessage(response.data.message);
        setEmail(response.data.contact.email);
        setFirstName(response.data.full_name.first_name);
        setLastName(response.data.full_name.last_name);
        setUsername(response.data.username);
        setBusinessName(response.data.vendor_id.business_name)
        setStreet(response.data.vendor_id.address.street)
        setHouseNumber(response.data.vendor_id.address.house_number)
        setAdditionalAddressInfo(response.data.vendor_id.address.additional_info)
        setPostalCode(response.data.vendor_id.address.postal_code)
        setCity(response.data.vendor_id.address.city)
        setBusinessType(response.data.vendor_id.business_type)
      })
      .catch(err => {
        console.log(err);
        // if (err.response.status === 404) {
        //   this.setState({
        //     message: 'Not found'
        //   })
        // }
      })
  }
  return (
    <div>
      this is the vendor dashboard
    </div>
  )
}