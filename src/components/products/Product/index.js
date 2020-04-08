import React, {memo, useState} from 'react';
import { makeStyles } from '@material-ui/core';
import Card from '../../../uikit/components/cards/Card';
import CardContent from '../../../uikit/components/cards/CardContent';
import CardActions from '../../../uikit/components/cards/CardActions';
import Button from '../../../uikit/components/buttons/Button';
import SquareCheckbox from '../../../uikit/components/checkbox/SquareCheckbox';

const useStyles = makeStyles({
  root: {
    margin: 'auto',
    marginTop: 50,
    minWidth: 275,
    maxWidth: 600,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  actions: {
    display: 'block',
  },
  button: {
    backgroundColor: '#484848',
    color: '#ffffff'
  }
});

function Product({product, onAddToCart, onAddToTempCart}){
  const [productProps, setProductProps] = useState({
    size: product.availableSizes[0],
    quantity: 0,
    id: product.id,
  })
  const classes = useStyles();
  return <div>
    <Card className={classes.root}>
      <CardContent>
        <h1>{product.name}</h1>
        <h2>{`${product.pricePrefix}${product.price} ${product.unit}`} </h2>
        {
          product.availableSizes && <SquareCheckbox values={[productProps.size]} options={product.availableSizes.map(size=>({label: size, id: size}))} onChange={(value)=>setProductProps({
            ...productProps, size: value[0],
          })} />
        }
         
      </CardContent>
      <CardActions className={classes.actions}>
        <Button className={classes.button} onClick={()=>onAddToCart(productProps)}>Add To Cart</Button><Button onClick={()=>onAddToTempCart(productProps)} className={classes.button} >Buy Now</Button>
      </CardActions>
    </Card>
  </div>
}

const addToTempShoppingCartAction = (productProps)=>({
  type: 'ADD_TO_TEMP_SHOPPING_CART',
  payload: productProps
});

const addToShoppingCartAction = (productProps)=>({
  type: 'ADD_TO_SHOPPING_CART',
  payload: productProps
});

const pseudoDispatch = (action)=>{
  console.log('dispatched', action);
}

const mockReactRedux = (Comp)=>{
  return function MockReactRedux(){
    return <Comp product={{
      name: `UGG's Men's Biltmore Chelsea in Black`,
      availableSizes: [8.5, 9, 9.5],
      price: `815.00`,
      pricePrefix: '$',
      unit: 'CAD',
      id: 'uniqueId'
    }}
    onAddToCart={(productProps)=>{
      pseudoDispatch(addToShoppingCartAction(productProps))
    }}
    onAddToTempCart={(productProps)=>{
      pseudoDispatch(addToTempShoppingCartAction(productProps))
    }}
    />
  }
}

export default mockReactRedux(memo(Product))