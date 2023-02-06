import { Modal, Button } from "antd";
import { useRef } from "react";
import { useReactToPrint } from 'react-to-print'

const PrintInvoice = ({ customer, isModalOpen, setIsModalOpen }) => {

    const componentRef = useRef();

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    return (
        <Modal
            title="Print Invoice"
            open={isModalOpen}
            footer={false}
            width={800}
            onCancel={() => setIsModalOpen(false)}
        >
            <section className="py-20 bg-black mt-5" ref={componentRef}>
                <div className="max-w-5xl mx-auto bg-white px-6">
                    <article className="overflow-hidden">
                        <div className="logo mt-3 mb-4">
                            <img className="w-28 h-28" src="https://sgsolutions.com.mt/wp-content/uploads/2020/04/POS-Icon.png" alt="logo" />
                        </div>
                        <div className="invoice-details">
                            <div className="grid grid-cols-1 gap-12 | sm:grid-cols-4">
                                <div className="flex justify-between | sm:w-[300px]">
                                    <div className="text-md text-slate-500">
                                        <p className="font-bold text-slate-700">Invoice Detail:</p>
                                        <p>Unwrapped</p>
                                        <p>{customer.customerName}</p>
                                        <p>+{customer.customerPhoneNumber}</p>
                                        <p>{customer.paymentMode?.toUpperCase()}</p>
                                    </div>
                                    <div className="text-md text-slate-500 ml-7 | sm:ml-10">
                                        <p className="font-bold text-slate-700">Invoice:</p>
                                        The Boring Company
                                        <p>Tesla Street 007</p>
                                        <p>Frisco</p>
                                        <p>CA 0000</p>
                                    </div>
                                </div>
                                <div className="flex justify-between | sm:w-[300px] sm:ml-48">
                                    <div className="text-md text-slate-500">
                                        <div>
                                            <p className="font-bold text-slate-700">Invoice Number:</p>
                                            <p>000{Math.floor(Math.random() * 100)}</p>
                                        </div>
                                        <div className="mt-3">
                                            <p className="font-bold text-slate-700">Date of Issue:</p>
                                            <p>{(customer?.createdAt)?.substring(0, 10)}</p>
                                        </div>
                                    </div>
                                    <div className="text-md text-slate-500 mr-6 | sm:mr-0">
                                        <div>
                                            <p className="font-bold text-slate-700">Terms:</p>
                                            <p>0 Days</p>
                                        </div>
                                        <div className="mt-3">
                                            <p className="font-bold text-slate-700">Due:</p>
                                            <p>2023-11-21</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="invoice-table-area">
                            <table className="min-w-full divide-y mt-8 divide-slate-500 overflow-hidden">
                                <thead>
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 hidden | sm:pl-6 sm:table-cell md:pl-0">Image</th>
                                        <th scope="col" className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 hiddens | sm:pl-6 sm:table-cell md:pl-0">Title</th>
                                        <th scope="col" className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 hiddens | sm:pl-6 sm:table-cell md:pl-0">Price</th>
                                        <th scope="col" className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 hiddens | sm:pl-6 sm:table-cell md:pl-0">Quantity</th>
                                        <th scope="col" className="py-3.5 pr-3 text-end text-sm font-normal text-slate-700 hiddens | sm:pl-6 sm:table-cell md:pl-0">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        customer?.cartItems?.map((item) => (
                                            <tr className="border-b border-t border-slate-300">
                                                <td className="py-4 hidden | sm:block">
                                                    <img className="w-12 h-12 object-cover" src={item.img} alt="" />
                                                </td>
                                                <td className="py-4">
                                                    <span className="font-medium">{item.title}</span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="ml-1">{item.price.toFixed(2)} $</span>
                                                </td>
                                                <td className="py-4">
                                                    <span className="ml-2">{item.quantity}</span>
                                                </td>
                                                <td className="py-4 text-end">
                                                    <span className="">{(item.price * item.quantity).toFixed(2)}$</span>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot className="">
                                    <tr>
                                        <th className="pt-4 text-right" colSpan="4" scope="row">
                                            <span className="font-normal text-slate-700">Subtotal:</span>
                                        </th>
                                        <th className="pt-4 text-right" scope="row">
                                            <span className="font-normal text-slate-700">{customer?.subTotal?.toFixed(2)} $</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="pt-4 text-right" colSpan="4" scope="row">
                                            <span className="font-normal text-slate-700">Tax:</span>
                                        </th>
                                        <th className="pt-4 text-right ml-5" scope="row">
                                            <span className="font-normal text-red-700">+{customer?.tax?.toFixed(2)} $</span>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="pt-4 text-right" colSpan="4" scope="row">
                                            <span className="font-normal text-slate-700">Total:</span>
                                        </th>
                                        <th className="pt-4 text-right ml-5" scope="row">
                                            <span className="font-normal text-slate-700">{customer?.totalAmount?.toFixed(2)} $</span>
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        <div className="py-9">
                            <div className="border-t py-9 border-slate-300">
                                <p className="text-justify text-sm font-light text-slate-700">Payment terms are 14 days. Late Unpackaged Debts
                                    According to the Pay Act 0000, freelancers are exempt from this period.
                                    00:00 late fee in case the debts are not paid after
                                    that they have the right to demand and that at this point
                                    Please note that a new invoice will be submitted in addition.
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
            <div className="flex justify-end">
                <Button
                    type="primary"
                    size="large"
                    className="mt-3"
                    onClick={() => handlePrint()}
                >
                    Print
                </Button>
            </div>
        </Modal>
    );
}

export default PrintInvoice;
