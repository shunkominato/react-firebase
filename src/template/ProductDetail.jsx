import { makeStyles } from '@material-ui/core/styles';
import HTMLReactParser from 'html-react-parser'
import { useDispatch, useSelector } from 'react-redux'
import { db,FirebaseTimeStamp } from '../firebase'
import React, {useState, useEffect, useCallback} from 'react'
import {ImageSwiper, SizeTable} from '../components/products/'
import { addProductToCart } from '../reducks/users/operations';

const useStyles = makeStyles((theme) => ({
  sliderBox: {
      [theme.breakpoints.down('sm')]: {
          margin: '0 auto 24px auto',
          height: 320,
          width: 320
      },
      [theme.breakpoints.up('sm')]: {
          margin: '0 auto',
          height: 400,
          width: 400
      },
  },
  detail: {
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
          margin: '0 auto 16px auto',
          height: 320,
          width: 320
      },
      [theme.breakpoints.up('sm')]: {
          margin: '0 auto',
          height: 'auto',
          width: 400
      },
  },
  price: {
      fontSize: 36
  }
}))

const returnCodeToBr = (text) => {
  if(text === ''){
    return text
  } else {
    return HTMLReactParser(text.replace(/\r?\n/g, '<br/>'))
  }
}

const ProductDetail = () => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const path = selector.router.location.pathname
  const id = path.split('product/')[1]
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null)

  useEffect(() => {
    db.collection('products').doc(id).get()
    .then(doc => {
      const data = doc.data()
      setProduct(data)
    })
  }, [])

  const addProduct = useCallback((selectedSize) => {
    const timeStamp = FirebaseTimeStamp.now();
    dispatch(addProductToCart({
      added_at: timeStamp,
      description: product.description,
      gender: product.gender,
      images: product.images,
      name: product.name,
      price: product.price,
      productId: product.id,
      quantity: 1,
      size: selectedSize
    }))
  })

  return(
    <section>
      {product && (
        <div className='p-grid__row'>
          <div className={classes.sliderBox}>
            <ImageSwiper images={product.images} />
          </div>
          <div className={classes.detail}>
            <h2 className='u-text__headline'>{product.name}</h2>
            <p className={classes.price}>{product.price.toLocaleString()}</p>
            <SizeTable sizes={product.sizes} addProduct={addProduct} />
            <div className='module-spacer--small'></div>
            <p>{returnCodeToBr(product.description)}</p>
          </div>
        </div>
      )}
    </section>
  )
}

export default ProductDetail