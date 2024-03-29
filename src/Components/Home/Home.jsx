/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { ProductCard } from "../Products/ProductCard";

import "./Home.css";

// icons
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";
import { useAuth } from "../../AuthPovider/AuthProvider";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const { logout } = useAuth();

  const navigate = useNavigate();

  //   price
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, minPrice, maxPrice, searchQuery]);

  // Fetching Products from open api(dummy json)
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
    // console.log(filtered);
  };

  // Dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (selectedOption) => {
    if (selectedOption === "Logout") {
      logout();
      // console.log("User Logged out");
    }

    if (selectedOption === "My Cart") {
      navigate("/cart");
      // console.log("My Cart");
    }
    // console.log(selectedOption, "clicked");
  };

  // ----Return-----------

  return (
    <>
      <div className="home-container  mt-5 mb-5">
        <div className="home-header d-flex flex-row justify-content-between text-center container mb-5">
          {/* header */}
          <div className="d-flex flex-row justify-content-center align-items-center">
            <h2 className="text-center" style={{ fontSize: "3vw" }}>
              Shop the Latest Trends and Essentials
            </h2>
          </div>

          {/* More options */}
          <div className="more-options">
            <button className="btn" onClick={toggleDropdown}>
              <span
                style={{ backgroundColor: "rgb(232,232,232)", padding: "5px" }}
              >
                <CgDetailsMore
                  style={{
                    color: "black",
                    fontSize: "3vw",
                    // padding: "10px",
                  }}
                />
              </span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-options mt-3">
                <div
                  className="dropdown-option mb-1 "
                  onClick={() => handleOptionClick("Logout")}
                >
                  <div>Logout</div>
                  <div className="ms-3 fs-5">
                    <IoLogOutOutline style={{}} />
                  </div>
                </div>
                <div
                  className="dropdown-option mb-1"
                  onClick={() => handleOptionClick("My Cart")}
                >
                  <div>My Cart</div>
                  <div className="ms-3 fs-5">
                    <AiOutlineShoppingCart style={{}} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FILTER */}
        <div>
          {/* filter by NAME */}
          <input
            type="text"
            className="input-group "
            style={{
              width: "50%",
              height: "3vw",
              margin: "auto",
              padding: "10px 15px",
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

          <div className="mt-3 d-flex flex-row justify-content-center align-items-center ">
            {/* filter by Price Min */}
            <input
              type="text"
              className="input-group "
              style={{
                width: "50%",
                height: "3vw",
                margin: "auto",
                padding: "10px 15px",
                borderRadius: "20px",
                border: "1px solid black",
              }}
              name="min-price"
              value={minPrice}
              placeholder="enter min price"
              onChange={(e) => {
                setMinPrice(e.target.value);
                // console.log(minPrice);
              }}
            />
            {/* filter by Price Max */}
            <input
              type="text"
              className="input-group "
              style={{
                width: "25%",
                height: "3vw",
                margin: "auto",
                padding: "10px 15px",
                borderRadius: "20px",
                border: "1px solid black",
              }}
              name="max-price"
              value={maxPrice}
              placeholder="enter max price"
              onChange={(e) => {
                setMaxPrice(e.target.value);
                // console.log(maxPrice);
              }}
            />
          </div>
        </div>

        <div className="product-list d-flex flex-wrap justify-content-around">
          {loading ? (
            <div>Loading</div>
          ) : filteredProducts.length === 0 ? (
            <div className="mt-5">
              <strong className="fs-4">No matching products found.</strong>
            </div>
          ) : (
            <div className="products-container d-flex justify-content-around flex-wrap  p-5">
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
