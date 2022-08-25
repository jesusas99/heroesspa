import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { SearchPage } from '/home/yisus/Documents/React/heroes-spa/src/heroes/pages/SearchPage.jsx'

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () =>  ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
})  );


describe('Pruebas en <SearchPage>', () => { 
    beforeEach( () => jest.clearAllMocks() );
    test('debe de mostarse correctamente con valores por defecto', () => { 
        const {container} = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect( container).toMatchSnapshot();
        
        
     })


     test('debe de mostrar a bataman y el input con el valor del queryString', () => { 
        const {container} = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');

        expect( input.value ).toBe('batman');


        const img = screen.getByRole('img');

        expect( img.src ).toContain('/assets/heroes/dc-batman.jpg')
        
     })

     test('debe mostrar un error si o encuentra un heroe', () => {
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )

         const message = screen.getByLabelText('nores');
         expect( message ).toBeTruthy();

        // const img = screen.getByRole('img');

        // expect( img.src ).toContain('/assets/heroes/dc-batman.jpg')       
     } );
     test('debe de llamar el navigate a la pantalla nueva', () => {
         render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        )


        const input = screen.getByRole('textbox');

        fireEvent.change(input, {target: {name: 'searchText', value: 'superman'}});

        const form = screen.getByLabelText('form');

        fireEvent.submit(form);

        expect(mockedUseNavigate).toHaveBeenCalledWith('?q=superman');
     } );
 })