import { render, screen } from "react-dom";
import { AuthContext } from "../../../auth/context/AuthContext";
import { authReducer } from "../../../auth/context/authReducer"
import { LoginPage } from "../../../auth/pages/LoginPage"
import { types } from "../../../auth/types/types";

describe('Pruebas en authReducer', () => { 
    const initialState = {
        logged: false,

    }
    const loginMock = jest.fn();
    test('debe de retornar el estado por defecto', () => { 
        const newState = authReducer(initialState, {});

        expect( newState ).toBe( initialState );
     })


     test('debe de llamar el login autenticar y establecer el user', () => { 
            const action = {
                type: types.login,
                payload: {
                    id: '123',
                    user: 'Jesus A.S.'
                }
            }


            const state = authReducer({logged: false}, action);

            expect(  state ).toEqual({
                logged: true,
                user: action.payload
            })
      })

      test('debe de (logout) borrar e name dle usuario y logged false', () => { 
            const state = {
                logged: true,
                user: { id: '123', name: 'Jesus A.S'}
            }
            const action = {
                type: types.logout
            }


            const newState = authReducer(state, action);

            expect(  newState ).toEqual({ logged: false })
        })
 })