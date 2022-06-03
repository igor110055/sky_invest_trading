export const emailRegEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const startDateRegEx = /^(0001).*$/;

export const phoneRegEx =
    /^((8|\+[0-79])[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;

export const nameRegEx = /^[A-ZА-ЯЁ][a-zа-яё]+$/;

export const passwordRegEx = /^([^\s])*$/;
