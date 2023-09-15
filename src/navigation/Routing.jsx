import { BrowserRouter, Routes, Route } from "react-router-dom"
import App from "../App"
import Instructions from "../instructions/Instructions"

function Routing() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<App />} />
                    <Route path={'/landing'} element={<App />} />
                    <Route path={'/instructions'} element={<Instructions inLanding={false} />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing