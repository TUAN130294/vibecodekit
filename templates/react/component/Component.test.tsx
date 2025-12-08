import { render, screen } from '@testing-library/react';
import { {{ComponentName}} } from './{{ComponentName}}';

describe('{{ComponentName}}', () => {
  it('renders children correctly', () => {
    render(<{{ComponentName}}>Test content</{{ComponentName}}>);
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <{{ComponentName}} className="custom-class">Content</{{ComponentName}}>
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  // Add more tests here
});
