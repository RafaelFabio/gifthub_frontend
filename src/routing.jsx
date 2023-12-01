import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "./App"
import SecretFriend from "./principal/SecretFriend"
function Routing(){
    return (
        <>
        <BrowserRouter>
            <Routes>
                <Route path={'/welcome'} element={<SecretFriend/>}/>
                <Route path={'/'} element={<App/>}/>
            </Routes>
        </BrowserRouter>
        </>
    )
}
export default Routing