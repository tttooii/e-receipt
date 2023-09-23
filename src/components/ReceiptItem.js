import { FaIndianRupeeSign } from "react-icons/fa6";

const ReceiptItem = ({items, handleFormChange, deleteItemHandler}) => {
    return (
        <>
            {items.map((item, id) => {
                return (
                <tr key={id}>
                    <td>
                        <input 
                            type="text" 
                            name="item_name" 
                            value={item.item_name}
                            onChange={(e) => handleFormChange(id, e)}
                        />
                    </td>
                    <td className="w-[75px]">
                        <input 
                            type="number" 
                            name="qty" 
                            value={item.qty}
                            min={1}
                            onChange={(e) => handleFormChange(id, e)}
                            
                        />
                    </td>
                    <td className="w-[100px] relative">
                        <FaIndianRupeeSign className="absolute mt-2"/>
                        <input
                            className="px-5" 
                            type="number" 
                            name="price" 
                            value={item.price}
                            min={1}
                            onChange={(e) => handleFormChange(id, e)}
                        />
                    </td>
                    <td className="flex items-center justify-center">
                        <button
                        className="rounded-md bg-red-500 p-2 text-white shadow-sm transition-colors duration-200 hover:bg-red-600"
                        onClick={() => deleteItemHandler(id)}
                        >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        </button>
                    </td>
                </tr>
                );
            })}
        </>
     );
}
 
export default ReceiptItem;