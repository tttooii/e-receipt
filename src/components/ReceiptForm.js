import React, { useState } from 'react';
import ReceiptModal from './ReceiptModal';
import ReceiptItem from './ReceiptItem';

const date = new Date();
const today = date.toLocaleDateString('en-GB', {
  month: 'numeric',
  day: 'numeric',
  year: 'numeric',
});

const ReceiptForm = () => {
  
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState([{item_name: '', qty: '', price: ''}]);
  const [businessName, setBusinessName] = useState();
  const [customerName, setCustomerName] = useState();
  const [receiptNo, setReceiptNo] = useState();

  const addItem = () => {
    setItems((prevItem) => [
      ...prevItem,
      {
        item_name: '',
        qty: '',
        price: '',
      },
    ]);
  };

  const handleFormChange = (id, event) => {
    let data = [...items];
    data[id][event.target.name] = event.target.value;
    setItems(data);
  }
    
  const deleteItemHandler = (id) => {
    let data = [...items];
    data.splice(id, 1);
    setItems(data);
  };

  const total = items.reduce((prev, curr) => {
    if (curr.item_name.trim().length > 0){
      return prev + Number(curr.price * Math.floor(curr.qty));
    }
    else 
      return prev;
  }, 0);
    
  const reviewInvoiceHandler = (event) => {
    event.preventDefault();
    setIsOpen(true);
  };


    return ( 
        <form className="flex">
          <div className="flex-1 p-4 my-6 space-y-2 bg-white rounded-md shadow-sm sm:space-y-4 md:p-6">
            <h2 className='mb-8 text-2xl font-bold text-center'>E-receipt</h2>
            <div className="flex flex-col justify-between pb-4 space-y-2 border-b border-gray-900/10 md:flex-row md:items-center md:space-y-0">
              <div className="flex space-x-2">
                <span className="font-bold">Date: </span>
                <span className="font-bold">{today}</span>
              </div>
              <div className="flex items-center space-x-2">
                <label className="font-bold text-red-600" htmlFor="invoiceNumber">
                  Receipt No:
                </label>
                <input
                  required
                  className="max-w-[100px] bg-gray-200 text-red-600 font-bold"
                  type="number"
                  min={1}
                  value={receiptNo || ''}
                  onChange={(e) => setReceiptNo(e.target.value)}
                />
              </div>
            </div>
            <h1 className="text-lg font-bold text-center">RECEIPT</h1>
            <div className="grid grid-cols-1 gap-2 pt-4 pb-8 md:grid-cols-2">
              <div>
                <label
                  htmlFor="cashierName"
                  className="text-sm font-bold sm:text-base"
                >
                  Business:
                </label>
                <input
                  required
                  className="flex-1 p-2"
                  placeholder="Business name"
                  type="text"
                  name="businessName"
                  id="businessName"
                  value={businessName || ''}
                  onChange={(e) => setBusinessName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="customerName"
                  className="col-start-2 row-start-1 text-sm font-bold md:text-base"
                  >
                    Customer:
                </label>
                <input
                  required
                  className="flex-1 p-2"
                  placeholder="Customer name"
                  type="text"
                  name="customerName"
                  value={customerName || ''}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </div>
            </div>
            <table className="w-full p-4 text-left">
              <thead>
                  <tr className="text-sm border-b border-gray-300 md:text-base">
                      <th>ITEM</th>
                      <th>QTY</th>
                      <th className="text-center">PRICE</th>
                      <th className="text-center">ACTION</th>
                  </tr>
              </thead>
              <tbody>
                <ReceiptItem
                  items={items}
                  handleFormChange={handleFormChange}
                  deleteItemHandler={deleteItemHandler}
                />
              </tbody>
            </table>
            <button
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
              type="button"
              onClick={addItem}
            >
              Add Item
            </button>
            <button
              className="px-4 py-2 ml-4 text-sm text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
              type="button" onClick={reviewInvoiceHandler}
            >
              Preview
            </button>
            <ReceiptModal
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              receiptInfo={{
                receiptNo,
                businessName,
                customerName,
                total,
              }}
              items={items}
            />
            <div className="border-t border-gray-900/10">
              <div className='flex flex-row justify-end w-full gap-8 pr-12'>
              <span className="font-bold">Total:</span>
                <span className="font-bold">
                ₹{total % 1 === 0 ? total : total.toFixed(2)}
              </span>
              </div>
            </div>
        </div>
      </form>
     );
}
 
export default ReceiptForm;
