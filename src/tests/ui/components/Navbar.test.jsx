import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../auth/context/AuthContext";
import { Navbar } from "../../../ui";


const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () =>  ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
})  );

describe('Pruebas en NavBar', () => { 
    const contextValue = {
        logged: true,
        user: {
            id: 'ABC',
            name: 'JESUS'
        },
        logout: jest.fn()
    }  
    beforeEach( () => jest.clearAllMocks() ); 

    test('debe mostrar el nombre del usuario', () => { 

        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );

        expect( screen.getByText( contextValue.user.name ) ).toBeTruthy();
     })

     test('debe de llamar el logout y navigate cuando se hace clic en el boton ', () => { 
        render(
            <MemoryRouter initialEntries={['/marvel']}>
                <AuthContext.Provider value={contextValue}>
                    <Navbar />
                </AuthContext.Provider>
            </MemoryRouter>
        );  


        const logoutbtn = screen.getByRole('button');
        fireEvent.click( logoutbtn );

        expect(contextValue.logout).toHaveBeenCalled();

        expect(mockedUseNavigate).toHaveBeenCalledWith("/login", {replace: true});
      })
 })