import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Feed from "./components/Feed"
import Profile from "./components/Profile"
import Connections from "./components/Connections"
import Request from "./components/Request"
import Chat from "./components/Chat"


function App() {

  return (
    <>

    <Provider store={appStore}>

    <BrowserRouter >

    <Routes>

      <Route path="/" element={<Body />}>

      <Route index  element={<Feed />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="profile" element={<Profile />} />
      <Route path="connection" element={<Connections />} />
      <Route path="request" element={<Request />} />
      <Route path="chat/:targetUserId" element={<Chat />} />
      
    </Route>

    </Routes>

    </BrowserRouter>

    </Provider>

    </>
    
  )
}

export default App
