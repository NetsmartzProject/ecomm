import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectOrders, selectUserInfo,  } from '../UserSlice';
// import { selectLoggedInUser } from '../../Auth/AuthSlice';
import { discountedPrice } from '../../app/Constant';
import { updateOrderAsync } from '../../Order/orderSlice';




export function UserOrders() {
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo)
    const orders =useSelector(selectOrders)
    const flag=[orders]
    console.log(flag,"flag from cahart")

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync(user?.id))
    }, [dispatch, user?.id])

    const handleChanges = (e) =>{
        const updatedOrder = {status:e.target.value ='cancel'}
        console.log({status:e.target.value ='cancel'},"updatedOrderers")
        dispatch(updateOrderAsync(updatedOrder))
        // setEditableOrderId(-1)
        // console.log(orders[0].status,"status")
    }

    return (
        <div>
        {orders.map((order) => (
            <div>
                <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <h1 className="text-4xl  my-12 font-bold tracking-tight text-gray-900">
                     {console.log(order,"sssssss")}
                      Order # {order?.id}
                        </h1>
                        <h5 className="text-4xl  my-12 font-bold tracking-tight text-red-900">
                      Order Status: {order?.status}
                      {console.log(order?.status ,"hiiii")}
                        </h5>

                        <div className="flow-root">
                            <ul  className="-my-6 divide-y divide-gray-200">
                                {order.items.map((item) => (
                                    <li key={order.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>

                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <a href={item.href}>{item.title}</a>
                                                    </h3>
                                                    <p className="ml-4">${discountedPrice(item)}</p>
                                                </div>
                                                <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                            </div>
                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                <div className="text-gray-500">

                                                    <label htmlFor="Quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                                        QTy :{item.quantity}
                                                    </label>
                                                    
                                                   </div>

                                                <div className="flex">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

<div>
    <button onClick={handleChanges}>
        CANCEL 
    </button>
</div>


                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p> $ {order.totalAmount}</p>
                        </div>

                        <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                            <p>Total Items in a Cart </p>
                            <p>{order.totalItems} Items </p>
                        </div>

                        <p className="mt-0.5 text-sm text-gray-500">
                            This         the Shipping Address :
                        </p>
                        <div
            className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray">
              <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900">Name: {order.selectedAddresss?.name}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">Street : {order.selectedAddresss?.street}</p>
              <p className="mt-1 truncate text-xs leading-5 text-gray-500">Pincode :{order.selectedAddresss?.pincode}</p>
            </div>
          </div>

          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900">Phone: {order.selectedAddresss?.phone}</p>
            <p className="text-sm leading-6 text-gray-500">City: {order.selectedAddresss?.city}</p>
        </div>
        </div>
</div>
</div>
            </div>
            ))}
        </div>
    );
}
