import { Navigate, Route, Routes } from "react-router-dom"
import { Navbar } from "../../ui"

import { SearchPage, HeroPage, MarvelPage, DCPage } from "../"

export const HeroesRoutes = () => {
  return (
    <>
        <Navbar />

    <div className="container">
      <Routes>
        <Route path="marvel" element={<MarvelPage />} />
        <Route path="dc" element={<DCPage />} />

        <Route path="search" element={<SearchPage />} />

        <Route path="heroe/:id" element={<HeroPage />} />
        {/* Search, Hero by id */}

        <Route path="/" element={<Navigate  to="/marvel" />} />
      </Routes>
    </div>
    </>
  )
}
