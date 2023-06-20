import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ReverseSentence, reverseString } from "../pages/ReverseSentence"

describe("Sentence Converter Method Test", () => { 
    test ("Given a string, should return reversed string", ()=>{
        const testString = 'Hello'
        const reversedString = reverseString(testString)
        expect(reversedString).toBe('olleH')
    })

    test ("Given a sentence, should return reversed sentence", ()=>{
        const testString = 'Hello There'
        const reversedString = reverseString(testString)
        expect(reversedString).toBe('olleH erehT')
    })

    test ("Given an empty space, should return empty string", ()=>{
        const testString = ' '
        const reversedString = reverseString(testString)
        expect(reversedString).toBe('')
    })

    test ("Given a sentence, should remove empty spaces at the beginning and the end", ()=>{
        const testString = '  Hello There  '
        const reversedString = reverseString(testString)
        expect(reversedString).toBe('olleH erehT')
    })
});

// describe("Sentence Converter Component Test", () => { 
//     test ("Given a user input, and clicking on button should return reversed string", ()=>{
//         render(<ReverseSentence/>);
//         const input = screen.getByLabelText('Type sentence')
//         fireEvent.change(input, {target: {value: 'Hello there'}})
//         expect(input).toHaveValue('Hello there')
//         const reverseButton = screen.getByText('Reverse')
//         fireEvent.click(reverseButton)
//         const reversedSentence = screen.getByTestId("revSentence")
//         expect(reversedSentence).toHaveTextContent(/olleH ereht/i)
//     })
// })
