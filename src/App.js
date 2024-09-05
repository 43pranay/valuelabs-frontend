import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink, Spinner, Table } from 'reactstrap';

function App() {

  const[products, setProducts] = useState([])
  const[page, setPage] = useState(1)
  const[isLoader, setLoader] = useState(true)

  useEffect(() => {
    async function fetchData() {
      console.log(page, 'page');
      
      try {
        setLoader(true)
        const skip = (page - 1) * 10
        const getProduct = await axios.get(`https://dummyjson.com/products?page=${page}&skip=${skip}`)
        console.log('data fetched', getProduct);
        setProducts(getProduct?.data?.products	)
        setLoader(false)
      } catch (error) {
          console.log(error, 'Error fetching');
          
      }
      
      // ...
    }
    fetchData();
  }, [page]);

  const handlePaginate = (value) => {
    if (value == 'next') {
      setPage(page + 1)
    } else {
      setPage(page - 1)
    }
  }

console.log(products, 'products');


  return (
   <>
    <Table
>
  <thead>
    <tr>
      <th>
      Product Name
      </th>
      <th>
      Description
      </th>
      <th>
      Image
      </th>
    </tr>
  </thead>
  <tbody>
   { !isLoader && products.map((val, index) => {
    return (
      <tr key={index}>
      <th scope="row">
      {val.title}
      </th>
      <td>
      {val.description	}
      </td>
      <td>
        <img src={val?.images[0]} alt='Product' height={50} width={50} />
      </td>
    </tr>
    )
   }) }
   {isLoader && <Spinner>
  Loading...
</Spinner>}
  </tbody>
</Table>
<Pagination
  aria-label="Page navigation example"
  size="lg"
>
  <PaginationItem>
    <PaginationLink
      first
      href="#"
    >
      First
    </PaginationLink>
  </PaginationItem>
  <PaginationItem onClick={() => handlePaginate('previous')}>
    <PaginationLink
      href="#"
      previous
    >
      Previous
    </PaginationLink>
  </PaginationItem>

  <PaginationItem onClick={() => handlePaginate('next')}>
    <PaginationLink
      
      next
    >
      Next
    </PaginationLink>
  </PaginationItem>

</Pagination>
   </>
  );
}

export default App;
