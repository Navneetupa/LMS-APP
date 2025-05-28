import { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import logo from '../../assets/logo.png';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null); // State for selected payment in popup
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No authentication token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get('https://lms-backend-flwq.onrender.com/api/v1/payments/my-payments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.success && Array.isArray(response.data.data)) {
          setPayments(response.data.data);
        } else {
          setError('Invalid response from server.');
        }
      } catch (err) {
        setError(`Error: ${err.response?.data?.message || err.message || 'Failed to fetch payment history.'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  const downloadPDF = (payment) => {
    const doc = new jsPDF();

    // Add LMS logo
    doc.addImage(logo, 'PNG', 20, 15, 20, 15);

    // Add payment description
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont('Helvetica', 'normal');
    const description = `This payment is for your enrollment in ${payment.course?.title || 'the course'}. The ${
      payment.status ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1) : 'N/A'
    } status indicates that the transaction was ${
      payment.status === 'completed'
        ? 'successfully processed, granting you access to the course content.'
        : 'initiated but may require further action to complete.'
    }`;
    doc.text(description, 100, 18, { maxWidth: 90 });

    // Add centered LMS watermark
    doc.setFontSize(60);
    doc.setTextColor(200, 200, 200);
    doc.setFont('Helvetica', 'bold');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const text = 'LMS';
    const textWidth = doc.getTextWidth(text);
    doc.text(text, (pageWidth - textWidth) / 2, pageHeight / 2, { angle: 45 });

    // Add payment details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    let currentY = 40;

    // Course
    doc.setFont('Helvetica', 'bold');
    doc.text('Course:', 20, currentY);
    doc.setFont('Helvetica', 'normal');
    doc.text(payment.course?.title || 'N/A', 60, currentY);
    currentY += 10;

    // Amount
    doc.setFont('Helvetica', 'bold');
    doc.text('Amount:', 20, currentY);
    doc.setFont('Helvetica', 'normal');
    doc.text(
      payment.amount !== undefined
        ? `${payment.amount.toFixed(2)} ${payment.currency || 'INR'}`
        : 'N/A',
      60,
      currentY
    );
    currentY += 10;

    // Status
    doc.setFont('Helvetica', 'bold');
    doc.text('Status:', 20, currentY);
    doc.setFont('Helvetica', 'normal');
    doc.text(
      payment.status ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1) : 'N/A',
      60,
      currentY
    );
    currentY += 10;

    // Payment Method
    doc.setFont('Helvetica', 'bold');
    doc.text('Payment Method:', 20, currentY);
    doc.setFont('Helvetica', 'normal');
    doc.text(
      payment.paymentMethod
        ? payment.paymentMethod.charAt(0).toUpperCase() + payment.paymentMethod.slice(1)
        : 'N/A',
      60,
      currentY
    );
    currentY += 10;

    // Transaction ID
    doc.setFont('Helvetica', 'bold');
    doc.text('Transaction ID:', 20, currentY);
    doc.setFont('Helvetica', 'normal');
    doc.text(payment.transactionId || 'N/A', 60, currentY);
    currentY += 10;

    // Payment Date
    doc.setFont('Helvetica', 'bold');
    doc.text('Payment Date:', 20, currentY);
    doc.setFont('Helvetica', 'normal');
    doc.text(
      payment.paymentDate
        ? new Date(payment.paymentDate).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        : 'N/A',
      60,
      currentY
    );

    // Save the PDF
    doc.save(`Payment_Details_${payment.transactionId || 'N/A'}.pdf`);
  };

  const openModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPayment(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-4 border-[#49BBBD] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 text-base font-semibold">Loading payment history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl shadow-lg text-base font-semibold max-w-md text-center animate-pulse">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-pattern">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="text-9xl font-extrabold text-gray-300 transform -rotate-45 translate-x-[-20%] translate-y-[20%]">
          LMS
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <h1 className="text-2xl md:text-4xl font-bold text-black mb-10 text-center sm:text-left bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 animate-fade-in">
          Payment History
        </h1>
        {payments.length === 0 ? (
          <div className="bg-white p-8 rounded-xl shadow-lg text-center transform transition-all duration-300 hover:scale-105">
            <p className="text-gray-600 text-base font-semibold">No payment history available.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 border border-gray-100 cursor-pointer"
                onClick={() => openModal(payment)}
              >
                <div className="space-y-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 truncate">{payment.course?.title || 'N/A'}</h2>
                    <p className="text-sm text-gray-500">
                      {payment.paymentDate
                        ? new Date(payment.paymentDate).toLocaleDateString('en-IN', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Amount</span>
                    <span className="text-sm font-bold text-[#49BBBD]">
                      {payment.amount !== undefined
                        ? `₹${payment.amount.toFixed(2)} ${payment.currency || 'INR'}`
                        : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        payment.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {payment.status ? payment.status.charAt(0).toUpperCase() + payment.status.slice(1) : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Payment Details */}
      {isModalOpen && selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>
            <div className="space-y-4">
              <div>
                <span className="font-semibold text-gray-600">Course:</span>
                <span className="ml-2 text-gray-800">{selectedPayment.course?.title || 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Amount:</span>
                <span className="ml-2 text-gray-800">
                  {selectedPayment.amount !== undefined
                    ? `₹${selectedPayment.amount.toFixed(2)} ${selectedPayment.currency || 'INR'}`
                    : 'N/A'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Status:</span>
                <span
                  className={`ml-2 inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedPayment.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {selectedPayment.status
                    ? selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)
                    : 'N/A'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Payment Method:</span>
                <span className="ml-2 text-gray-800">
                  {selectedPayment.paymentMethod
                    ? selectedPayment.paymentMethod.charAt(0).toUpperCase() +
                      selectedPayment.paymentMethod.slice(1)
                    : 'N/A'}
                </span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Transaction ID:</span>
                <span className="ml-2 text-gray-800">{selectedPayment.transactionId || 'N/A'}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Payment Date:</span>
                <span className="ml-2 text-gray-800">
                  {selectedPayment.paymentDate
                    ? new Date(selectedPayment.paymentDate).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })
                    : 'N/A'}
                </span>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="bg-[#49BBBD] text-white py-2 px-4 rounded-lg hover:bg-[#49BBBD] transition-colors font-semibold"
                onClick={() => downloadPDF(selectedPayment)}
                aria-label={`Download payment details for ${selectedPayment.course?.title || 'N/A'}`}
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;