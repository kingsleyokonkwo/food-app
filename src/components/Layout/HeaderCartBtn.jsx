import React, { useContext, useEffect, useState } from 'react'
import classes from './HeaderCartBtn.module.css'
import CartIcon from "../Carts/CartIcon"
import CartContext from '../../store/cart-context'

const HeaderCartBtn = props => {
  const cartCtx = useContext(CartContext)
  const {items} = cartCtx
  const[btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const numberOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  
  const btnClasses = `${classes.button} ${ btnIsHighlighted ? classes.bump : ''}`
  useEffect(() => {
    if (items.length === 0) {
      return
    }
    setBtnIsHighlighted(true)
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [items])

  return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
  )
}

export default HeaderCartBtn