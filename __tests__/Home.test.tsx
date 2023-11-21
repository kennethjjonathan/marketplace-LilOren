import Home from '@/pages/index';
import { render, screen } from '@testing-library/react';

describe('Home', () => {
  it('should have Docs text', () => {
    render(<Home products={[]} />); //ARRANGE

    const myElem = screen.getByText('Docs'); //ACT
    expect(myElem).toBeInTheDocument(); //ASSERT
  });

  it("should contain the 'information' text", () => {
    render(<Home products={[]} />); //ARRANGE

    const myElem = screen.getByText(/information/i); //ACT
    expect(myElem).toBeInTheDocument(); //ASSERT
  });

  it('should have a heading', () => {
    render(<Home products={[]} />); //ARRANGE

    const myElem = screen.getByRole('heading', {
      name: 'Learn',
    }); //ACT
    expect(myElem).toBeInTheDocument(); //ASSERT
  });
});
