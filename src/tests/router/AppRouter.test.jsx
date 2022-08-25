import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import { AppRouter } from '../../router/AppRouter';
describe('Pruebas en <AppRouter />', () => { 
    test('debe de mostar el login si no esta auteenticado', () => { 
        const contextValue = {
            logged: false,
        }

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>

        )

        expect( screen.getAllByText('Login').length ).toBe(2)
        // screen.debug();
     })

     test('debe de mostar el componente de marvel si esta autenticado', () => { 
        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'JESUS'
            }
        }

        render(
            <MemoryRouter initialEntries={['/login']}>
                <AuthContext.Provider value={contextValue}>
                    <AppRouter />
                </AuthContext.Provider>
            </MemoryRouter>

        )

         expect( screen.getByText('Marvel Comics') ).toBeTruthy();
     })
 })