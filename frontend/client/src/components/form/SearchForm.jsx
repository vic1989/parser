import React, { useContext, useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { TextField, Checkbox, Radio, Select } from 'final-form-material-ui';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/dist/react-notifications.css'
import {
    Typography,
    Paper,
    Link,
    Grid,
    Button,
    CssBaseline,
    RadioGroup,
    FormLabel,
    MenuItem,
    FormGroup,
    FormControl,
    FormControlLabel,
} from '@material-ui/core';
// Picker
import {
    TimePicker,
    DatePicker,
} from '@material-ui/pickers';
import { AppContext } from "../../store/main.store";
import MultiRangeSlider from "./inputs/slider";

function DatePickerWrapper(props) {
    const {
        input: { name, onChange, value, ...restInput },
        meta,
        ...rest
    } = props;
    const showError =
        ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
        meta.touched;

    return (
        <DatePicker
            {...rest}
            name={name}
            helperText={showError ? meta.error || meta.submitError : undefined}
            error={showError}
            inputProps={restInput}
            onChange={onChange}
            value={value === '' ? null : value}
        />
    );
}

function TimePickerWrapper(props) {
    const {
        input: { name, onChange, value, ...restInput },
        meta,
        ...rest
    } = props;
    const showError =
        ((meta.submitError && !meta.dirtySinceLastSubmit) || meta.error) &&
        meta.touched;

    return (
        <TimePicker
            {...rest}
            name={name}
            helperText={showError ? meta.error || meta.submitError : undefined}
            error={showError}
            inputProps={restInput}
            onChange={onChange}
            value={value === '' ? null : value}
        />
    );
}
const validate = values => {
    const errors = {};
    // if (!values.firstName) {
    //     errors.firstName = 'Required';
    // }
    // if (!values.lastName) {
    //     errors.lastName = 'Required';
    // }
    // if (!values.email) {
    //     errors.email = 'Required';
    // }
    return errors;
};

const FormS = () => {
    const [initial, setInitial] = useState(null)
    const [price, setPrice] = useState([null, null])
    const {apartsStore} = useContext(AppContext)
    const onSubmit = async values => {
        values = {...values, ...{ price}}
        await apartsStore.saveFormData(values)
        NotificationManager.success('', 'сохранено');
    };
    useEffect(() => {
        (async () => {
            const init = await apartsStore.loadFormData()
            setInitial(init.data)
            setPrice(init.data.price)
        })()
    }, [])
    return (
        <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
            <NotificationContainer/>
            <CssBaseline />
            <Typography variant="h4" align="center" component="h1" gutterBottom>
                🏁 Выберите параметры для поиска
            </Typography>

            <Form
                onSubmit={onSubmit}
                initialValues={initial || { employed: true, apart_type: 'sell' }}
                validate={validate}
                render={({ handleSubmit, reset, submitting, pristine, values }) => (
                    <form onSubmit={handleSubmit} noValidate>
                        <Paper style={{ padding: 16 }}>
                            <Grid container alignItems="flex-start" spacing={2}>
                                <Grid item>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Тип парсинга</FormLabel>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                label="Аренда"
                                                control={
                                                    <Field
                                                        name="apart_type"
                                                        component={Radio}
                                                        type="radio"
                                                        value="rent"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="Продажа"
                                                control={
                                                    <Field
                                                        name="apart_type"
                                                        component={Radio}
                                                        type="radio"
                                                        value="sell"
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>

                                <Grid item>
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">Число комнат</FormLabel>
                                        <RadioGroup row>
                                            <FormControlLabel
                                                label="1"
                                                control={
                                                    <Field
                                                        name="rent_type"
                                                        component={Radio}
                                                        type="radio"
                                                        value="1_room"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="2"
                                                control={
                                                    <Field
                                                        name="rent_type"
                                                        component={Radio}
                                                        type="radio"
                                                        value="2_room"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="3"
                                                control={
                                                    <Field
                                                        name="rent_type"
                                                        component={Radio}
                                                        type="radio"
                                                        value="3_room"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="4"
                                                control={
                                                    <Field
                                                        name="rent_type"
                                                        component={Radio}
                                                        type="radio"
                                                        value="4_room"
                                                    />
                                                }
                                            />
                                            <FormControlLabel
                                                label="5"
                                                control={
                                                    <Field
                                                        name="rent_type"
                                                        component={Radio}
                                                        type="radio"
                                                        value="5_room"
                                                    />
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <FormLabel component="legend">Цена</FormLabel>
                                    <MultiRangeSlider
                                        min={0}
                                        minValSet={price[0]}
                                        maxValSet={price[1]}
                                        step={1000}
                                        max={500000}
                                        onChange={({ min, max }) => {
                                            setPrice([min, max])
                                        }}

                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        label="Только собственник"
                                        control={
                                            <Field
                                                name="only_owner"
                                                component={Checkbox}
                                                type="checkbox"
                                            />
                                        }
                                    />
                                </Grid>
                                <Grid item style={{ marginTop: 16 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={submitting}
                                    >
                                        Сохранить
                                    </Button>
                                </Grid>

                                {/*<Grid item xs={6}>*/}
                                {/*    <Field*/}
                                {/*        fullWidth*/}
                                {/*        required*/}
                                {/*        name="firstName"*/}
                                {/*        component={TextField}*/}
                                {/*        type="text"*/}
                                {/*        label="First Name"*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={6}>*/}
                                {/*    <Field*/}
                                {/*        fullWidth*/}
                                {/*        required*/}
                                {/*        name="lastName"*/}
                                {/*        component={TextField}*/}
                                {/*        type="text"*/}
                                {/*        label="Last Name"*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={12}>*/}
                                {/*    <Field*/}
                                {/*        name="email"*/}
                                {/*        fullWidth*/}
                                {/*        required*/}
                                {/*        component={TextField}*/}
                                {/*        type="email"*/}
                                {/*        label="Email"*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={12}>*/}
                                {/*    <FormControlLabel*/}
                                {/*        label="Employed"*/}
                                {/*        control={*/}
                                {/*            <Field*/}
                                {/*                name="employed"*/}
                                {/*                component={Checkbox}*/}
                                {/*                type="checkbox"*/}
                                {/*            />*/}
                                {/*        }*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                                {/*<Grid item>*/}
                                {/*    <FormControl component="fieldset">*/}
                                {/*        <FormLabel component="legend">Best Stooge</FormLabel>*/}
                                {/*        <RadioGroup row>*/}
                                {/*            <FormControlLabel*/}
                                {/*                label="Larry"*/}
                                {/*                control={*/}
                                {/*                    <Field*/}
                                {/*                        name="stooge"*/}
                                {/*                        component={Radio}*/}
                                {/*                        type="radio"*/}
                                {/*                        value="larry"*/}
                                {/*                    />*/}
                                {/*                }*/}
                                {/*            />*/}
                                {/*            <FormControlLabel*/}
                                {/*                label="Moe"*/}
                                {/*                control={*/}
                                {/*                    <Field*/}
                                {/*                        name="stooge"*/}
                                {/*                        component={Radio}*/}
                                {/*                        type="radio"*/}
                                {/*                        value="moe"*/}
                                {/*                    />*/}
                                {/*                }*/}
                                {/*            />*/}
                                {/*            <FormControlLabel*/}
                                {/*                label="Curly"*/}
                                {/*                control={*/}
                                {/*                    <Field*/}
                                {/*                        name="stooge"*/}
                                {/*                        component={Radio}*/}
                                {/*                        type="radio"*/}
                                {/*                        value="curly"*/}
                                {/*                    />*/}
                                {/*                }*/}
                                {/*            />*/}
                                {/*        </RadioGroup>*/}
                                {/*    </FormControl>*/}
                                {/*</Grid>*/}
                                {/*<Grid item>*/}
                                {/*    <FormControl component="fieldset">*/}
                                {/*        <FormLabel component="legend">Sauces</FormLabel>*/}
                                {/*        <FormGroup row>*/}
                                {/*            <FormControlLabel*/}
                                {/*                label="Ketchup"*/}
                                {/*                control={*/}
                                {/*                    <Field*/}
                                {/*                        name="sauces"*/}
                                {/*                        component={Checkbox}*/}
                                {/*                        type="checkbox"*/}
                                {/*                        value="ketchup"*/}
                                {/*                    />*/}
                                {/*                }*/}
                                {/*            />*/}
                                {/*            <FormControlLabel*/}
                                {/*                label="Mustard"*/}
                                {/*                control={*/}
                                {/*                    <Field*/}
                                {/*                        name="sauces"*/}
                                {/*                        component={Checkbox}*/}
                                {/*                        type="checkbox"*/}
                                {/*                        value="mustard"*/}
                                {/*                    />*/}
                                {/*                }*/}
                                {/*            />*/}
                                {/*            <FormControlLabel*/}
                                {/*                label="Salsa"*/}
                                {/*                control={*/}
                                {/*                    <Field*/}
                                {/*                        name="sauces"*/}
                                {/*                        component={Checkbox}*/}
                                {/*                        type="checkbox"*/}
                                {/*                        value="salsa"*/}
                                {/*                    />*/}
                                {/*                }*/}
                                {/*            />*/}
                                {/*            <FormControlLabel*/}
                                {/*                label="Guacamole 🥑"*/}
                                {/*                control={*/}
                                {/*                    <Field*/}
                                {/*                        name="sauces"*/}
                                {/*                        component={Checkbox}*/}
                                {/*                        type="checkbox"*/}
                                {/*                        value="guacamole"*/}
                                {/*                    />*/}
                                {/*                }*/}
                                {/*            />*/}
                                {/*        </FormGroup>*/}
                                {/*    </FormControl>*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={12}>*/}
                                {/*    <Field*/}
                                {/*        fullWidth*/}
                                {/*        name="notes"*/}
                                {/*        component={TextField}*/}
                                {/*        multiline*/}
                                {/*        label="Notes"*/}
                                {/*    />*/}
                                {/*</Grid>*/}
                                {/*<Grid item xs={12}>*/}
                                {/*    <Field*/}
                                {/*        fullWidth*/}
                                {/*        name="city"*/}
                                {/*        component={Select}*/}
                                {/*        label="Select a City"*/}
                                {/*        formControlProps={{ fullWidth: true }}*/}
                                {/*    >*/}
                                {/*        <MenuItem value="London">London</MenuItem>*/}
                                {/*        <MenuItem value="Paris">Paris</MenuItem>*/}
                                {/*        <MenuItem value="Budapest">*/}
                                {/*            A city with a very long Name*/}
                                {/*        </MenuItem>*/}
                                {/*    </Field>*/}
                                {/*</Grid>*/}
                                {/*<Grid item style={{ marginTop: 16 }}>*/}
                                {/*    <Button*/}
                                {/*        type="button"*/}
                                {/*        variant="contained"*/}
                                {/*        onClick={reset}*/}
                                {/*        disabled={submitting || pristine}*/}
                                {/*    >*/}
                                {/*        Reset*/}
                                {/*    </Button>*/}
                                {/*</Grid>*/}
                                {/*<Grid item style={{ marginTop: 16 }}>*/}
                                {/*    <Button*/}
                                {/*        variant="contained"*/}
                                {/*        color="primary"*/}
                                {/*        type="submit"*/}
                                {/*        disabled={submitting}*/}
                                {/*    >*/}
                                {/*        Submit*/}
                                {/*    </Button>*/}
                                {/*</Grid>*/}
                            </Grid>
                        </Paper>
                        {/*<pre>{JSON.stringify(values, 0, 2)}</pre>*/}
                    </form>
                )}
            />
        </div>
    );
}
export default FormS
