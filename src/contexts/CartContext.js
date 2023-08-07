import React ,{createContext , useState , useEffect}from 'react';
//create context
export const CartContext = createContext();
  
 const CartProvider = ({children}) => {

  const [cart , setCart] = useState ([]);

  const [itemAmount , setItemAmount] = useState(0);

  const [total , setTotal] = useState([]);

  useEffect(()=>{
         const total= cart.reduce((accumlator , currentItem) => {
          return accumlator + currentItem.price * currentItem.
          amount;
         },0);
         setTotal(total);
      });



  useEffect(()=>{
    if (cart){
         const amount= cart.reduce((accumlator , currentItem) =>
         {
          return accumlator + currentItem.amount;
         },0);
         setItemAmount(amount);
    }
  }, [cart]);


  const addToCart = (product,id)=> {
    const newItem = {...product , amount: 1};
    //check if item is already in cart 
    const cartItem = cart.find((item)=>{
      return item.id === id;
    });

    // if already there 
   if(cartItem){
    const newCart = [...cart].map((item) =>{
      if(item.id === id){
        return {...item,amount: cartItem.amount + 1};
      }else {
        return item;
      }
    });
    setCart(newCart);
  }else{
    setCart([...cart, newItem]);
  }
   };

   // remove 

   const removeFromCart = (id) => {
      const newCart = cart.filter(item =>{
        return item.id !== id;
      });
      setCart(newCart);
   };

   // clear cart 

   const clearCart =  () => {
    setCart([]);
   };


   // increase
   const increaseAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem , id );
   };

  // decrease
  const decreaseAmount = (id) => {
    const cartItem = cart.find((item) =>  {
     return item.id === id;
    });
    if (cartItem){
      const newCart = cart.map((item) =>  {
        if(item.id === id){
          return {...item, amount : cartItem.amount -1};
        }else{
          return item;
        }
    });
    setCart(newCart);
  }


    if(cartItem.amount < 2){
      removeFromCart(id);
    }
  }


  return ( 
    <CartContext.Provider 
    value ={{ cart , addToCart , removeFromCart , clearCart , increaseAmount , decreaseAmount, itemAmount , total }}>
    {children}
    </CartContext.Provider>
    );
  };
export default CartProvider;
