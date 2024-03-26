import Button from '../Layout/Button';
import Input from '../Layout/Input'

import useHttp from '../hooks/useHttp';

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

function Register({isSuccessful}) {
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData
  } = useHttp('http://localhost:3000/register', requestConfig);

  console.log(data)

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); 
    let url = "/register"
    let jsonData = JSON.stringify({
      user: customerData,
    })
    await sendRequest(jsonData);
    event.target.reset();
  }

  if(data && data['message'] === "User Registered!") {
    data['message'] = "User Registered! Please Login to continue"
  }

  return (
    <div className="Register">
      <div>
        Register Page
        <form onSubmit={handleSubmit}>
          <Input label="Full Name" type="text" id="name" isRef={true}/>
          <Input label="E-Mail Address" type="email" id="email" />
          <Input label="Address" type="text" id="address" />
          <Input label="Postal Code" type="text" id="pincode" />
          <Input label="Password" type="text" id="password" />
          <Button children="Submit" />
        </form>
        {data && <span className='error'>{data['message']}</span>}
      </div>
    </div>
  )
}

export default Register