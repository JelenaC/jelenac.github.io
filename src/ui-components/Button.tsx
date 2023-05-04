import { forwardRef } from 'react'
import styled from 'styled-components'

export type TButtonType = 'submit' | 'button'

export interface IButton {
  children: React.ReactNode
  type: TButtonType
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = forwardRef<HTMLButtonElement, IButton>(({type = 'button', children, disabled, onClick }, ref ) => {
    if(!children)
      return null

    return(
      <UiButton
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </UiButton>
    )
  }
)

export { Button }

const UiButton = styled.button`
  background-color: #5add8a;
  color: #333a4e;
  font-weight: bold;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'auto')};
  height: 2.281rem;
  min-width: 6rem;
  box-shadow: 0px 0px 25px rgba(51, 58, 78, 0.3);
  &:hover {
    background: rgba(90, 221, 138, 0.9);
  };
  &:active {
    background: #5add8a;
  };
  &:disabled {
    background: rgba(90, 221, 138, 0.4);
    cursor: not-allowed;
  };
  @media(min-width: 48em) {
    padding: 0.5rem 2rem;
  }
`;
