import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Caught an error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className='flex items-center justify-center min-h-screen text-xl'>Có lỗi xảy ra.</div>;
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
