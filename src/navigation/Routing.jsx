import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "../App"
import Instructions from "../instructions/Instructions"
import Principal from "../principal/Principal"
import SecretFriend from "../principal/SecretFriend"

function Routing() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<App />} />
                    <Route path={'/landing'} element={<App />} />
                    <Route path={'/principal'} element={<Principal />} />
                    <Route path={'/instructions'} element={<Instructions inLanding={false} />} />
                    <Route path={'/secret-friend'} element={<SecretFriend />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing