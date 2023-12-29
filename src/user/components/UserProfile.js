import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPincodeAsync, selectUserInfo, selectUserProfile, selectUserpincode, updateProfileAsync } from '../UserSlice';
import { selectLoggedInUser, updateUserAsync } from '../../Auth/AuthSlice';
import { useForm } from 'react-hook-form';


import './AvatarSquare.css'
import UserChart from './UserChart';

export function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo)
  console.log(user,"from userProfilesss")
  const pincode = useSelector(selectUserpincode)
  console.log(pincode,"All Details of Pincode ")
  const [pincodes, setPincode] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  console.log(user.addresses[0],"from user INfo")
  const userProfile = useSelector(selectLoggedInUser)
  console.log(userProfile,"hsdj ")
  const temp =[user]
  console.log(temp,"from selectLoggedInUser")
  const swaan = useSelector(selectUserProfile)
  

  const { register,reset, handleSubmit, setValue, formState: { errors } } = useForm();
  const[selectedEditIndex,  setSelectedEditIndex]=useState(-1)
  const[selectedProfile,setSelectedProfile] = useState(-1)
  const[showAddAddressForm,setShowAddAddressForm]=useState(false)


  const handleEdit = (addressupdate,index) =>{
    //  In addressupdate I am geting the whole object or current state .
    const newUser = {...user ,addresses:[...user.addresses]};
    newUser.addresses.splice(index,1,addressupdate);
    console.log(newUser,"update from updateUserAsync")
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(-1)
    setValue('name')
  }

  const handleRemove = (e,index) =>{
    const newUser = {...user ,addresses: [...user.addresses]}
    newUser.addresses.splice(index,1);
    dispatch(updateUserAsync(newUser))
  }

  const handleEditForm = (index) =>{
    setSelectedEditIndex(index);
    const address = user.addresses[index]
    console.log(address,"from address")
    setValue('name',address.name)
    setValue('email',address.email)
    setValue('city',address.city)
    setValue('state',address.state)
    setValue('pinCode',address.pinCode)
    setValue('phone',address.phone)
    setValue('street',address.street)
  }

  

  const handleAdd =(address,pinCode) =>{
    const newUser = {...user ,addresses:[...user.addresses,address]};
    dispatch(updateUserAsync(newUser))
    dispatch(fetchPincodeAsync({ pincode: pinCode }));
    setShowAddAddressForm(false)
  }

  const handleEditProfile = (index, userId) => {
    setSelectedProfile(index);
    console.log(temp,"from temp")
    const newUser = temp[index];
    const name = newUser.name;
    const image = newUser.image;
    console.log(image, "dighj");
    setValue('name', name);
    setValue('image',image)
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.onload = (data) => {
        setImgUrl(data.target.result);
      };
      fileReader.readAsDataURL(file);
      setValue('image', file);
    } else {
      setImgUrl('');
      setValue('image', null); 
    }
  };

  const fileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      if (file instanceof Blob || file instanceof File) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } else {
        resolve('');
      }
    });
  };
  
  const handleEditsProfile = async (flag, index,e) => {
    const shubh = await temp[0].id;
    setSelectedProfile(-1);
    dispatch(updateProfileAsync({ id: flag, shubh }));
  };

  return (
    <div>
        <div>
          <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <h1 className="text-4xl  my-12 font-bold tracking-tight text-gray-900">
                  <div className="avatar-square">
        <div className="avatar-wrapper">
        <img className="avatar" src={swaan && swaan.length !== 0 ? (swaan?.image || "default-image-url") : (temp && temp.length !== 0 ? (temp[0]?.image || "default-image-url") : "default-image-url")} alt="User Avatar" />

        {/* <img className="avatar" src={temp[0]?.image} alt="User Avatar" /> */}
      </div>
    </div>
    {console.log(swaan,"swaan")}
    {/* Name: {swaan.name ? swaan.name : "New user"} */}

    {/* Name: {temp && temp[0] && temp[0].name ? temp[0].name : "New user"} */}

    {/* Name: {swaan && swaan.length !== 0 ? (swaan?.name || "New user") : (temp && temp[0] && temp[0].name || "New user")} */}
    Name: {
  swaan && swaan.length !== 0 
    ? (swaan?.name || "New user") 
    : (temp && temp[0] && temp[0].name) 
      ? temp[0].name 
      : "New user"
}

</h1>

            <h3 className="text-4xl  my-12 font-bold tracking-tight text-red-900">
              {console.log(user?.email,"email")}
             Email Address :{user?.email} <br/>
             user id : {user?.id}
            </h3>
            
           { user?.role ==='admin' &&
           (
           <h3 className="text-4xl  my-12 font-bold tracking-tight text-red-900">
           Role : {user?.role}
          </h3> 
          )} 

<div style={{ display: 'flex', justifyContent: 'space-between' }}>

  <button
    onClick={(e) => {
      setShowAddAddressForm(true);
      setSelectedEditIndex(-1);
    }}
    type="submit"
    className="rounded-md bg-green-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Add New Address
  </button>
</div>


       
  {/* <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
  <button
    type="submit"
    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
  >
    Edit Profile
  </button>
</div>



            <button
            onClick={(e) => {
              setShowAddAddressForm(true);
              setSelectedEditIndex(-1);
            }}
            type="submit"
            className="rounded-md my-5 bg-green-600 px-3 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add New Address
          </button> */}
          {showAddAddressForm ? (
            <form
              className="bg-white px-5 py-12 mt-12"
              noValidate
              // onSubmit={handleSubmit((data) => {
              //   console.log(data,"data");
              //   handleAdd(data,);
              //   reset();
              // })}
              onSubmit={handleSubmit((data) => {
                console.log(data, "datass");
                const { pinCode } = data; // Destructure pinCode from data
                if (pinCode) {
                  console.log(pinCode,"pincode")
                  handleAdd(data, pinCode);
                  reset();
                } else {
                  // Handle the case where pinCode is undefined or not present in data
                  console.error("PinCode is undefined or not present in data");
                }
              })}
              
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('name', {
                            required: 'name is required',
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email', {
                            required: 'email is required',
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register('phone', {
                            required: 'phone is required',
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('street', {
                            required: 'street is required',
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('city', {
                            required: 'city is required',
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('state', {
                            required: 'state is required',
                          })}
                          id="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register('pinCode', {
                            required: 'pinCode is required',
                          })}
                          id="pinCode"
                          onChange={(e) => setPincode(e.target.value)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>

                
              </div>
            </form>
          ) : null}

            
                  <p className="mt-0.5 text-sm text-gray-500">
                      Your Addresses :
                  </p>


                  
                  {user.addresses.map((address,index)=>
                <div>
                 { selectedEditIndex === index ?
                   <form className="bg-white px-5  py-12 mt-12" 
                  noValidate
                  onSubmit={handleSubmit((data)=>{
                  console.log(data,"update from to check what i am getting")
                  handleEdit(data,index)
                  reset();
                  })}

                  >
                    
                  <div className="space-y-12">

                  <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                  <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Full name
                  </label>
                  <div className="mt-2">
                  <input
                  type="text"
                  {...register('name',{required:'name is required '})}
             
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  </div>


                  <div className="sm:col-span-4">
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                  </label>
                  <div className="mt-2">
                  <input
                  id="email"
                  {...register('email',{required:'email is required '})}
                 
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  </div>

                  <div className="sm:col-span-3">
                  <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                  Country
                  </label>
                  <div className="mt-2">
                  <select
                  id="country"
                  {...register('country',{required:'country is required '})}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                  >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                  </select>
                  </div>
                  </div>

                  <div className="sm:col-span-3">
                  <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                  Phone Number
                  </label>
                  <div className="mt-2">
                  <input
                  id="phone"
                  {...register('phone',{required:'phone is required '})}
                

                  type="tel"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  </div>

                  <div className="col-span-full">
                  <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                  Street address
                  </label>
                  <div className="mt-2">
                  <input
                  type="text"
                  {...register('street',{required:'street is required '})}
                 
                  id="street-address"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                  <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                  City
                  </label>
                  <div className="mt-2">
                  <input
                  type="text"
                  {...register('city',{required:'city is required '})}
                 
                  id="city"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  </div>

                  <div className="sm:col-span-2">
                  <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                  State / Province
                  </label>
                  <div className="mt-2">
                  <input
                  type="text"
                  {...register('state',{required:'state is required '})}
                  
                  id="state"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  </div>

                  <div className="sm:col-span-2">
                  <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                  ZIP / Postal code
                  </label>
                  <div className="mt-2">
                  <input
                  type="text"
                  {...register('pinCode',{required:'pinCode is required '})}
                  
                  id="pinCode"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  </div>
                  </div>
                  </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                  onClick={e=>setSelectedEditIndex(-1)}
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Cancel
                  </button>
                  <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                  Edit  Address
                  </button>
                  </div>
                  </div>
                  </form> 
                  
                 :null }


{index === 0 && temp.map((newUser, index) => (
  <div key={index}>
    {console.log(selectedProfile, "profile")}
    {selectedProfile === index ? (
      <form
        className="bg-white px-5 py-12 mt-12"
        noValidate
        onSubmit={handleSubmit(async(data) => {
          console.log(data, "from checkout");
          const imageFile = data.image[0]; // Assuming it's a single file
          const imageDataURL = await fileToDataURL(imageFile);
        
          // Destructure the rest of the data
          const { name } = data;
          handleEditsProfile({ name, image: imageDataURL }, index);
          console.log(data, "ssss");
          reset();
        })}
      >
        <div className="sm:col-span-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Full name
          </label>
          <div className="mt-2">
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              id="name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-2">
          <input
            id="image"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            {...register('image')}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </form>
    ) : null}
  </div>
))}















                   <div
                      className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray">
                      <div className="flex min-w-0 gap-x-4">
                      <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">Name: {address.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Street : {address.street}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">Pincode :{address.pinCode}</p>
                      </div>
                      </div>

                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">Phone: {address.phone}</p>
                      <p className="text-sm leading-6 text-gray-500">City: {address.city}</p>
                      </div>
                      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
             
                {/* EDIT BUTTON FOR EDITING THE ADDRESS */}
              <button
                  onClick={e=>handleEditForm(index)}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                  Edit                  
              </button>

                {/* REMOVE BUTTON FOR REMOVING THE ADDRESS */}

                <button
                  onClick={e=>handleRemove(e,index)}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                  Remove
                  </button>

                {/* EDIT PROFILE BUTTON FOR EDITING THE USERNAME  */}

                {index === 0 && (
      <div>
        <button
          onClick={() => handleEditProfile(index)}
          type="button"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Edit Profile
        </button>
      </div>
    )}


                      </div>
                    </div> 
                    {/* <div>
<button
onClick={e=>handleEditProfile(index)}
type="button"
className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
Edit Profile
</button>
</div> */}
  
  </div>

             


                    )}

{console.log(temp,"temp")}

              </div>
          </div>
        </div>
      
        { user?.role ==='admin' &&
           (
        <div>
          <h1>hello world</h1>
   
    <UserChart  />
        </div>
          )} 

    </div>
  );
}



// {temp.map((item,index)=><div>
//   {selectedEditIndex===index ? 
//      <form className="bg-white px-5  py-12 mt-12" 
//      noValidate
//      onSubmit={handleSubmit((data)=>{
//      console.log(data,"from checkout")
//      handleEditsProfile(data,index)
//      reset();
//      })}
  
//      >
  
//   </form> : null }
//                   </div>
//                   )}