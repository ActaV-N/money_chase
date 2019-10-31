import styled from 'styled-components'

export const FlexContainer = styled.div`
    display:flex;
    width:100%;

    ${props => props.justify_content?'justify-content:'+props.justify_content:''}
    ${props => props.align_items?'align-items:'+props.align_items:''}

    ${props => props.width?'width:'+props.width:''}
    ${props => props.height?'height:'+props.height:''}

    ${props => props.padding?'padding:'+props.padding:''}
`
export const FlexBody = styled.div`
    display:flex;
    width:100vw;
    height:100vh;

    ${props => props.justify_content?'justify-content:'+props.justify_content:''}
    ${props => props.align_items?'align-items:'+props.align_items:''}
    
    ${props => props.width?'width:'+props.width:''}
    ${props => props.height?'height:'+props.height:''}

    ${props => props.padding?'padding:'+props.padding:''}
`

export const FlexItem = styled.div`
    flex:${props => props.flex};
    ${props => props.bgColor ? 'background:'+props.bgColor:''}
    min-width:310px;

    ${props => props.width?'width:'+props.width:''}
    ${props => props.height?'height:'+props.height:''}

    ${props => props.padding?'padding:'+props.padding:''}
`

export const FlexColumn = styled.div`
    display:flex;
    flex-direction:column;

    width:100%;
    height:100%;

    ${props => props.justify_content?'justify-content:'+props.justify_content:''}
    ${props => props.align_items?'align-items:'+props.align_items:''}

    ${props => props.width?'width:'+props.width:''}
    ${props => props.height?'height:'+props.height:''}

    ${props => props.padding?'padding:'+props.padding:''}
`