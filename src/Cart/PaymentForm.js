import { useState, useEffect } from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import '../css/Cart.css';
import { shippingFees } from '../Shared/globalState'
import { useRecoilState } from 'recoil';
import { CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';

const CustomButton = withStyles((theme) => ({
  root: {
    color: '#020202',
    backgroundColor: '#B7C1DA',
    borderRadius: 3,
    opacity: 0.9,
    height: '45px',
    width: '100%',
    '&:hover': {
      backgroundColor: '#ADB4D0',
    },
  },
}))(Button);

export default function PaymentForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('');
  const [additionalInformation, setAdditionalInformation] = useState('');
  const [itemsInCart, setItemsInCart] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [price, setPrice] = useState(0);
  const [shippingFeesVar, setShippingFeesVar] = useRecoilState(shippingFees);
  const [payByCard, setPayByCard] = useState(false);

  const stripe = useStripe();
  
  const elements = useElements();

  var localLength = localStorage.length

  useEffect(() => {
    var myPrice = 0;
    var ourCart = JSON.parse(localStorage.getItem("cart_Paris_Fabrics"));
    if (ourCart !== null) {
      for (var i = 0; i < ourCart.length; i++) {
        myPrice += (ourCart[i].quantity * ourCart[i].price);
      }
      setItemsInCart(ourCart);
      setPrice(myPrice);
      // setLocalStorageLength(ourCart.length);
    }
    setIsLoaded(true);
    // scroll(0, 0);
  }, [])

  // Stripe payment code 
  const handleServerResponse = (response) => {
    if (response.data.error) {
      // gérer l'erreur
    }

    else if (response.data.requires_action) {
      // Use Stripe.js to handle required card action
      stripe.handleCardAction(
        response.data.payment_intent_client_secret
      ).then((result) => {
        if (result.error) {
          // gérer l'erreur
        } else {
          handlePaymentSubmit(result.paymentIntent.id)
        }
      });
    }

    else if (response.data.success) {
      console.log("Successful payment")
      // gérer le succés, renvoyé sur page réussie
      //   setSuccess(true)
    }
    else {
      console.log(response)
      // gérer erreur
    }
  }

  const handlePaymentSubmit = async (paymentIntentId) => {
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement)
    })

    if (typeof paymentIntentId == 'string') {
      var paymentIntentId = paymentIntentId
    } else {
      var paymentIntentId = 0
    }

    if (!error) {
      try {
        const { id } = paymentMethod
        const response = await axios.post(process.env.MIX_REACT_APP_API + "/api/charge", {
          amount: price * 100,
          id,
          paymentIntentId: paymentIntentId,
          firstName: firstName,
          lastName: lastName,
          city: city,
          zipCode: zipCode,
          email: email,
          address: address,
          additionalInformation: additionalInformation,
          country: country,
          //   phoneNumber: phoneNumber,
          cart: itemsInCart,
        })

        handleServerResponse(response)

      } catch (error) {
        console.log("Error", error)
        // gérer l'erreur
      }
    } else {
      console.log(error.message)
      // gérer l'erreur
    }
  }

  const cardElementOptions = {

    theme: 'stripe',

    style: {
      base: {
        fontSize: '10px',
        color: 'black'
      },
      invalid: {

      }
    },
    hidePostalCode: true,
  }


  // Paypal payment code 
  const createOrder = async (data, actions) => {
    return await axios.post(process.env.MIX_REACT_APP_API + "/api/createOrder", {
      amount: price * 100,
      firstName: firstName,
      lastName: lastName,
      city: city,
      zipCode: zipCode,
      email: email,
      address: address,
      additionalInformation: additionalInformation,
      country: country,
      // phoneNumber: phoneNumber,
      cart: itemsInCart,
    })
      .then((res) => {
        return res
      })
      .then((data) => {
        return data.data.result.id
      })
    //.catch(console.log(response))
  }

  const onApprove = async (data, actions) => {
    return await axios.post(process.env.MIX_REACT_APP_API + "/api/captureOrder", {
      orderID: data.orderID
    })
      .then((res) => {
        return res
      })
      .then((details) => {
        // gérer le succés, renvoyé sur page réussie
      })
  }

  const buttonPayment = () => {
    setPayByCard(true);
  }

  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid container spacing={5} item xs={12} sm={12} md={12} lg={12}>

          {payByCard === false &&
            <Grid item xs={12} md={8} >
              <Grid item xs={12} className="height70">
                <h2 className="centerText mb-12 grey8">Choose your payment method</h2>
              </Grid>
              <Grid container item xs={12}>
                <Grid item xs={12} sm={5} container className="heightPaypalCreditCardDiv">
                  <div className="paypalButton" style={{ width: '100%' }}>
                    <PayPalScriptProvider>
                      <PayPalButtons
                        style={{ layout: "horizontal" }}
                        createOrder={(data, actions) => createOrder(data, actions)}
                        onApprove={(data, actions) => onApprove(data, actions)}
                      />
                    </PayPalScriptProvider>
                  </div>
                </Grid>
                <Grid item xs={false} sm={2}>
                  <div className="greyLinePayment"></div>
                </Grid>
                <Grid item xs={12} sm={5} container className="verticalAlign">
                  <CustomButton variant="contained" onClick={buttonPayment}>Pay by credit card</CustomButton>
                </Grid>
              </Grid>
            </Grid>
          }

          {payByCard === true &&
            <Grid item xs={12} md={8}>
              <Grid spacing={2} container>
                <Grid item xs={12} >
                  <h2 className=" centerText ">Billing details</h2>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Firstname"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Lastname"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Country"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="City"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={6} >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Zip code"
                    value={zipCode}
                    onChange={e => setZipCode(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Additional information"
                    value={additionalInformation}
                    onChange={e => setAdditionalInformation(e.target.value)}
                    size="small"
                  />
                </Grid>
                <Grid item xs={12} >
                  <div className="">
                    {/* <CardElement options={cardElementOptions} /> */}
                    {/* <div className="numbersCard"><CardNumberElement/></div>
                    <CardExpiryElement/>
                    <CardCvcElement /> */}   
                  </div>
                </Grid>
              </Grid>
            </Grid>
          }
          <Grid container item xs={12} md={4}>
            <Grid item xs={12} >
              <h2 className=" centerText grey8">Your order</h2>

              <div className=" bgWhite lightShadowCard2 font1 bold200  pl-1 pr-1 size1">
                <div className="flexBetween ">
                  <div className="ml-2 mt-2 grey8 bold400 size2 letterSpacing1 height30">Product</div>
                  <div className="mr-2 mt-2 grey8 bold400 size2 letterSpacing1 height30">Subtotal</div>
                </div>
                {itemsInCart.map(product => (
                  <div
                    className="flex flexBetween mt-4 pl-2 pr-2 "
                    key={product.id}
                  >
                    <div className="font2 grey8">{product.name} <span className="bold500">x</span> {product.quantity}</div>
                    <div className="font3">${(Number(product.price / 100) * Number(product.quantity)).toFixed(2)}</div>
                  </div>
                ))}
                <div className="flexBetween mt-4 pl-2 pr-2">
                  <div className="font2 grey8">Total</div>
                  <span className="greyLineCart"></span>
                  <div className="font3">${(price / 100).toFixed(2)}</div>
                </div>
                <div className="flexBetween mt-4 pl-2 pr-2">
                  <div className="font2 grey8">Shipping fees</div>
                  <div className="alignRight font3">${(shippingFeesVar * 1).toFixed(2)}</div>
                </div>
                <div className="flexBetween pb-4 mt-4 pl-2 pr-2">
                  <div className="totalPlusShipping font2 grey8">Total + Shipping fees</div>
                  <div className="greyLineCart2"></div>
                  <div className="alignRight font3">${(Number(price / 100) + Number(shippingFeesVar)).toFixed(2)}</div>
                </div>
              </div>
              <Button
                fullWidth
                variant="contained"
                margin="normal"
                onClick={handlePaymentSubmit}
              >
                {isProcessing ? "Processing..." : `Pay $${(price/100 + shippingFeesVar/100).toFixed(2)}`}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}
