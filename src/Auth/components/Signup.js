import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser,createUserAsync } from "../AuthSlice";
import { Navigate } from "react-router-dom";



function Signup() {
  const dispatch = useDispatch();
  const { register, handleSubmit,  formState: { errors } } = useForm();
  const user = useSelector(selectLoggedInUser)
  console.log(user,"from Signup ")
  console.log(errors,"errors")
  const[value,setValue] = useState([])
  const[imgUrl,setImgUrl] = useState('')


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader()
    fileReader.onload = (data)=>{
      setImgUrl(data.target.result)
    }
    fileReader.readAsDataURL(file)
    setValue('image', file);
  };
  
    return (
        <>
        {/* {user?.email} */}
        {console.log(user," checking")}
        {user && <Navigate to='/' replace={true}></Navigate>}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />

          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create a New Account 
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <form  noValidate className="space-y-6"
           onSubmit={handleSubmit((data)=>{
            dispatch(createUserAsync({email:data.email,password:data.password,addresses:[],name:data.name,image:data.image,
            role:'user',
            }))
            console.log(data,"data from user")
          })}> */}

<form
  noValidate
  className="space-y-6"
  onSubmit={handleSubmit((data) => {
    dispatch(
      createUserAsync({
        email: data.email,
        password: data.password,
        addresses: [],
        name: data.name,
        image: imgUrl,
        role: 'user',
      }),
    );
  })}
  
  encType="multipart/form-data"
>
<div>
              <div className="flex items-center justify-between">
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name 
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="name"
                  {...register("name", 
                  { required: "name is Required " ,
                  validate: (value, formValues) => value === formValues.name || " Please type your name  "
                })}
                  type="text"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: "email is required " , pattern:{
                  value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                  message:'email not valid ' 
                }})}
                  type="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
             {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", { required: "password is required " ,
                  pattern:{
                    value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    message:`- at least 8 characters\n
                    - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                    - Can contain special characters             
                    `
                 
                  },
                })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
               {errors.password &&<p className='text-red-500'>{errors.password.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="Confirmpassword"
                  {...register("Confirmpassword", 
                  { required: "Confirmpassword is Required " ,
                  validate: (value, formValues) => value === formValues.password || "password Not matching "
                })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                {errors.Confirmpassword && <p className='text-red-500'>{errors.Confirmpassword.message}</p>}
              </div>
            </div>

        <div>
        <div className="flex items-center justify-between mt-4">
          <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
            Upload Image
          </label>
        </div>
        <div className="mt-2">
          <input
            id="image"
            {...register('image', { required: 'Image is required' })}
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
          {errors?.image && <p className="text-red-500">{errors?.image.message}</p>}
        </div>
           </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a Member ?{' '}
            <Link to="/Login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Go to Login Form
            </Link>
          </p>
        </div>
      </div>
        </>
    );
}

export default Signup;

