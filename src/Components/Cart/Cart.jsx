/* eslint-disable no-unused-vars */
import { useCart } from "../../CartProvider/CartProvider";
import "./Cart.css";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { Link } from "react-router-dom";
import { AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";

export const Cart = () => {
  const { cartItems, clearCart, removeFromCart } = useCart();

  const cartCount = cartItems.length;
  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price;
  }, 0);

  // ----return----
  return (
    <div className="cart-container container">
      <div className="fs-3 cart-header">
        {/* cart */}
        <div className="mycart">
          <div className="me-3">
            <h2 className="text-center ">My Cart </h2>
          </div>
          <div>
            <span>
              <Link className="nav-link mb-3" to={"/cart"}>
                <AiOutlineShoppingCart title="Cart" />
              </Link>
            </span>
          </div>
        </div>
        <div>
          <Link to="/home" className="nav-link">
            <IoMdHome aria-label="Home" title="Home" />
          </Link>
        </div>
      </div>

      <div className="cart-details mt-5">
        <div>
          <h5 className="text-start">Cart Count : {cartCount}</h5>
          <h5 className="text-start">
            Total Amount : &#8377;
            <span style={{ color: "green" }}>{totalAmount}</span>
          </h5>
        </div>
        <div>
          <h5>
            Delete all &nbsp;
            <span onClick={clearCart}>
              <RiDeleteBin6Fill title="Delete all items" />
            </span>
          </h5>
        </div>
      </div>

      {cartCount > 0 ? (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="item-div">
              {/* img */}
              <div className="item-img mb-3">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  width={"30%"}
                  height={"100%"}
                />
              </div>

              {/* det */}
              <div className="item-details">
                <div>
                  <span className="fw-bold">{item.title}</span>
                  <br />
                  <div className="d-flex flex-row justify-content-between align-items-center">
                    <div className="fw-bold fs-5 me-3">
                      &#8377; {item.price} Rs
                    </div>

                    {item.quantity ? (
                      <div className=" ">Quantity: {item.quantity}</div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                {/* Remove Item */}
                <div>
                  <span
                    role="button"
                    className="fs-3"
                    onClick={() => {
                      removeFromCart(item.id);
                    }}
                  >
                    <RiDeleteBin6Fill />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">No Items added to cart</div>
      )}
    </div>
  );
};
