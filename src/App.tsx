

function App() {
  

  return (
    <>
      <div className="min-h-screen  bg-gray-200">
        {/* Header */}
        <div className="text-3xl text-white font-bold bg-blue-500 px-8 py-4">NCD Health Assistant</div>
        {/* Body */}
          <div className="flex w-full min-h-screen">

              {/*chat History*/}
               <div className="w-1/5 border-r-2 border-gray-300 pl-20 flex flex-col">
                  <div className="text-2xl font-bold mx-8 my-4 mb-20">Chat History</div>
                  <p className="bg-blue-500 rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ">Chat 1</p>
                  <p className="bg-blue-500 rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ">Chat 2</p>
                  <p className="bg-blue-500 rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ">Chat 3</p>
                  <p className="bg-blue-500 rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ">Chat 4</p>
                  <p className="bg-blue-500 rounded-md px-2 py-2 mb-2 mr-16 flex justify-center text-white text-2xl ">Chat 5</p>
               </div>

              {/* Input Box */}
              <div className="w-3/5 border-r-2 border-gray-300 px-8 flex flex-col">
                 {/*welcome message*/}
                  <div className="text-2xl font-bold mx-8 my-4 flex justify-center text-blue-500">Welcome to NCD Health Assistant! How can I assist you today?</div>
                
                {/* User message - right aligned */}
                <div className="flex justify-end mb-4 mt-32">
                  <p className="bg-blue-500 rounded-lg px-4 py-2 text-white text-lg max-w-md">What is a cancer?</p>
                </div>

                {/* Bot response - left aligned */}
                <div className="flex items-start mb-4">
                  <div className="bg-blue-500 rounded-full w-10 h-10 flex items-center justify-center text-white  mr-3 flex-shrink-0">
                    🤖
                  </div>
                  <p className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-800 text-lg max-w-2xl ">Cancer is a disease where the body's cells grow out of control, forming abnormal masses (tumors) that can invade nearby tissues and spread to other parts of the body, disrupting normal functions</p>
                </div>

                {/*search bar*/}
                <div className="w-full mr-4 bg-white border border-gray-300 rounded-md px-4 py-2 mt-auto mb-24 flex items-center">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="w-full outline-none text-lg"
                  />
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-md ml-4">Send</button>
                </div>
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
