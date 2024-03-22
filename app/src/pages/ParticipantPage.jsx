
/**
 * The SignIn component for the application.
 * 
 * @author ???
 */

function ParticipantPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-4xl mx-auto py-8">
                <div className="bg-white shadow-md rounded px-8 py-8">
                    <div className="flex justify-center mb-4">
                        <FiUser className="text-5xl text-gray-600" />
                    </div>
                    <h2 className="text-center text-2xl font-semibold mb-4">User Profile</h2>
                    <form onSubmit={updateParticipant}>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                            <input
                                id="name"
                                type="text"
                                placeholder="Enter your name..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone number</label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="Enter your phone number..."
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="evidence" className="block text-gray-700 text-sm font-bold mb-2">Evidence</label>
                            {/*{evidence && (
                                <div className="mt-2 flex items-start">
                                    <p className="block text-gray-700 text-sm font-bold mb-2">Current Evidence:</p>
                                    <img src={`data:image/png;base64,${evidence}`} alt="Evidence" className="mx-auto w-1/2" />
                                </div>
                            )}*/}
                            <input
                                id="evidence"
                                type="file"
                                onChange={(e) => setEvidence(e.target.files[0])}
                                accept="image/png, image/jpeg, image/jpg, application/pdf,application/vnd.ms-excel"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            />
                            <p className="text-xs text-gray-600 mt-1">To successfully participate in the charity events, you will need to attach a proof of your income which will be reviewed by the member of staff. For more information, please head to our FAQ.</p>
                        </div>
                        <div className="flex items-center justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ParticipantPage;
