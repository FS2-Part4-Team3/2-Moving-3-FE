import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import ReactQueryProviders from '@/hooks/useReactQuery';

describe('ReactQueryProviders', () => {
  it('renders children correctly', () => {
    const { getByText } = render(
      <ReactQueryProviders>
        <div>Test Child</div>
      </ReactQueryProviders>,
    );

    expect(getByText('Test Child')).toBeInTheDocument();
  });

  it('provides a QueryClient to the application', () => {
    const queryClient = new QueryClient();

    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <div>Query Client Test</div>
      </QueryClientProvider>,
    );

    expect(getByText('Query Client Test')).toBeInTheDocument();
  });
});
