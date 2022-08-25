import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';

import { PrivateRoute } from '../../router/PrivateRoute';


describe('pruebas en public rout', () => { 
    test('debe mostrar children si esta autenticado', () => { 

        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'JESUS'
            }
        }
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        )


        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        expect(localStorage.setItem).toHaveBeenCalled();
     })

 })