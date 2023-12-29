export function addToCart(item) {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/cart',{
       method:'POST',
       body:JSON.stringify(item),
       headers:{'content-type':'application/json'}
     })
     const data = await response.json()
     // TODO :on server It will return only dome info of user (not password ) 
     resolve({data})
  });
  }


  export function fetchItemsByUserId(userId) {
    return new Promise( async (resolve) =>{
      // TODO
     const response = await fetch('http://localhost:8080/cart?user='+userId)
     const data = await response.json()
     resolve({data})
  }
    );
  }

  export function updateCart(update) {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/cart/' +update.id,{
       method:'PATCH',
       body:JSON.stringify(update),
       headers:{'content-type':'application/json'}
     })


     const data = await response.json()
     // TODO :on server It will return only dome info of user (not password ) 
     resolve({data})
  });
  }


  export function deleteItemFromCart(itemId) {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/cart/' +itemId ,{
       method:'DELETE',
       headers:{'content-type':'application/json'}
     })
     const data = await response.json()
     console.log(data,"From Remove from Cart ")
     // TODO :on server It will return only dome info of user (not password ) 
     resolve({data:{id:itemId}});
  });
  }


  export  function resetCart(userId) {
    //get all the items of userId and then delete each Item
    return new Promise( async (resolve) =>{

    const response =await fetchItemsByUserId(userId)
   const items = response.data;
   for(let item of items){
    await deleteItemFromCart(item.id)
   }
   resolve({status:'Success'})
  })
}