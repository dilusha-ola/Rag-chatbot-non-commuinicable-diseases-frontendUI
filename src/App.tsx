

function App() {
  

  return (
    <>
      <div className="min-h-screen  bg-white">
        {/* Header */}
        <div className="text-3xl text-white font-bold bg-blue-500 px-8 py-4">NCD Health Assistant</div>
        {/* Body */}
          <div className="flex w-full ">

              {/*chat History*/}
               <div className="w-1/5">
                  <div className="text-xl font-semibold px-8 py-4">Chat History</div>
               </div>

              {/* Input Box */}
              <div>
                <div className="text-xl font-semibold px-8 py-4">Input Box</div>
              </div>

              {/*References section*/}
              <div className="w-1/5">
                <div className="text-xl font-semibold px-8 py-4">References Section</div>
              </div>
          </div>
      </div>
        
    </>
  )
}

export default App
