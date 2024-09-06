import React, { useReducer, useContext, createContext } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        },
      ];
    case "REMOVE":
      return state.filter((_, index) => index !== action.index);
    case "DROP":
      return [];
    case "UPDATE":
       let updatedArr = [...state];
      let itemExists = false;

      // Find the item in the cart and update it if it exists
      updatedArr = updatedArr.map((food) => {
        if (food.id === action.id && food.size === action.size) {
          itemExists = true;
          return {
            ...food,
            qty: food.qty + parseInt(action.qty),
            price: food.price + action.price,
          };
        }
        return food;
      });

      // If the item does not exist, add it to the cart
      if (!itemExists) {
        updatedArr.push({
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          price: action.price,
          img: action.img,
        });
      }

      return updatedArr;
    default:
      console.log("Error in Reducer");
      return state;
  }
};


export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
