import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';
import {Link} from "react-router-dom";
import creditCard from "../assets/img/creditCard1.png";
import trackPackage from "../assets/img/trackPackage1.png";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import '../App.css';
import '../css/Footer.css';
import YouTubeIcon from '@material-ui/icons/YouTube';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {useRecoilState,} from 'recoil';
import { currentPageProduct } from '../Shared/globalState';

export default function Footer() {

    const [setActuelPage] = useRecoilState(currentPageProduct);

    const resetPage = () => {
        setActuelPage(1);
      }

    return (
        <div className="pt-10 generalBackground">
            <div className=" backgroundFooterItems bgBlue">
                <Grid container justifyContent="center" >
                    <Grid spacing={2} container item xs={12} sm={11} md={9}>
                        <Grid className="textAlignCenter" item xs={12} sm={6} md={3} >
                            <div className="heightIconsFooter "><img src={creditCard} className="iconsFooter pt-4" alt="logo credit card"/></div>
                            <span className="grey7 font6 size2">SECURE PAYMENT</span>
                            <h5 className="font2">With credit card or Paypal</h5>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className="textAlignCenter">
                            <div className="heightIconsFooter "><img src={trackPackage} className="iconsFooterTrack pt-4"  alt="logo satisfied person"/></div>
                            <span className="grey7 font6 size2">SATISFIED OR REFUNDED</span>
                            <h5 className="font2">7 days from time of delivery</h5>

                        </Grid>
                        <Grid item xs={12} sm={6} md={3} className="textAlignCenter">

                            <div className="heightIconsFooter pt-4"><LocalShippingIcon className="iconsFooter"/></div>
                            <span className="grey7 font6 size2">FREE SHIPPING</span>
                            <h5 className="font2">Guaranteed response within 24 hours</h5>
                        </Grid>


                        <Grid item xs={12} sm={6} md={3} className="textAlignCenter">
                            <div className="heightIconsFooter pt-4"><LiveHelpIcon className="iconsFooter" /></div>
                            <span className="grey7 font6 size2">RESPONSIVE CUSTOMER SERVICE</span>
                            <h5 className="font2">From 40$ of purchases</h5>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
            <div className="backgroundFooter ">
                <Container>
                    <Grid container justifyContent="center" className="menuQuality pt-5">
                        <Grid container item xs={12} md={11} lg={10} >

                            <Grid container justifyContent="center" item xs={12} md={5}>
                                <div className="flexCenter pt-5 mt-2">
                                    <YouTubeIcon className="m-3" />
                                    <YouTubeIcon className="m-3" />
                                    <YouTubeIcon className="m-3" />
                                    <YouTubeIcon className="m-3" />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={7} container justifyContent="center" >
                                <Grid item xs={11} md={12}  >
                                    <div className="widthP mt-4">
                                        <p className="font2">unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" className="menuQuality pb-5">
                        <Grid container item xs={12} md={11} lg={10} className="mt-7">
                            <Grid item className="pt-5" container justifyContent="center" md={12} lg={8}>
                                <Grid className="flexCenter" item md={4} sm={6} xs={12}>
                                    <div className="widthItemsFooter font2">
                                        <h3>ParisFabrics</h3>
                                        <div>52 rue de la porte</div>
                                        <div>75000 Paris</div>
                                        <div>contact@parisfabrics.com</div>
                                    </div>
                                </Grid>
                                <Grid className="flexCenter" item md={4} sm={6} xs={12}>
                                    <div className="widthItemsFooter font2">
                                        <h3 >About us</h3>
                                        <Link to="/shippingpolicy" onClick={resetPage}><div className="hoverUnderlined" >Shipping policy</div></Link>
                                        <Link to="/refundpolicy" onClick={resetPage}><div className="hoverUnderlined" >Refund policy</div></Link>
                                        <Link to="/faq" onClick={resetPage}><div className="hoverUnderlined" >FAQ's</div></Link>
                                        <Link to="/termsofservice" onClick={resetPage}><div className="hoverUnderlined" >Terms of service</div></Link>
                                        <Link to="/privacypolicy" onClick={resetPage}><div className="hoverUnderlined" >Privacy policy</div></Link>
                                    </div>
                                </Grid>

                                <Grid className="flexCenter" item md={4} sm={6} xs={12}>
                                    <div className="widthItemsFooter font2">
                                        <h3>Privates sales and newsletter</h3>

                                        <div>Access privates sales and stay<br />up to date with ParisFabrics news</div>
                                        <div className="flexCenter mt-4">
                                            <TextField
                                                className="inputFooter"
                                                placeholder=" Your email ..."
                                            />
                                            <button className="buttonSendNewsletters font8"><MailOutlineIcon className=""/></button>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Grid item className="pt-5 verticalAlign" container justifyContent="center" md={12} lg={4}>
                                <h1 className="verticalAlign titleFooter font8">Paris<span className="ml-1"></span>Fabrics</h1>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    )
}