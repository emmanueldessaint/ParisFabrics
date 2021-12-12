import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import {withStyles } from '@material-ui/core/styles';

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

export default function Signup(props) {

    return (
        <div className="pt-13">
            <Grid container justifyContent="center"  >

                <Grid item xs={12} sm={10} md={8} container>
                    <h2 className="ml-3">Create my account</h2>
                </Grid>
                <Grid item xs={12} sm={10} md={8} container spacing={4} >
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            label="Your name"
                        >
                        </TextField>
                    </Grid >
                    <Grid item xs={6}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            label="Your Family name"
                        >
                        </TextField>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={10} md={8} container spacing={4} >
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            label="Your email"
                        >
                        </TextField>
                    </Grid >
                    
                </Grid>
                <Grid item xs={12} sm={10} md={8} container spacing={4}>
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            label="Your password"
                        >
                        </TextField>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={10} md={8} container spacing={4} className="pt-4">
                    <FormControlLabel style={{marginLeft:'15px'}} control={<Checkbox />} label="I accept to receive the newsletters from amazingBikes" />
                </Grid>
                <Grid item xs={12} sm={10} md={8} container spacing={4} className="pt-4">
                    <FormControlLabel style={{marginLeft:'15px'}} control={<Checkbox />} label="I accept the general conditions" />
                </Grid>
                <Grid item xs={12} sm={10} md={8} container spacing={4} className="pt-5" >
                    <Grid item xs={12}>
                        <CustomButton
                            margin="normal"
                            variant="contained"
                            fullWidth
                        >
                            Create account
                        </CustomButton>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}