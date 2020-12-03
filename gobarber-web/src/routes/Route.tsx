import React from 'react';
import {
    Route as ReactDOMRoute,
    RouteProps as ReactRouteProps,
    Redirect
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactRouteProps {
    isPrivate?: boolean;
    component: React.ComponentType
}

//rotas para manipular com autenticação e e.t.c
//capturando o status do usuário e comparando com a rota privada ou não
const Route: React.FC<RouteProps> = ({
    isPrivate = false,
    component: Component,
    ...rest }) => {
    const { user } = useAuth();

    //manipulação do tipo de rota
    return (
        <ReactDOMRoute
            {...rest}
            render={({ location }) => {
                return isPrivate === !!user ? (
                    <Component />
                ) : (
                        <Redirect to={{
                            pathname: isPrivate ? '/' : '/dashboard',
                            state: { from: location }
                        }} />
                    )
            }} />
    )
}

export default Route;