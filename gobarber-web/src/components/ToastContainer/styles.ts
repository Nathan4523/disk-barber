import styled, { css } from 'styled-components';

interface ToastProps {
    type?: 'success' | 'error' | 'info';
    hasDescription: boolean;
}

const toastTypeVariations = {
    info:  css`
         background: #ebf8ff;
        color: #3172b7;
    `,
    success:  css`
        background: #e6fffa;
        color: #2e656a;
    `,
    error:  css`
        background: #fddede;
        color: #c53030;
    `,
}

export const Container = styled.div`
    position: absolute;
    right: 0;
    top: 0;
    padding: 30px;
    overflow: hidden;
`;