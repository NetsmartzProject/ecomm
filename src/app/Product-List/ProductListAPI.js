// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  return new Promise(async (resolve) => {
    // TODO
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({ data })
  }
  );
}


export function fetchProducts() {
  return new Promise(async (resolve) => {
    // TODO
    const response = await fetch('http://localhost:8080/products')
    const data = await response.json()
    resolve({ data })
  }
  );
}










export function fetchProductById(id) {
  return new Promise(async (resolve) => {
    // TODO
    const response = await fetch('http://localhost:8080/products/' + id)
    const data = await response.json()
    resolve({ data })
  }
  );
}

export function createProduct(product) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/', {
      method: 'POST',
      body: JSON.stringify(product),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json()
    resolve({ data })
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/products/' + update.id, {
      method: 'PATCH',
      body: JSON.stringify(update),
      headers: { 'content-type': 'application/json' }
    })
    const data = await response.json()
    // TODO :on server It will return only dome info of user (not password ) 
    resolve({ data })
  });
}



export function fetchAllProductsByFilters(filter, sort, pagination) {
  //befor 1st time filter ={"category":"smartphone"} This is how we assume 
  //befor 2nd time filter ={"category":["smartphone","laptop"]} This is how we assume 
  // sort = {_sort:"price",_order="desc"}
  //pagination = {_page:1, _limit=10}  ==_page=1&_limit=10
  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1]
      queryString += `${key}=${lastCategoryValue}&`
      console.log(lastCategoryValue, "lastCategoryValue")
    }
  }

  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`
  }

  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`
  }

  return new Promise(async (resolve) => {
    console.log("querystringproduct", queryString);
    // TODO
    const response = await fetch('http://localhost:8080/products?' + queryString);
    const data = await response.json()
    const totalItems = await response.headers.get('X-Total-Count')
    console.log("data", data);
    resolve({ data: { products: data, totalItems: +totalItems } })
  }
  );
}

export function fetchCategories() {
  return new Promise(async (resolve) => {
    // TODO
    const response = await fetch('http://localhost:8080/catgeories')
    console.log(response, "response")
    const data = await response.json()
    resolve({ data })
    console.log(data, "from categories")
  }
  );
}

export function fetchBrands() {
  return new Promise(async (resolve) => {
    // TODO
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json()
    resolve({ data })
    console.log(data, "brands")
  }
  );
}

export function searchProducts(querystring) {
  return new Promise(async (resolve,reject) => {
    try {
      const response = await fetch(`http://localhost:8080/products/${querystring}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}


