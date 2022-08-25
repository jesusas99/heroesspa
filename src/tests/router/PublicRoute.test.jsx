import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';

import { PublicRoute } from '../../router/PublicRoute';


describe('pruebas en public rout', () => { 
    test('debe mostrar children si no esta autenticado', () => { 

        const contextValue = {
            logged: false
        }
        render(
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )


        expect( screen.getByText('Ruta publica') ).toBeTruthy();
     })

     test('debe mostrar de navegar si esta autenticado', () => { 

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Strider'
            }
        }
        render(
            <AuthContext.Provider value={ contextValue }>

                <MemoryRouter initialEntries={['/login']}>
                    <Routes>
                        <Route path = 'login' element = { 
                                        <PublicRoute>
                                            <h1>Ruta publica</h1>
                                        </PublicRoute>
                                    } />
                        <Route path = 'marvel' element = { <h1>Pagina marvel</h1> } />
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('Pagina marvel') ).toBeTruthy();

     })


 })