import React from 'react';
import { Link } from 'react-router';

const PaymentCancelled = () => {
    return (
        <div>
            <h2 className="text-5xl">Payment cancelled.</h2>
            <Link className='btn btn-primary text-black' to='/dashboard/my-parcels'>Try again .</Link>
        </div>
    );
};

export default PaymentCancelled;