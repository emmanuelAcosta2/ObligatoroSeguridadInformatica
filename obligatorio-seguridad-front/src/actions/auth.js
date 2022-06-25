import { fetchSinToken, fetchConToken } from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';
var Buffer = require('buffer/').Buffer

function parseJwt(token) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }
export const startLogin = ( email, password ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth', { email, password }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            console.log("VA EL TOKEN");
            console.log(parseJwt(body.token));
            console.log("VA EL TOKEN");
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name,
                roles: parseJwt(body.token).roles
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }
        

    }
}

export const startRegister = ( email, password, name ) => {
    return async( dispatch ) => {

        const resp = await fetchSinToken( 'auth/new', { email, password, name }, 'POST' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );

            dispatch( login({
                uid: body.uid,
                name: body.name,
                roles: parseJwt(body.token).roles
            }) )
        } else {
            Swal.fire('Error', body.msg, 'error');
        }


    }
}

export const startChecking = () => {
    return async(dispatch) => {

        const resp = await fetchConToken( 'auth/renew' );
        const body = await resp.json();

        if( body.ok ) {
            localStorage.setItem('token', body.token );
            localStorage.setItem('token-init-date', new Date().getTime() );
            
            dispatch( login({
                uid: body.uid,
                name: body.name,
                roles: parseJwt(body.token).roles
            }) )
        } else {
            dispatch( checkingFinish() );
        }
    }
}

const checkingFinish = () => ({ type: types.authCheckingFinish });



const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});


export const startLogout = () => {
    return ( dispatch ) => {

        localStorage.clear();
        dispatch( logout() );
    }
}

const logout = () => ({ type: types.authLogout })