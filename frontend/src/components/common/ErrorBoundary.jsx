import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      localStorage.removeItem('manager_active_section');
    } catch (e) {}
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.href = window.location.pathname;
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-6 text-[#2D2528]">
          <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E8DDD8] shadow-lg text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#FAF0E6] flex items-center justify-center text-[#500F1D]">
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-serif font-bold text-[#500F1D]">Something went wrong</h2>
            <p className="text-xs text-[#75696B]">
              The page encountered an unexpected issue. Click below to reload and restore view.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              className="px-6 py-2.5 rounded-2xl bg-[#500F1D] text-white text-xs font-bold hover:bg-[#3D0B16] transition-all cursor-pointer shadow-sm"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
