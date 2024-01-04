/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ProductCard } from "../Products/ProductCard";

import Select from "react-select";
// icons
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  //   price
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchProducts();
    // console.log(products);
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, minPrice, maxPrice, searchQuery]);

  // Fetching Products
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      //   products [] array inside the object
      setProducts(data.products);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Products based on input
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Based on price range

    const minPriceValue = parseFloat(minPrice);
    const maxPriceValue = parseFloat(maxPrice);

    if (!isNaN(minPriceValue) && !isNaN(maxPriceValue)) {
      filtered = filtered.filter((product) => {
        const isMinPriceValid =
          isNaN(minPrice) || product.price >= minPriceValue;
        const isMaxPriceValid =
          isNaN(maxPrice) || product.price <= maxPriceValue;

        return isMinPriceValid && isMaxPriceValid;
      });
    }

    setFilteredProducts(filtered);
    console.log(filtered);
  };

  const selectOptions = [
    {
      value: "My Cart",
      label: (
        <span>
          My Cart <AiOutlineShoppingCart />
        </span>
      ),
    },
    {
      value: "Logout",
      label: (
        <span>
          Logout <IoLogOutOutline />
        </span>
      ),
    },
  ];

  // ----Return-----------

  return (
    <>
      <div className="home-container container mt-5 mb-5">
        <div className="home-header d-flex flex-row justify-content-between text-center container mb-5">
          <div className="">
            <h2 className="text-center ">
              Shop the Latest Trends and Essentials
            </h2>
          </div>
          <button className="btn">
            <CgDetailsMore />
          </button>
        </div>

        <div>
          {/* filter by NAME */}
          <input
            type="text"
            className="input-group "
            style={{
              width: "50%",
              margin: "auto",
              padding: "5px 10px",
              borderRadius: "20px",
              border: "1px solid black",
            }}
            name="search-product"
            value={searchQuery}
            placeholder="Search products by name"
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />

          <div className="mt-3 d-flex flex-row ">
            {/* filter by Price Min */}
            <input
              type="text"
              className="input-group "
              style={{
                width: "25%",
                margin: "auto",
                padding: "5px 10px",
                borderRadius: "20px",
                border: "1px solid black",
              }}
              name="min-price"
              value={minPrice}
              placeholder="enter min price"
              onChange={(e) => {
                setMinPrice(e.target.value);
                console.log(minPrice);
              }}
            />
            {/* filter by Price Max */}
            <input
              type="text"
              className="input-group "
              style={{
                width: "25%",
                margin: "auto",
                padding: "5px 10px",
                borderRadius: "20px",
                border: "1px solid black",
              }}
              name="max-price"
              value={maxPrice}
              placeholder="enter max price"
              onChange={(e) => {
                setMaxPrice(e.target.value);
                console.log(maxPrice);
              }}
            />
          </div>
        </div>

        <div className="product-list d-flex flex-wrap justify-content-around">
          {loading ? (
            <div>Loading</div>
          ) : filteredProducts.length === 0 ? (
            <p>No matching products found.</p>
          ) : (
            <div className="d-flex justify-content-around flex-wrap m-5 p-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
