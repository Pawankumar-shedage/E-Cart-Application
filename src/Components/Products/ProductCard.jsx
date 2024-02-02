/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useCart } from "../../CartProvider/CartProvider";
import "./Product.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductCard = ({ product }) => {
  const { addItemToCart } = useCart();

  const notify = () => toast.success("Item added to cart successfully!");

  return (
    <>
      <div className=" card-container mt-5">
        <div className="row">
          <div className="col-md-4 ">
            {/* card. */}
            <div className="card product-card ">
              <img
                src={`${product.thumbnail}`}
                className="card-img-top p-3"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>

                {/* descp */}
                <div className="product-description mb-5">
                  <p>{product.description}</p>
                </div>

                <div className="card-footer-info row mt-3">
                  <div className="col-md-12">
                    <p className="product-price">Price: {product.price} Rs</p>
                    <p className="product-rating">Rating: {product.rating}</p>
                    <p className="product-stock">Stock: {product.stock}</p>
                    <p className="product-discount">
                      Discount: {product.discountPercentage} % off
                    </p>
                  </div>
                  <div className="add-to-cart">
                    <button
                      className="btn btn-primary "
                      onClick={() => {
                        notify();
                        addItemToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>

                  {/* !Footer */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
