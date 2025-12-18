

function App() {
  

  return (
    <>
      <div className="min-h-screen  bg-white">
        {/* Header */}
        <div className="text-3xl text-white font-bold bg-blue-500 px-8 py-4">NCD Health Assistant</div>
        {/* Body */}
          <div className="flex w-full min-h-screen">

              {/*chat History*/}
               <div className="w-1/5 border-r-2 border-gray-200 pl-20 flex flex-col">
                  <div className="text-2xl font-bold mx-8 my-4">Chat History</div>
                  <p className="bg-blue-500 rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ">Chat 1</p>
                  <p className="bg-blue-500 rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ">Chat 2</p>
                  <p className="bg-blue-500 rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ">Chat 3</p>
                  <p className="bg-blue-500 rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ">Chat 4</p>
                  <p className="bg-blue-500 rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ">Chat 5</p>
               </div>

              {/* Input Box */}
              <div className="w-3/5 border-r-2 border-gray-200 pl-116 flex flex-col">
                <div className="text-2xl font-bold mx-8 my-4">Input Box</div>
              </div>

              {/*References section*/}
              <div className="w-1/5 flex flex-col pl-12">
                <div className="text-2xl font-bold mx-8 my-4">References Section</div>
              </div>
          </div>
      </div>
        
    </>
  )
}

export default App
