import { styled } from "@mui/material";
import { Link as LinkComponent } from 'react-router-dom'
import { mateBlack } from "../../constants/color";


export const VisuallyHiddenInput = styled('input')({
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: 1
})

export const Link = styled(LinkComponent)`
    text-decoration: none;
    color: black;
    padding: 1rem;
    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
`;


export const InputBox = styled('input')`
  width: 100%;
  height: 100%;
  border: none;
  outline:none;
  padding: 0 3.5rem;
  border-radius: 1.5rem;
  background-color: rgba(0,0,0,0.1);
`

export const SearchInput = styled('input')({
    padding: '1rem 2rem',
    width: '20vmax',
    border:'none',
    outline: 'none',
    borderRadius: '1.5rem',
    backgroundColor: '#f1f1f1',
    fontSize: '1.1rem',
})

export const CurvedButton = styled('button')({
    padding: '1rem 2rem',
    border:'none',
    outline: 'none',
    borderRadius: '1.5rem',
    cursor:'pointer',
    backgroundColor: mateBlack,
    color:'white',
    fontSize: '1.1rem',
    "&:hover" : {
          backgroundColor: 'rgba(0,0,0,0.8)'
    }
})