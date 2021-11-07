import React from 'react';

const ShowPassword = () => {
    const showToggle = (e) => {
        const password = document.getElementById("password");
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        e.target.classList.toggle('fa-eye-slash');
    }
    return (
        <i className="fa fa-eye" onClick={showToggle} />
    );
}

export default ShowPassword;
