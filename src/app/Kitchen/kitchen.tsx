'use client';

import { useState } from 'react';

interface Order {
  customer: string;
  items: string[];
  status: string;
}

export default function KitchenDisplay() {
  const [orders, setOrders] = useState<Order[]>([
    { customer: 'Table 1', items: ['Burger', 'Fries'], status: 'Pending' },
    { customer: 'Table 2', items: ['Pizza', 'Soda'], status: 'Pending' },
    { customer: 'Table 3', items: ['Pasta'], status: 'Pending' },
  ]);

  const updateStatus = (index: number, newStatus: string) => {
    const newOrders = [...orders];
    newOrders[index].status = newStatus;
    setOrders(newOrders);
  };

  const pendingOrders = orders.filter(order => order.status === 'Pending');
  const preparingOrders = orders.filter(order => order.status === 'Preparing');
  const doneOrders = orders.filter(order => order.status === 'Done');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Kitchen Orders</h1>
      <div className="grid grid-cols-3 gap-4">
        {/* Pending Orders */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Pending</h2>
          <div className="space-y-2">
            {pendingOrders.map((order, index) => (
              <div key={index} className="p-4 bg-white rounded shadow-md">
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Items:</strong> {order.items.join(', ')}</p>
                <button 
                  className="mt-2 px-3 py-1 bg-yellow-400 rounded"
                  onClick={() => updateStatus(orders.indexOf(order), 'Preparing')}
                >
                  Preparing
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preparing Orders */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Preparing</h2>
          <div className="space-y-2">
            {preparingOrders.map((order, index) => (
              <div key={index} className="p-4 bg-white rounded shadow-md">
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Items:</strong> {order.items.join(', ')}</p>
                <button 
                  className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
                  onClick={() => updateStatus(orders.indexOf(order), 'Done')}
                >
                  Done
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Done Orders */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Done</h2>
          <div className="space-y-2">
            {doneOrders.map((order, index) => (
              <div key={index} className="p-4 bg-gray-200 rounded shadow-md">
                <p><strong>Customer:</strong> {order.customer}</p>
                <p><strong>Items:</strong> {order.items.join(', ')}</p>
                <p className="mt-2 font-semibold text-green-700">Completed</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
