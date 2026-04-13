import { ToastContainer, toast } from 'react-toastify';

function App() {
  const notify = () => toast("Wow so easy!");

  return (
    <>
      <h1 className="font-bold text-4xl mb-8">React Toastify</h1>
      <button onClick={notify} className="bg-blue-500 cursor-pointer rounded-md text-white px-4 py-2">Notify</button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
