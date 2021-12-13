import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import {
    Link
} from "react-router-dom";
import Container from '@material-ui/core/Container';
import {withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    marginTopBanner: {
        "margin-top": "170px;",

        "width": "70%",
        "margin-left": "auto",
        "margin-right": "auto",
    },
    button: {
        "margin-top": "30px",
    },
    greyLine: {
        height: 1,
        "width": "99%",
        "margin-left": "auto",
        "margin-right": "auto",
        "background-color": "grey",
        marginTop: 10,
    },
    forgotPassword: {
        "display": "flex",
        "justify-content": "center",
    }
}));

const CustomButton = withStyles((theme) => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#413138',
        borderColor: '#413138',
        borderRadius: 0,
        border: '1px solid',
        '&:hover': {
            backgroundColor: 'transparent',
            color: '#505050',
            border: '1px solid',
            borderColor: '#505050',
            fontWeight: '600',
        },
    },
}))(Button);

const CustomButtonCreate = withStyles((theme) => ({
    root: {
        color: '#413138',
        backgroundColor: 'transparent',
        borderColor: '#413138',
        borderRadius: 0,
        border: '1px solid',
        '&:hover': {
            backgroundColor: '#413138',
            color: '#ffffff',
            border: '1px solid',
            borderColor: '#505050',
            fontWeight: '600',
        },
    },
}))(Button);

export default function Connect(props) {

    const classes = useStyles();

    return (
        <div className="pt-13">
            <Container>
                <Grid container justifyContent="center">
                    <Grid container justifyContent="center" spacing={8} item xs={11} sm={12} md={11}>
                        <Grid item xs={12} sm={6}>
                            <Box>
                                <h3>Already customer ?</h3>
                                <TextField
                                    margin="normal"
                                    className={classes.textField}
                                    fullWidth
                                    label="Your email"
                                ></TextField>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Your password"
                                ></TextField>
                                <CustomButton
                                    className={classes.button}
                                    fullWidth
                                    margin="normal">Connect</CustomButton>
                                <div className={classes.greyLine}></div>
                                <h5 className={classes.forgotPassword}>Forgot your <Link to="/ForgotPassword" className="grey9 ml-1"> password ?</Link></h5>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h3>New customer ?</h3>
                            <Link to="/signup" className="item textDecorationNone">
                                <CustomButtonCreate
                                    className={classes.button}
                                    fullWidth
                                    margin="normal">Create account
                                </CustomButtonCreate>
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}