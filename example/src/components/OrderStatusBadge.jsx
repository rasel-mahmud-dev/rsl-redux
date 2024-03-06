import React from 'react';

const OrderStatusBadge = ({status}) => (
    <div className={`order-status-badge status-${status}`}>
        {status}
    </div>

);

export default OrderStatusBadge;