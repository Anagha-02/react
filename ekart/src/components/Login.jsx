
import { useContext, useState } from 'react';
import Button from '../Layout/Button';
import Input from '../Layout/Input'
import Modal from '../Layout/Modal';

import useHttp from '../hooks/useHttp';
import CartContext, { CartContextProvider } from '../store/CartContext';
import ProgressContext from '../store/ProgressContext';
import Error from './Error';

const requestConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

function Login() {
    const progressCtx = useContext(ProgressContext);
    const {
        data,
        isLoading: isSending,
        error,
        sendRequest,
        clearData
    } = useHttp('http://localhost:3000/login', requestConfig);

    {data && sessionStorage.setItem("accountDetails", JSON.stringify(data[0]))}

    async function handleSubmit(event) {
        event.preventDefault();

        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        let jsonData = JSON.stringify({
            user: customerData,
        })
        const resData = await sendRequest(jsonData)
        event.target.reset();
    }

    function handleFinish() {
        progressCtx.hideLogin()
    }

    let actions = (
        <>
            <Button>Login</Button>
        </>
    );

    if (isSending) {
        actions = <span>Sending order data...</span>;
    }

    if (data && !error) {
        return (
            <Modal
                open={progressCtx.progress === 'login'}
                onClose={handleFinish}
            >
                <h2>Success!</h2>
                <p className="modal-actions">
                    <Button onClick={handleFinish}>Okay</Button>
                </p>
            </Modal>
        );
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Input label="E-Mail Address" type="email" id="email" />
                <Input label="Password" type="text" id="password" />

                {error && <Error title="Failed to submit order" message={error} />}

                <p className="modal-actions">{actions}</p>
            </form>
        </>
    )
}

export default Login