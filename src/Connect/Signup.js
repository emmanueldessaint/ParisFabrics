import { useState } from 'react';
import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Container from '@material-ui/core/Container';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const CustomButton = withStyles((theme) => ({
    root: {
        color: '#ffffff',
        backgroundColor: '#413138',
        borderColor: '#413138',
        borderRadius: 5,
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
const CustomCheckbox = withStyles({
    root: {
        color: '#413138',
        '&$checked': {
            color: '#413138',
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default function Signup(props) {

    window.scroll(0, 0);

    const [firstName, setFirstName] = useState('');

    return (
        <Container className="pt-15">
            <Grid justifyContent='center' container>
                <Grid container  spacing={2} item xs={12} sm={10} md={8} >
                    <Grid item container>
                        <div className="ml-3 size3 grey7 bold600">Create my account</div>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Your Firstname"
                            margin="none"
                        >
                        </TextField>
                    </Grid >
                    <Grid item xs={12} sm={6}>

                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Your Lastname"
                            margin="none"
                        >
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            label="Your email"
                            margin="none"
                        >
                        </TextField>
                    </Grid >
                    <Grid item xs={12}>
                        <TextField
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            label="Your password"
                            margin="none"
                        >
                        </TextField>
                    </Grid>

                    <Grid item xs={12} className="" style={{marginTop:'-10px'}}>
                        <FormControlLabel control={<CustomCheckbox />} label="I accept to receive the newsletters from ParisFabrics" />
                    </Grid>
                    <Grid item xs={12} className="" style={{marginTop:'-20px'}}>
                        <FormControlLabel control={<CustomCheckbox />} label="I accept the general conditions" />
                    </Grid>

                    <Grid  item xs={12} className="pt-5" >
                        
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
        </Container>
    )
}