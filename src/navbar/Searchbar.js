
import React, { useState } from 'react';
import { useDispatch  } from 'react-redux';
import { searchProductsAsync } from '../app/Product-List/ProductListSlice';
import { Link } from 'react-router-dom';

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();


  function capitalizeWords(str) {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchTermLower = searchTerm.trim().toLocaleLowerCase();
    console.log(searchTermLower,"searchTermLower ")
    if (searchTermLower) {
      try {
        const words = searchTermLower.split(' ');
        // Initialize an array to store the results
        let combinedResults = [];
        // Iterate through each word in the search term
        for (const word of words) {
          let query = "category";
          let queryString = `?${query}=${word}`;
          const response = await dispatch(searchProductsAsync(queryString));
          combinedResults = combinedResults.concat(response.payload);
          // If no results found for the current word, try searching by brand
          if (response.payload.length === 0) {
            query = "brand";
            queryString = `?${query}=${capitalizeWords(word)}`;
            console.log(queryString,"queryString")
            const brandResponse = await dispatch(searchProductsAsync(queryString));
            combinedResults = combinedResults.concat(brandResponse.payload);
          }
          if (response.payload.length === 0) {
            query = "description";
            queryString = `?${query}=${capitalizeWords(word)}`;
            console.log(queryString,"title")
            const brandResponse = await dispatch(searchProductsAsync(queryString));
            combinedResults = combinedResults.concat(brandResponse.payload);
            // console.log(combinedResults)
          }
        }
        setSearchResults(combinedResults);
      } catch (error) {
        console.error('Error searching products:', error);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        <h3>Search Results:</h3>
        {console.log(searchResults,"searchResults")}
        {searchResults.map((result) => (
          <div key={result.id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px', borderRadius: '5px' }}>
            <div> 
            <Link to={`/ProductDetail/${result.id}`}  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500" >
            <button> Details </button>
            </Link>
            </div>
            <h4>{result.title}</h4>
            <p>Price: {result.price}</p>
            <img src={result.thumbnail} alt={result.title} style={{ maxWidth: '100%', maxHeight: '200px', marginBottom: '10px' }} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Searchbar;

 
//     function capitalizeWords(str) {
//         return str
//           .split(' ')
//           .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//           .join(' ');
//       }

//     const handleSearch = async (e) => {
//         e.preventDefault();
//         const searchTermLower = searchTerm.trim().toLocaleLowerCase();
//         if (searchTermLower) {
//           try {
//             let query = "category";
//             let queryString = `?${query}=${searchTermLower}`;
//             console.log(setSearchResults,"21354")
//             const response = await dispatch(searchProductsAsync(queryString));
//             setSearchResults(response.payload);
//             console.log(response.payload,"hhi")
//             if(response.payload.length === 0 ){
//                 console.log("object")
//                 query = "brand";
//                 queryString = `?${query}=${capitalizeWords(searchTermLower)}`;
//                 const response = await dispatch(searchProductsAsync(queryString));
//             setSearchResults(response.payload);
//             }  
//           } 
//           catch (error) {
//             console.error('Error searching products:', error);
//           }
//         }
//       };
      






//   function capitalizeWords(str) {
//     return str
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ');
//   }

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     const searchTermLower = searchTerm.trim().toLocaleLowerCase();

//     if (searchTermLower) {
//       try {
//         let query = "category";
//         let queryString = `?${query}=${searchTermLower}`;
//         console.log(queryString,"queryString")
//         const response = await dispatch(searchProductsAsync(queryString));
//         setSearchResults(response.payload);
//         if (response.payload.length === 0) {
//           query = "brand";
//           queryString = `?${query}=${capitalizeWords(searchTermLower)}`;
//           console.log(queryString,"queryStringrand")
//           const brandResponse = await dispatch(searchProductsAsync(queryString));
//           setSearchResults(brandResponse.payload);
//         }
//       } catch (error) {
//         console.error('Error searching products:', error);
//       }
//     }
//   };


   // const handleSearch = async (e) => {
    //     e.preventDefault();
    //     if (searchTerm.trim().toLocaleUpperCase()) {
    //       try {
    //         const response = await dispatch(searchProductsAsync(searchTerm.trim().toLocaleLowerCase()));
    //         const abhinandan = await dispatch(searchProductssAsync(searchTerm.trim().toLocaleLowerCase()))
    //         console.log(abhinandan,"abhinandan")
    //         setSearchResults(response.payload);
    //         setSearchResults(abhinandan.payload)
    //       } catch (error) {
    //         console.error('Error searching products:', error);
    //       }
    //     }
    //   };