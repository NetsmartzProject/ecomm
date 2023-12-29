

export function fetchLoggedInUserOrders(userId) {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/orders/?user.id='+userId)
     const data = await response.json()
     resolve({data})
    }
    );
  }

  export function fetchLoggedInUser(userId) {
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/users/'+userId)
     const data = await response.json()
     resolve({data})
    }
    );
  }


  export function updateUser(update) {
    console.log(update,"update")
    return new Promise( async (resolve) =>{
     const response = await fetch('http://localhost:8080/users/'+update.id,{
       method:'PATCH',
       body:JSON.stringify(update),
       headers:{'content-type':'application/json'}
     })
     const data = await response.json()
     // TODO :on server It will return only dome info of user (not password ) 
     resolve({data})
  });
  }

// Update the fetch URL to use email instead of id
// api.js

// Update the fetch URL to use email instead of id
export function updateProfile(updates,userid) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/'+userid, {
      method: 'PATCH',
      body: JSON.stringify(updates),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    resolve({ data });
  });
}



export function fetchPincode(pincode) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      
      if (!response.ok) {
        // Check for non-2xx status codes and handle accordingly
        const errorData = await response.json();
        reject(new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error}`));
        return;
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      // Handle any other errors that may occur
      reject(error);
    }
  });
}

export function fetchTotalOrders() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:8080/orders');

      if (!response.ok) {
        const errorData = await response.json();
        reject(new Error(`HTTP error! Status: ${response.status}, Message: ${errorData.error}`));
        return;
      }

      const data = await response.json();
      resolve({ data });
    } catch (error) {
      reject(error);
    }
  });
}




